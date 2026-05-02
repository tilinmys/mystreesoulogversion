/**
 * sanitize.ts
 *
 * Security utility for cleaning user-provided input before:
 *  - Persisting to AsyncStorage
 *  - Passing to AI context / Bloop prompts
 *  - Rendering in health records
 *
 * Defends against:
 *  - Prompt injection (<SYSTEM>, <!--, script tags)
 *  - HTML/XML injection (<b>, <script>)
 *  - Control characters and null bytes
 *  - Excessive whitespace / newline flooding
 */

/** Maximum allowed lengths per field type */
export const INPUT_LIMITS = {
  name: 60,
  notes: 500,
  summary: 800,
  vitals: 20,    // e.g. "118/76 mmHg"
  generic: 200,
} as const;

/**
 * Strips HTML tags, control characters, null bytes, and prompt-injection
 * patterns from user-provided strings.
 */
export function sanitizeInput(raw: string, maxLength: number = INPUT_LIMITS.generic): string {
  if (typeof raw !== "string") return "";

  return raw
    // Remove HTML/XML tags
    .replace(/<[^>]*>/g, "")
    // Remove null bytes
    .replace(/\0/g, "")
    // Remove control characters except newline and tab
    .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, "")
    // Strip common prompt injection markers
    .replace(/<!--.*?-->/gs, "")
    .replace(/<\/?[a-zA-Z][^>]*>/g, "")
    .replace(/\[SYSTEM\]/gi, "")
    .replace(/\[INST\]/gi, "")
    .replace(/\[\/INST\]/gi, "")
    // Collapse 3+ consecutive newlines into 2
    .replace(/\n{3,}/g, "\n\n")
    // Trim and enforce max length
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitize a name field — strips all non-letter, space, apostrophe, hyphen.
 */
export function sanitizeName(raw: string): string {
  if (typeof raw !== "string") return "";
  return raw
    .replace(/[^a-zA-Z\u00C0-\u024F\s'\-\.]/g, "")
    .trim()
    .slice(0, INPUT_LIMITS.name);
}

/**
 * Sanitize phone number — digits, +, spaces, dashes, parentheses only.
 */
export function sanitizePhone(raw: string): string {
  if (typeof raw !== "string") return "";
  return raw
    .replace(/[^0-9\+\-\s\(\)]/g, "")
    .trim()
    .slice(0, 20);
}

/**
 * Sanitize a date of birth string — digits, /, -, spaces only.
 */
export function sanitizeDob(raw: string): string {
  if (typeof raw !== "string") return "";
  return raw
    .replace(/[^0-9\/\-\s]/g, "")
    .trim()
    .slice(0, 15);
}
