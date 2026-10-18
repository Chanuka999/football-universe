import { NextRequest, NextResponse } from "next/server";
import { footballApi } from "@/lib/football-api";


export type PlayerSearchResponse = {
  player: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    nationality: string;
    height?: string | null;
    weight?: string | null;
    photo: string;
  };
  statistics: Array<{
    team: {
      id: number;
      name: string;
      logo: string;
    };
    league: {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag?: string | null;
      season?: number;
    };
    games: {
      appearences: number | null;
      lineups?: number | null;
      minutes?: number | null;
      number?: number | null;
      position: string | null;
      rating: string | null;
      captain?: boolean | null;
    };
    goals: {
      total: number | null;
      conceded?: number | null;
      assists: number | null;
      saves?: number | null;
    };
  }>;
};

type SquadResponse = {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  players: Array<{
    id: number;
    name: string;
    age: number;
    number: number | null;
    position: string;
    photo: string;
  }>;
};

function formatApiErrors(errors: unknown): string | null {
  if (!errors) return null;
  if (Array.isArray(errors)) {
    if (errors.length === 0) return null;
    return errors.map((e) => String(e)).join(", ");
  }
  if (typeof errors === "object") {
    const errorEntries = Object.entries(errors as Record<string, unknown>);
    if (errorEntries.length === 0) return null;
    return errorEntries.map(([key, val]) => `${key}: ${String(val)}`).join("; ");
  }
  return String(errors);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const query = searchParams.get("q")?.trim() || "";
    const league = searchParams.get("league")?.trim() || "";
    const team = searchParams.get("team")?.trim() || "";
    const season = searchParams.get("season")?.trim() || "";

    // Case 1: If neither query nor team is provided
    if (!query && !team) {
      return NextResponse.json(
        {
          error: "Please enter a player name or select a specific team to browse.",
        },
        { status: 400 }
      );
    }

    // Case 2: Team is provided, and either no query or short query (< 4 chars)
    // Use squad endpoint for seamless browsing or short name matching
    if (team && (!query || query.length < 4)) {
      const squadData = await footballApi<SquadResponse[]>("players/squads", {
        team,
      });

      const errString = formatApiErrors(squadData.errors);
      if (errString) {
        return NextResponse.json({ error: errString }, { status: 400 });
      }

      const teamInfo = squadData.response?.[0]?.team;
      const squadPlayers = squadData.response?.[0]?.players || [];

      let filteredPlayers = squadPlayers;
      if (query) {
        const lowerQ = query.toLowerCase();
        filteredPlayers = squadPlayers.filter((p) =>
          p.name.toLowerCase().includes(lowerQ)
        );
      }

      const results: PlayerSearchResponse[] = filteredPlayers.map((p) => ({
        player: {
          id: p.id,
          name: p.name,
          firstname: p.name.split(" ")[0] || p.name,
          lastname: p.name.split(" ").slice(1).join(" ") || "",
          age: p.age,
          nationality: "Club Squad Member",
          photo: p.photo,
        },
        statistics: [
          {
            team: teamInfo || {
              id: Number(team),
              name: "Selected Club",
              logo: "",
            },
            league: {
              id: league ? Number(league) : 0,
              name: "Club Squad",
              country: "",
              logo: "",
            },
            games: {
              appearences: null,
              position: p.position,
              number: p.number,
              rating: null,
            },
            goals: {
              total: null,
              assists: null,
            },
          },
        ],
      }));

      return NextResponse.json({
        results,
        source: "squad",
        total: results.length,
      });
    }

    // Case 3: Player query is at least 4 characters
    if (query && query.length < 4) {
      return NextResponse.json(
        {
          error:
            "Player search name must be at least 4 characters (e.g. 'Messi', 'Haaland', 'Salah'). Or select a team to view its squad.",
        },
        { status: 400 }
      );
    }

    // Construct params for /players endpoint
    // API-Football requires search + (league OR team)
    const apiParams: Record<string, string> = {
      search: query,
    };

    if (league) {
      apiParams.league = league;
    }
    if (team) {
      apiParams.team = team;
    }
    if (season) {
      apiParams.season = season;
    }

    // Fallback: If neither league nor team is selected, default to UEFA Champions League (id: 2)
    if (!apiParams.league && !apiParams.team) {
      apiParams.league = "2";
    }

    const data = await footballApi<PlayerSearchResponse[]>("players", apiParams);

    const errString = formatApiErrors(data.errors);
    if (errString) {
      return NextResponse.json(
        {
          error: errString,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      results: data.response || [],
      paging: data.paging,
      source: "search",
      total: data.response?.length || 0,
      appliedFilters: {
        query,
        league: apiParams.league || null,
        team: apiParams.team || null,
      },
    });
  } catch (error) {
    console.error("Player search error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to search players from Football API",
      },
      { status: 500 }
    );
  }
}