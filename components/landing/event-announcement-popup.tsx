"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X, PartyPopper } from "lucide-react";

/**
 * Event announcement configuration.
 *
 * Set `enabled` to false to hide the popup entirely without removing the component.
 * Update these values for future events — the component handles the rest.
 */
export interface EventAnnouncementConfig {
  enabled: boolean;
  eventName: string;
  eventDate: string;
  eventDescription: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  delayMs: number;
}

const DEFAULT_CONFIG: EventAnnouncementConfig = {
  enabled: true,
  eventName: "🎉 Server Launch Party",
  eventDate: "Sunday — time TBD (IST)",
  eventDescription:
    "Join the func-kode Launch Party to kick off the community, meet other developers, explore the server, and hear what's coming next.",
  ctaLabel: "Join the Party 🚀",
  ctaHref: "https://discord.gg/nnkA8xJ3JU",
  secondaryLabel: "Maybe Later",
  delayMs: 1500,
};

/**
 * Session-scoped storage key for dismissal tracking.
 * The popup will not reappear for the duration of the browser session
 * once dismissed (uses sessionStorage, not localStorage).
 */
const SESSION_DISMISS_KEY = "funkode_event_announcement_dismissed";

interface EventAnnouncementPopupProps {
  config?: Partial<EventAnnouncementConfig>;
}

export function EventAnnouncementPopup({
  config: configOverride,
}: EventAnnouncementPopupProps) {
  const config = { ...DEFAULT_CONFIG, ...configOverride };
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  // Check session storage on mount
  useEffect(() => {
    const wasDismissed =
      typeof window !== "undefined" &&
      sessionStorage.getItem(SESSION_DISMISS_KEY) === "true";
    setDismissed(wasDismissed || !config.enabled);
  }, [config.enabled]);

  // Show after delay
  useEffect(() => {
    if (dismissed) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, config.delayMs);

    return () => clearTimeout(timer);
  }, [dismissed, config.delayMs]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    sessionStorage.setItem(SESSION_DISMISS_KEY, "true");
  }, []);

  // Also dismiss on Escape key
  useEffect(() => {
    if (!visible) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible, handleDismiss]);

  if (!visible || dismissed) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Event announcement: ${config.eventName}`}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="pointer-events-auto w-full max-w-md bg-gradient-to-br from-card via-card to-muted/30 rounded-2xl shadow-2xl border border-border/50 animate-in zoom-in-95 duration-300 ease-out">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-indigo-500/10 rounded-t-2xl p-6 pb-4">
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              aria-label="Close announcement"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <PartyPopper className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {config.eventName}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {config.eventDate}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 pt-4 space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {config.eventDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={config.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                {config.ctaLabel}
              </Link>
              <button
                onClick={handleDismiss}
                className="flex-1 px-5 py-2.5 border border-border bg-background hover:bg-muted text-foreground font-medium rounded-xl transition-all duration-200 hover:shadow-sm text-sm"
              >
                {config.secondaryLabel ?? "Maybe Later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
