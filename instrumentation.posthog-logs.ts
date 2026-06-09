import "@/lib/posthog-server-logger";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import {
  getPostHogOtlpLogsUrl,
  isPostHogLogsEnabled,
  POSTHOG_SERVICE_NAME,
} from "@/lib/posthog-otlp";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (isPostHogLogsEnabled() && posthogKey) {
  const exporter = new OTLPLogExporter({
    url: getPostHogOtlpLogsUrl(),
    headers: {
      Authorization: `Bearer ${posthogKey}`,
    },
  });

  const loggerProvider = new LoggerProvider({
    resource: resourceFromAttributes({
      "service.name": POSTHOG_SERVICE_NAME,
    }),
    processors: [new BatchLogRecordProcessor(exporter)],
  });

  globalThis.__posthogLogger = loggerProvider.getLogger(POSTHOG_SERVICE_NAME);
}
