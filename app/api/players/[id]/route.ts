import { NextRequest, NextResponse } from "next/server";
import { footballApi } from "@/lib/football-api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Player ID is required" },
        { status: 400 }
      );
    }

    // Get current season
    const currentYear = new Date().getFullYear();

    const playerData = await footballApi(
      "players",
      {
        id,
        season: String(currentYear - 1),
      }
    );

    // Get player's associated teams/seasons
    const teamsData = await footballApi(
      "players/squads",
      {
        player: id,
      }
    );

    return NextResponse.json({
      player: playerData.response,
      teams: teamsData.response,
      errors: {
        player: playerData.errors,
        teams: teamsData.errors,
      },
    });
  } catch (error) {
    console.error("Player profile error:", error);

    return NextResponse.json(
      {
        error: "Failed to load player profile",
      },
      { status: 500 }
    );
  }
}