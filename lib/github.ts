export async function getReadme(githubUrl: string, branch = "main") {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);

  if (!match) return null;

  const [, owner, repo] = match;
  const cleanRepo = repo.replace(/\.git$/, "");

  const repoBaseUrl = `https://raw.githubusercontent.com/${owner}/${cleanRepo}/${branch}`;

  const res = await fetch(`${repoBaseUrl}/README.md`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) return null;

  return {
    content: await res.text(),
    repoBaseUrl,
  };
}
