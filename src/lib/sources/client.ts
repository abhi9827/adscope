/**
 * Resilient HTTP Client with exponential backoff and rate limit handling
 */

export interface RequestOptions extends RequestInit {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  timeoutMs?: number;
}

export async function fetchWithRetry(
  url: string,
  options: RequestOptions = {}
): Promise<Response> {
  const {
    maxRetries = 3,
    baseDelayMs = 1000,
    maxDelayMs = 10000,
    timeoutMs = 15000,
    ...fetchOptions
  } = options;

  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt <= maxRetries) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // If success or non-retryable 4xx client error (except 429), return response
      if (response.ok || (response.status < 500 && response.status !== 429)) {
        return response;
      }

      // Handle 429 Too Many Requests or 5xx Server Errors with exponential backoff
      attempt++;
      if (attempt > maxRetries) {
        return response;
      }

      const retryAfterHeader = response.headers.get('retry-after');
      let delay = baseDelayMs * Math.pow(2, attempt - 1);
      if (retryAfterHeader) {
        const parsedRetry = parseInt(retryAfterHeader, 10);
        if (!isNaN(parsedRetry)) {
          delay = parsedRetry * 1000;
        }
      }

      // Add jitter
      const jitter = Math.random() * 200;
      const finalDelay = Math.min(delay + jitter, maxDelayMs);

      console.warn(
        `[SourceClient] Received ${response.status} for ${url}. Retrying attempt ${attempt}/${maxRetries} in ${Math.round(finalDelay)}ms...`
      );

      await new Promise((res) => setTimeout(res, finalDelay));
    } catch (err: any) {
      clearTimeout(timeoutId);
      attempt++;
      lastError = err;

      if (attempt > maxRetries) {
        break;
      }

      const delay = Math.min(baseDelayMs * Math.pow(2, attempt - 1) + Math.random() * 200, maxDelayMs);
      console.warn(
        `[SourceClient] Network error for ${url} (${err.message}). Retrying attempt ${attempt}/${maxRetries} in ${Math.round(delay)}ms...`
      );
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  throw lastError || new Error(`Failed to fetch ${url} after ${maxRetries} attempts`);
}
