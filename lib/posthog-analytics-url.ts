const SENSITIVE_QUERY_PARAMS = new Set([
  "code",
  "token",
  "access_token",
  "refresh_token",
  "error",
  "error_description",
  "apikey",
  "key",
  "password",
  "secret",
]);

export function sanitizeSearchParams(searchParams: URLSearchParams): string {
  const sanitized = new URLSearchParams();

  for (const [key, value] of searchParams.entries()) {
    if (!SENSITIVE_QUERY_PARAMS.has(key.toLowerCase())) {
      sanitized.append(key, value);
    }
  }

  return sanitized.toString();
}

export function buildSanitizedPageviewUrl(pathname: string, search: string, origin: string): string {
  const url = new URL(pathname, origin);

  if (search) {
    const sanitized = new URLSearchParams();
    const params = new URLSearchParams(search);

    for (const [key, value] of params.entries()) {
      if (!SENSITIVE_QUERY_PARAMS.has(key.toLowerCase())) {
        sanitized.append(key, value);
      }
    }

    url.search = sanitized.toString();
  }

  return url.toString();
}
