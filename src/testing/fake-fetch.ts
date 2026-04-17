import type { FetchLike, FetchInitLike, FetchResponseLike } from "../services/yellowjacket-client";

export interface RecordedRequest {
  url: string;
  init?: FetchInitLike;
}

export interface FakeRoute {
  method: string;
  url: string;
  status: number;
  body: unknown;
}

export interface FakeFetchHarness {
  fetcher: FetchLike;
  requests: RecordedRequest[];
}

function buildResponse(status: number, body: unknown): FetchResponseLike {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json(): Promise<unknown> {
      return body;
    },
  };
}

export function createFakeFetchHarness(routes: FakeRoute[]): FakeFetchHarness {
  const requests: RecordedRequest[] = [];

  const fetcher: FetchLike = async (url, init) => {
    requests.push({ url, init });

    const method = init?.method ?? "GET";
    const route = routes.find((candidate) => candidate.url === url && candidate.method === method);

    if (!route) {
      return buildResponse(404, {
        error: "not_found",
        url,
        method,
      });
    }

    return buildResponse(route.status, route.body);
  };

  return {
    fetcher,
    requests,
  };
}
