/**
 * /dashboard/score — Patch ID Score detail view
 *
 * Shows the developer's full Patch ID score breakdown:
 *   - Overall score
 *   - Per-signal breakdown (PRs, reviews, issues, endorsements)
 *   - Score history over time
 *   - Shareable public profile link
 *
 * Sprint 1: placeholder shell
 * Sprint 2: live score from Core engine API
 * Sprint 3: score history chart + signal breakdown
 */

export const metadata = {
  title: "Your Score | Patch ID",
};

export default function ScorePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Your Reputation Score</h1>
        <p className="mt-1 text-muted-foreground">
          Powered by verified activity across GitHub and beyond.
        </p>
      </div>

      {/* TODO: Sprint 2 — <ScoreCard /> */}
      {/* TODO: Sprint 3 — <ScoreBreakdown /> <ScoreHistory /> */}
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        Score engine connecting in Sprint 2.
      </div>
    </div>
  );
}
