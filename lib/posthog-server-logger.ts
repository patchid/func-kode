import {
  type AnyValueMap,
  type Logger,
  SeverityNumber,
} from "@opentelemetry/api-logs";

export function getPosthogServerLogger(): Logger | undefined {
  return globalThis.__posthogLogger;
}

export type PosthogLogAttributes = AnyValueMap;

export function emitPosthogLog(params: {
  body: string;
  severityNumber?: SeverityNumber;
  severityText?: string;
  attributes?: PosthogLogAttributes;
}): void {
  const logger = getPosthogServerLogger();
  if (!logger) {
    return;
  }

  logger.emit({
    severityNumber: params.severityNumber ?? SeverityNumber.INFO,
    severityText: params.severityText ?? "INFO",
    body: params.body,
    attributes: params.attributes,
  });
}
