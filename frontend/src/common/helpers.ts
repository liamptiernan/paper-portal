/*
 * Type predicate to narrow an unknown error to an object with status and data properties
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isErrorWithData(
  error: unknown
): error is { data: { detail: string }; status: number } {
  return (
    typeof error === "object" &&
    error != null &&
    "data" in error &&
    typeof (error as any).data === "object" &&
    typeof (error as any).data.detail === "string" &&
    "status" in error &&
    typeof (error as any).status === "number"
  );
}
