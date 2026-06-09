import type { Logger } from "@opentelemetry/api-logs";

declare global {
  var __posthogLogger: Logger | undefined;
}

export {};
