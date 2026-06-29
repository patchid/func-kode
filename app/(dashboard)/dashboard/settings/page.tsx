/**
 * /dashboard/settings — Account settings
 *
 * Sprint 1: placeholder shell
 * Sprint 2: connected accounts, notification preferences
 * Sprint 3: privacy controls, score visibility settings
 */

export const metadata = {
  title: "Settings | Patch ID",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your Patch ID account and connected platforms.
        </p>
      </div>

      {/* TODO: Sprint 2 — connected accounts panel */}
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        Settings panel coming in Sprint 2.
      </div>
    </div>
  );
}
