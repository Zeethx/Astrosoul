// File: src/app/api/recap/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");
  if (!year) {
    return NextResponse.json({ error: "Missing year parameter" }, { status: 400 });
  }

  const tmdbToken = process.env.TMDB_READ_ACCESS_TOKEN;
  if (!tmdbToken) {
    return NextResponse.json({ error: "TMDB token not configured" }, { status: 500 });
  }

  // Always default country to US if not specified
  const country = (searchParams.get("country") || "US").toUpperCase();

  try {
    // 1) TMDB v4 discover movies by birth year
    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/discover/movie?` +
        `language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false` +
        `&page=1&primary_release_year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${tmdbToken}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    const tmdbJson = await tmdbRes.json();
    const movies = Array.isArray(tmdbJson.results)
      ? tmdbJson.results.slice(0, 3).map((m: { title: string }) => m.title)
      : [];

    // 2) MusicBrainz – recordings by firstreleasedate AND default/fallback country
    const mbQuery = `firstreleasedate:${year} AND country:${country}`;

    const mbUrl = new URL("https://musicbrainz.org/ws/2/recording");
    mbUrl.searchParams.set("query", mbQuery);
    mbUrl.searchParams.set("limit", "3");
    mbUrl.searchParams.set("fmt", "json");

    const mbRes = await fetch(mbUrl.toString(), {
      headers: {
        // MusicBrainz policy: identify your app
        "User-Agent": "Astrosoul/1.0 (https://your-domain.com)",
      },
    });
    const mbJson = await mbRes.json();
    const songs = Array.isArray(mbJson.recordings)
      ? mbJson.recordings.map((r: { title: string; ["artist-credit"]: { name: string }[] }) => {
          const artist =
            Array.isArray(r["artist-credit"]) && r["artist-credit"][0]?.name
              ? r["artist-credit"][0].name
              : "Unknown Artist";
          return `${r.title} by ${artist}`;
        })
      : [];

    return NextResponse.json({ movies, songs, country });
  } catch (err) {
    console.error("recap route error:", err);
    return NextResponse.json(
      { error: "Failed to fetch year recap" },
      { status: 500 }
    );
  }
}
