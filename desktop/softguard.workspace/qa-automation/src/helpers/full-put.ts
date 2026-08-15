export type FullPutMethod = 'GET' | 'PUT';

export interface FullPutApiResponse {
  status: number;
  body: any;
}

export type FullPutApiCall = (
  method: FullPutMethod,
  url: string,
  body?: any,
) => Promise<FullPutApiResponse | null | undefined>;

export interface FullPutOptions {
  apiCall: FullPutApiCall;
  resourceUrl: string;
  entityId: number | string;
  patch: Record<string, any>;
}

export interface FullPutResult {
  updated: boolean;
  skipped: boolean;
  reason?: 'snapshot-unavailable' | 'invalid-snapshot' | 'put-failed';
  snapshot?: FullPutApiResponse | null;
  response?: FullPutApiResponse | null;
}

export async function updateWithFullPut(options: FullPutOptions): Promise<FullPutResult> {
  const snapshot = await options.apiCall('GET', options.resourceUrl);

  if (!snapshot) {
    return {
      updated: false,
      skipped: true,
      reason: 'snapshot-unavailable',
      snapshot: null,
    };
  }

  if (snapshot.status < 200 || snapshot.status >= 300) {
    return {
      updated: false,
      skipped: true,
      reason: 'snapshot-unavailable',
      snapshot,
    };
  }

  if (!snapshot.body || typeof snapshot.body !== 'object' || Array.isArray(snapshot.body)) {
    return {
      updated: false,
      skipped: true,
      reason: 'invalid-snapshot',
      snapshot,
    };
  }

  const response = await options.apiCall('PUT', options.resourceUrl, {
    ...snapshot.body,
    Id: options.entityId,
    ...options.patch,
  });

  if (!response || response.status < 200 || response.status >= 300) {
    return {
      updated: false,
      skipped: false,
      reason: 'put-failed',
      snapshot,
      response: response || null,
    };
  }

  return {
    updated: true,
    skipped: false,
    snapshot,
    response,
  };
}
