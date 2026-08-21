import { NextResponse } from "next/server";

const GITHUB_USERNAME = "nguyen-duong-tien-phat";

export async function GET() {
  const year = new Date().getFullYear();

  const from = new Date(`${year}-01-01T00:00:00.000Z`);
  const to = new Date(`${year}-12-31T23:59:59.999Z`);

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection(
          from: "${from.toISOString()}"
          to: "${to.toISOString()}"
        ) {
          contributionCalendar {
            totalContributions

            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      // next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub contributions" },
        { status: response.status },
      );
    }

    const result = await response.json();

    const calendar =
      result.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(
        { error: "GitHub user not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      year,
      ...calendar,
    });
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
