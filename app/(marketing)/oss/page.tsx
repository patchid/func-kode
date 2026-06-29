/**
 * /oss — Open Source Community page
 *
 * Publicly accessible. No auth required.
 * Links out to the func-kode open source repo and community resources.
 *
 * URL: patch-id.com/oss
 */

import Link from "next/link";

export const metadata = {
  title: "Open Source | Patch ID",
  description:
    "Patch ID is built in the open. Explore our open source projects, contribute, and build with us.",
};

export default function OSSPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-24">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Built in the open.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Patch ID is community-first. Our core tooling lives on GitHub and
          anyone can contribute, fork, or integrate.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="https://github.com/patchid/func-kode"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
        >
          View on GitHub
        </Link>
        <Link
          href="/connect"
          className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition hover:bg-accent"
        >
          Get your Patch ID
        </Link>
      </div>

      {/* TODO: Sprint 2 — add live contributor list pulled from GitHub API */}
    </main>
  );
}
