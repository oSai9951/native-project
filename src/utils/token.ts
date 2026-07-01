/**
 * Type-guard that narrows a nullable token to a non-empty string.
 */
export function isValidToken(
  token: string | null | undefined,
): token is string {
  return typeof token === 'string' && token.length > 0;
}
