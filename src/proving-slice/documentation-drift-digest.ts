import type { OpenClawIntentV1 } from "../contracts/intent";
import type { OperatorQueueItemV1 } from "../contracts/operator-queue";
import type { ReviewTaskV1 } from "../contracts/review-task";
import { buildIntent } from "../policies/intent-guards";
import { YellowJacketClient } from "../services/yellowjacket-client";

export interface DocumentationDriftDigestRequest {
  targetRef: string;
  requestedBy: string;
  profileId: string;
  projectId: string;
}

export function buildDocumentationDriftDigestIntent(
  input: DocumentationDriftDigestRequest,
): OpenClawIntentV1 {
  return buildIntent({
    intentId: `intent-${input.projectId}`,
    action: "documentation_drift_digest_run",
    targetRef: input.targetRef,
    requestedBy: input.requestedBy,
    requestedAt: new Date().toISOString(),
    source: "operator",
    parameters: {
      profileId: input.profileId,
      projectId: input.projectId,
    },
  });
}

export async function requestDocumentationDriftDigest(
  client: YellowJacketClient,
  input: DocumentationDriftDigestRequest,
): Promise<OperatorQueueItemV1> {
  const intent = buildDocumentationDriftDigestIntent(input);
  return client.submitIntent(intent);
}

export async function loadOperatorQueue(
  client: YellowJacketClient,
): Promise<OperatorQueueItemV1[]> {
  return client.listQueue();
}

export async function loadReviewTask(
  client: YellowJacketClient,
  reviewTaskId: string,
): Promise<ReviewTaskV1> {
  return client.getReviewTask(reviewTaskId);
}
