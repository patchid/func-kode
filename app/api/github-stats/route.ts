import { getGitHubStats } from "@/lib/github-stats";

export const revalidate = 3600;

export async function GET() {
  const stats = await getGitHubStats();
  return Response.json(stats);
}
