import {
  YellowJacketClient,
  createFakeFetchHarness,
  loadOperatorQueue,
  loadReviewTask,
  requestDocumentationDriftDigest,
} from "../src/index";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

const baseUrl = "http://yellowjacket.local";

const queueItem = {
  schemaVersion: "operator_queue_item.v1" as const,
  queueItemId: "queue-1",
  intentId: "intent-project-1",
  targetRef: "doc-system",
  state: "requested" as const,
  statusSummary: "Intent accepted by YellowJacket",
  lastUpdatedAt: "2026-04-17T00:00:00.000Z",
};

const reviewTask = {
  schemaVersion: "review_task.v1" as const,
  reviewTaskId: "review-1",
  queueItemId: "queue-1",
  reviewPacketRef: "review-packet-1",
  disposition: "review_ready" as const,
  title: "Documentation Drift Digest Review",
  summary: "Digest ready for operator review",
  createdAt: "2026-04-17T00:00:00.000Z",
};

const harness = createFakeFetchHarness([
  {
    method: "POST",
    url: `${baseUrl}/intents`,
    status: 200,
    body: {
      queueItem,
    },
  },
  {
    method: "GET",
    url: `${baseUrl}/queue`,
    status: 200,
    body: [queueItem],
  },
  {
    method: "GET",
    url: `${baseUrl}/review-tasks/review-1`,
    status: 200,
    body: reviewTask,
  },
]);

const client = new YellowJacketClient(
  {
    baseUrl,
  },
  harness.fetcher,
);

const submitted = await requestDocumentationDriftDigest(client, {
  targetRef: "doc-system",
  requestedBy: "charlie",
  profileId: "default",
  projectId: "project-1",
});

assert(submitted.queueItemId === "queue-1", "queue item id mismatch");

const postRequest = harness.requests[0];
assert(postRequest?.url === `${baseUrl}/intents`, "intent request did not hit /intents");

const intentBody = JSON.parse(postRequest.init?.body ?? "{}");
assert(intentBody.dispatchMode === "intent_only", "dispatch mode must remain intent_only");
assert(intentBody.directExecutionForbidden === true, "direct execution must remain forbidden");
assert(intentBody.hermesBypassForbidden === true, "Hermes bypass must remain forbidden");

const queue = await loadOperatorQueue(client);
assert(queue.length === 1, "queue length mismatch");
assert(queue[0]?.queueItemId === "queue-1", "queue item mismatch");

const loadedReviewTask = await loadReviewTask(client, "review-1");
assert(loadedReviewTask.reviewTaskId === "review-1", "review task mismatch");

console.log("PHASE_5_PROOF_PASS");
