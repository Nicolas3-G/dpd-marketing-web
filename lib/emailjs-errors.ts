/** Extract a readable message from EmailJS SDK failures (string throws or response status). */
export function getEmailjsErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    const record = error as Record<string, unknown>;
    if (typeof record.text === "string" && record.text) return record.text;
    if (typeof record.message === "string" && record.message) return record.message;
  }

  if (error instanceof Error && error.message) return error.message;

  return "Unknown EmailJS error";
}
