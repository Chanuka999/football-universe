"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import {
  LEAGUES,
  getTeamsForLeague,
  TeamItem,
  LeagueItem,
} from "@/lib/leagues-teams";
import { PlayerSearchResponse } from "./api/players/search/route";

type QuickSearch = {
  label: string;
  query: string;
  leagueId: number | null;
  teamId: number | null;
};

const QUICK_SEARCHES: QuickSearch[] = [
  {
    label: "👑 Mbappé (Real Madrid)",
    query: "Mbappe",
    leagueId: 140,
    teamId: 541,
  },
  {
    label: "⚡ Haaland (Man City)",
    query: "Haaland",
    leagueId: 39,
    teamId: 50,
  },
  {
    label: "🐐 Messi (Inter Miami)",
    query: "Messi",
    leagueId: 253,
    teamId: 9568,
  },
  {
    label: "⭐ Ronaldo (Al Nassr)",
    query: "Ronaldo",
    leagueId: 307,
    teamId: 345,
  },
  {
    label: "🪄 Yamal (Barcelona)",
    query: "Yamal",
    leagueId: 140,
    teamId: 529,
  },
  {
    label: "🎯 Salah (Liverpool)",
    query: "Salah",
    leagueId: 39,
    teamId: 40,
  },
  {
    label: "💎 Bellingham (Real Madrid)",
    query: "Bellingham",
    leagueId: 140,
    teamId: 541,
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const [availableTeams, setAvailableTeams] = useState<TeamItem[]>([]);
  const [players, setPlayers] = useState<PlayerSearchResponse[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [resultSource, setResultSource] = useState<string>("search");
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCurrentYear(new Date().getFullYear());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  // Update available teams whenever selected league changes
  useEffect(() => {
    const teams = getTeamsForLeague(selectedLeagueId);
    setAvailableTeams(teams);

    // If currently selected team does not belong to new league, reset it
    if (selectedTeamId && !teams.some((t) => t.id === selectedTeamId)) {
      setSelectedTeamId(null);
    }
  }, [selectedLeagueId, selectedTeamId]);

  async function performSearch(
    searchQuery: string,
    leagueId: number | null,
    teamId: number | null
  ) {
    const q = searchQuery.trim();

    if (!q && !teamId) {
      setError("Please enter a player's name or choose a team to view.");
      return;
    }

    setLoading(true);
    setError("");
    setPlayers([]);
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (leagueId) params.set("league", String(leagueId));
      if (teamId) params.set("team", String(teamId));

      const response = await fetch(`/api/players/search?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to search players");
      }

      setPlayers(data.results || []);
      setResultSource(data.source || "search");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to search players"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    performSearch(query, selectedLeagueId, selectedTeamId);
  }

  function handleQuickSearch(qs: QuickSearch) {
    startTransition(() => {
      setQuery(qs.query);
      setSelectedLeagueId(qs.leagueId);
      setSelectedTeamId(qs.teamId);
    });
    performSearch(qs.query, qs.leagueId, qs.teamId);
  }

  function handleResetFilters() {
    setQuery("");
    setSelectedLeagueId(null);
    setSelectedTeamId(null);
    setPlayers([]);
    setError("");
    setHasSearched(false);
  }

  const currentLeague = LEAGUES.find((l) => l.id === selectedLeagueId);
  const currentTeam = availableTeams.find((t) => t.id === selectedTeamId);

  // Position badge styling helper
  function getPositionStyle(pos?: string | null) {
    const p = (pos || "").toLowerCase();
    if (p.includes("attacker") || p.includes("forward")) {
      return "bg-rose-500/20 text-rose-300 border-rose-500/30";
    }
    if (p.includes("midfield")) {
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    }
    if (p.includes("defender")) {
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    }
    if (p.includes("goalkeeper")) {
      return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    }
    return "bg-zinc-800 text-zinc-300 border-zinc-700";
  }

  return (
    <main className="relative min-h-screen bg-[#07090e] text-white selection:bg-emerald-500 selection:text-black">
      {/* Dynamic ambient backdrop lighting */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[800px] rounded-full bg-gradient-to-tr from-emerald-600/15 via-cyan-500/10 to-indigo-600/10 blur-[130px]" />
        <div className="absolute top-[40%] -left-32 h-[450px] w-[450px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute top-[60%] -right-32 h-[450px] w-[450px] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 backdrop-blur-md shadow-inner shadow-emerald-500/10">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Global Football Universe
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Search Any Player
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Any League. Any Team.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
            Filter by your favorite European or international leagues, select
            specific clubs, or search players by name worldwide with official
            match statistics.
          </p>
        </header>

        {/* Quick Search Chips */}
        <section aria-label="Trending Player Searches" className="mb-8">
          <p className="mb-2.5 text-center text-xs font-medium uppercase tracking-wider text-zinc-500">
            Popular Searches
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {QUICK_SEARCHES.map((qs) => (
              <button
                key={qs.label}
                type="button"
                onClick={() => handleQuickSearch(qs)}
                className="group flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur transition-all duration-200 hover:border-emerald-500/50 hover:bg-zinc-800/80 hover:text-white"
              >
                <span>{qs.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Search & Filter Form */}
        <div className="mx-auto w-full max-w-4xl rounded-3xl border border-zinc-800/80 bg-zinc-900/70 p-4 sm:p-6 backdrop-blur-xl shadow-2xl shadow-black/80">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              {/* League Dropdown */}
              <div className="md:col-span-4">
                <label
                  htmlFor="league-select"
                  className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  <span>League / Competition</span>
                  {selectedLeagueId && (
                    <button
                      type="button"
                      onClick={() => setSelectedLeagueId(null)}
                      className="text-[11px] text-zinc-500 hover:text-zinc-300"
                    >
                      Clear
                    </button>
                  )}
                </label>

                <div className="relative">
                  <select
                    id="league-select"
                    value={selectedLeagueId ?? ""}
                    onChange={(e) => {
                      const val = e.target.value ? Number(e.target.value) : null;
                      setSelectedLeagueId(val);
                    }}
                    className="w-full appearance-none rounded-2xl border border-zinc-700/60 bg-zinc-950/80 px-4 py-3.5 text-sm text-zinc-100 outline-none transition focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="">All Leagues / Any League</option>
                    {LEAGUES.map((league: LeagueItem) => (
                      <option key={league.id} value={league.id}>
                        {league.name} ({league.country})
                      </option>
                    ))}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-zinc-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Team Dropdown */}
              <div className="md:col-span-4">
                <label
                  htmlFor="team-select"
                  className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  <span>Club / Team</span>
                  {selectedTeamId && (
                    <button
                      type="button"
                      onClick={() => setSelectedTeamId(null)}
                      className="text-[11px] text-zinc-500 hover:text-zinc-300"
                    >
                      Clear
                    </button>
                  )}
                </label>

                <div className="relative">
                  <select
                    id="team-select"
                    value={selectedTeamId ?? ""}
                    onChange={(e) => {
                      const val = e.target.value ? Number(e.target.value) : null;
                      setSelectedTeamId(val);
                    }}
                    className="w-full appearance-none rounded-2xl border border-zinc-700/60 bg-zinc-950/80 px-4 py-3.5 text-sm text-zinc-100 outline-none transition focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="">
                      {selectedLeagueId
                        ? "All Teams in this League"
                        : "All Teams / Select Club"}
                    </option>
                    {availableTeams.map((team: TeamItem) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-zinc-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Player Name Search Input */}
              <div className="md:col-span-4">
                <label
                  htmlFor="player-search"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  Player Name
                </label>
                <div className="relative">
                  <input
                    id="player-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. Messi, Haaland, Mbappé..."
                    className="w-full rounded-2xl border border-zinc-700/60 bg-zinc-950/80 px-4 py-3.5 pr-10 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400 hover:text-white"
                      aria-label="Clear player name"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
              {/* Selected Filters Pill Indicator */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                <span className="font-semibold text-zinc-500">Active Scope:</span>
                {currentLeague ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 text-emerald-300">
                    {currentLeague.name}
                  </span>
                ) : (
                  <span className="rounded-full bg-zinc-800/80 px-2.5 py-0.5 text-zinc-400">
                    Any League
                  </span>
                )}

                {currentTeam ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 text-cyan-300">
                    {currentTeam.name}
                  </span>
                ) : (
                  <span className="rounded-full bg-zinc-800/80 px-2.5 py-0.5 text-zinc-400">
                    Any Team
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex w-full sm:w-auto items-center gap-2.5">
                {(query || selectedLeagueId || selectedTeamId) && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="flex-1 sm:flex-none rounded-2xl border border-zinc-700/80 bg-zinc-800/50 px-4 py-3 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700/50 hover:text-white"
                  >
                    Reset
                  </button>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 px-7 py-3 text-sm font-bold text-zinc-950 transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-emerald-500/20"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin text-zinc-950"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Searching...</span>
                    </>
                  ) : selectedTeamId && !query ? (
                    <>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span>View Team Squad</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <span>Search Players</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            className="mx-auto mt-6 flex w-full max-w-4xl items-center gap-3 rounded-2xl border border-red-500/30 bg-red-950/40 p-4 text-sm text-red-200 backdrop-blur"
          >
            <svg
              className="h-5 w-5 flex-shrink-0 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="flex-1">{error}</p>
          </div>
        )}

        {/* Search Results Summary Header */}
        {hasSearched && !loading && !error && (
          <div className="mx-auto mt-10 flex w-full max-w-6xl items-center justify-between border-b border-zinc-800/80 pb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                {resultSource === "squad"
                  ? `${currentTeam?.name || "Team"} Squad`
                  : `Search Results`}
              </h2>
              <p className="text-xs text-zinc-400">
                Found {players.length} player{players.length === 1 ? "" : "s"}
                {query ? ` matching "${query}"` : ""}
                {currentLeague ? ` in ${currentLeague.name}` : ""}
                {currentTeam ? ` for ${currentTeam.name}` : ""}
              </p>
            </div>

            {players.length > 0 && (
              <span className="rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-300">
                {players.length} Record{players.length === 1 ? "" : "s"}
              </span>
            )}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-zinc-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-zinc-800" />
                    <div className="h-3 w-1/2 rounded bg-zinc-800" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <div className="h-12 rounded-xl bg-zinc-800/60" />
                  <div className="h-12 rounded-xl bg-zinc-800/60" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Player Results Grid */}
        {!loading && players.length > 0 && (
          <div className="mx-auto mt-8 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {players.map((item) => {
              const p = item.player;
              const stats = item.statistics?.[0];
              const teamInfo = stats?.team;
              const leagueInfo = stats?.league;
              const position = stats?.games?.position;
              const appearances = stats?.games?.appearences;
              const goals = stats?.goals?.total;
              const assists = stats?.goals?.assists;
              const rating = stats?.games?.rating;
              const jerseyNumber = stats?.games?.number;

              return (
                <div
                  key={p.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/90 via-zinc-900/60 to-zinc-950/90 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-950/30"
                >
                  {/* Subtle card glow */}
                  <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-colors" />

                  {/* Top card bar: Player Photo + Name + Badges */}
                  <div>
                    <div className="flex items-start gap-4">
                      {/* Photo with Team Crest Badge */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={p.photo}
                          alt={p.name}
                          loading="lazy"
                          className="h-20 w-20 rounded-2xl object-cover bg-zinc-800 border border-zinc-700/60 shadow-md"
                          onError={(e) => {
                            // Fallback if image fails to load
                            (e.target as HTMLImageElement).src =
                              "https://media.api-sports.io/football/players/1.png";
                          }}
                        />

                        {teamInfo?.logo && (
                          <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 p-1 shadow-lg">
                            <img
                              src={teamInfo.logo}
                              alt={teamInfo.name}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        )}
                      </div>

                      {/* Name & Basic Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {jerseyNumber && (
                            <span className="rounded-md bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold text-zinc-300">
                              #{jerseyNumber}
                            </span>
                          )}
                          <h3
                            title={p.name}
                            className="truncate text-lg font-bold text-white group-hover:text-emerald-300 transition-colors"
                          >
                            {p.name}
                          </h3>
                        </div>

                        {p.firstname && p.lastname && (
                          <p className="truncate text-xs text-zinc-400">
                            {p.firstname} {p.lastname}
                          </p>
                        )}

                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          {position && (
                            <span
                              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${getPositionStyle(
                                position
                              )}`}
                            >
                              {position}
                            </span>
                          )}

                          <span className="rounded-full border border-zinc-800 bg-zinc-800/60 px-2 py-0.5 text-[11px] text-zinc-300">
                            {p.age ? `${p.age} yrs` : "Age N/A"}
                          </span>

                          {p.nationality && (
                            <span className="truncate rounded-full border border-zinc-800 bg-zinc-800/40 px-2 py-0.5 text-[11px] text-zinc-400">
                              {p.nationality}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Club and League affiliations */}
                    <div className="mt-4 space-y-1.5 border-t border-zinc-800/80 pt-3">
                      {teamInfo?.name && (
                        <div className="flex items-center gap-2 text-xs text-zinc-300">
                          <span className="text-zinc-500 font-medium">Club:</span>
                          <span className="truncate font-semibold text-zinc-200">
                            {teamInfo.name}
                          </span>
                        </div>
                      )}

                      {leagueInfo?.name && (
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <span className="text-zinc-500 font-medium">League:</span>
                          <span className="truncate">
                            {leagueInfo.name}
                            {leagueInfo.country ? ` (${leagueInfo.country})` : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Player Stats Grid (when available) */}
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-zinc-800/80 pt-3 text-center">
                    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-2">
                      <p className="text-[10px] uppercase font-semibold text-zinc-500">
                        Apps
                      </p>
                      <p className="text-sm font-bold text-white">
                        {appearances !== null && appearances !== undefined
                          ? appearances
                          : "-"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-2">
                      <p className="text-[10px] uppercase font-semibold text-zinc-500">
                        Goals
                      </p>
                      <p className="text-sm font-bold text-emerald-400">
                        {goals !== null && goals !== undefined ? goals : "-"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-2">
                      <p className="text-[10px] uppercase font-semibold text-zinc-500">
                        {rating ? "Rating" : "Assists"}
                      </p>
                      <p className="text-sm font-bold text-cyan-300">
                        {rating
                          ? Number(rating).toFixed(1)
                          : assists !== null && assists !== undefined
                          ? assists
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State when searched but nothing found */}
        {hasSearched && !loading && !error && players.length === 0 && (
          <div className="mx-auto mt-12 w-full max-w-md text-center rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 backdrop-blur">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-400">
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-base font-bold text-white">
              No players found
            </h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              We couldn&apos;t find any players matching your criteria. Try adjusting
              your player name spelling, or switch the League or Team dropdown.
            </p>
            <div className="mt-5 flex justify-center gap-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="rounded-xl bg-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
              >
                Reset Search
              </button>
            </div>
          </div>
        )}

        {/* Footer info */}
        <footer className="mt-auto pt-16 pb-6 text-center text-xs text-zinc-600">
          Football Universe &copy; {currentYear ?? ""} &bull; Powered by
          API-Sports Football Data
        </footer>
      </div>
    </main>
  );
}