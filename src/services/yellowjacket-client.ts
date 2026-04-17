import type { OpenClawIntentV1 } from "../contracts/intent";
import type { OperatorQueueItemV1 } from "../contracts/operator-queue";
import type { ReviewTaskV1 } from "../contracts/review-task";
import { assertIntentOnlyDispatch } from "../policies/intent-guards";

export interface FetchResponseLike {
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
}

export interface FetchInitLike {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

export type FetchLike = (url: string, init?: FetchInitLike) => Promise<FetchResponseLike>;

export interface YellowJacketClientConfig {
  baseUrl: string;
  apiKey?: string;
}

export interface SubmitIntentResponse {
  queueItem: OperatorQueueItemV1;
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

function joinUrl(baseUrl: string, path: string): string {
  return `${normalizeBaseUrl(baseUrl)}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildHeaders(apiKey?: string): Record<string, string> {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };

  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }

  return headers;
}

async function expectJson<T>(response: FetchResponseLike): Promise<T> {
  if (!response.ok) {
    throw new Error(`YellowJacket request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export class YellowJacketClient {
  private readonly baseUrl: string;

  constructor(
    private readonly config: YellowJacketClientConfig,
    private readonly fetcher: FetchLike,
  ) {
    this.baseUrl = normalizeBaseUrl(config.baseUrl);
  }

  async submitIntent(intent: OpenClawIntentV1): Promise<OperatorQueueItemV1> {
    assertIntentOnlyDispatch(intent);

    const response = await this.fetcher(joinUrl(this.baseUrl, "/intents"), {
      method: "POST",
      headers: buildHeaders(this.config.apiKey),
      body: JSON.stringify(intent),
    });

    const payload = await expectJson<SubmitIntentResponse>(response);
    return payload.queueItem;
  }

  async listQueue(): Promise<OperatorQueueItemV1[]> {
    const response = await this.fetcher(joinUrl(this.baseUrl, "/queue"), {
      method: "GET",
      headers: buildHeaders(this.config.apiKey),
    });

    return expectJson<OperatorQueueItemV1[]>(response);
  }

  async getReviewTask(reviewTaskId: string): Promise<ReviewTaskV1> {
    const response = await this.fetcher(joinUrl(this.baseUrl, `/review-tasks/${reviewTaskId}`), {
      method: "GET",
      headers: buildHeaders(this.config.apiKey),
    });

    return expectJson<ReviewTaskV1>(response);
  }
}
