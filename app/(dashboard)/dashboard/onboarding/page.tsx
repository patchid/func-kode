/**
 * /dashboard/onboarding — Post-OAuth onboarding
 *
 * Shown to first-time users after GitHub OAuth completes.
 * Guides the user through:
 *   1. Confirming their GitHub identity
 *   2. Optionally connecting additional platforms (Sprint 3+)
 *   3. Generating their first Patch ID score
 *
 * Sprint 1: placeholder shell
 * Sprint 2: connect GitHub data + score generation trigger
 */

export const metadata = {
  title: "Get Started | Patch ID",
};

export default function OnboardingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Let's build your Patch ID</h1>
        <p className="mt-1 text-muted-foreground">
          We'll analyse your GitHub activity and generate your reputation score.
        </p>
      </div>

      {/* TODO: Sprint 2 — <OnboardingSteps /> */}
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        Onboarding flow coming in Sprint 2.
      </div>
    </div>
  );
}
