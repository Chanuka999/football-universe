"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Player = {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: {
    date: string;
    place: string;
    country: string;
  };
  nationality: string;
  height: string;
  weight: string;
  photo: string;
  injured: boolean;
};

type Statistics = {
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
  };
  games: {
    appearances: number;
    lineups: number;
    minutes: number;
    position: string;
  };
  goals: {
    total: number;
    assists: number;
  };
  shots: {
    total: number;
    on: number;
  };
  passes: {
    total: number;
    key: number;
    accuracy: number;
  };
};

type PlayerResponse = {
  player: {
    player: Player;
    statistics: Statistics[];
  }[];
  teams: unknown[];
};

export default function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [data, setData] = useState<PlayerResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlayer() {
      const { id } = await params;

      try {
        const response = await fetch(`/api/players/${id}`);
        const result = await response.json();

        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadPlayer();
  }, [params]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="text-gray-400">Loading player...</p>
        </div>
      </main>
    );
  }

  if (!data?.player?.length) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Player not found
          </h1>

          <Link
            href="/"
            className="mt-5 inline-block text-gray-400 hover:text-white"
          >
            ← Back to search
          </Link>
        </div>
      </main>
    );
  }

  const player = data.player[0].player;
  const statistics = data.player[0].statistics || [];

  const totalGoals = statistics.reduce(
    (sum, stat) => sum + (stat.goals?.total || 0),
    0
  );

  const totalAssists = statistics.reduce(
    (sum, stat) => sum + (stat.goals?.assists || 0),
    0
  );

  const totalAppearances = statistics.reduce(
    (sum, stat) => sum + (stat.games?.appearances || 0),
    0
  );

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-bold"
          >
            Football Universe
          </Link>

          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white"
          >
            ← Search
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Player Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            {/* Photo */}
            <div className="shrink-0">
              <img
                src={player.photo}
                alt={player.name}
                className="h-48 w-48 rounded-3xl object-cover"
              />
            </div>

            {/* Info */}
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                Player
              </p>

              <h1 className="mt-2 text-4xl font-bold md:text-6xl">
                {player.name}
              </h1>

              <p className="mt-4 text-lg text-gray-400">
                {player.nationality}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  Age {player.age}
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  {player.height || "N/A"}
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  {player.weight || "N/A"}
                </span>

                {player.injured && (
                  <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm text-red-400">
                    Injured
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Appearances"
            value={totalAppearances}
          />

          <StatCard
            label="Goals"
            value={totalGoals}
          />

          <StatCard
            label="Assists"
            value={totalAssists}
          />

          <StatCard
            label="Competitions"
            value={statistics.length}
          />
        </section>

        {/* Career */}
        <section className="mt-12">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Career
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Football Journey
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {statistics.map((stat, index) => (
              <div
                key={`${stat.team.id}-${index}`}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={stat.team.logo}
                    alt={stat.team.name}
                    className="h-14 w-14 object-contain"
                  />

                  <div>
                    <h3 className="font-semibold">
                      {stat.team.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {stat.league.name}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <MiniStat
                    label="Apps"
                    value={stat.games.appearances || 0}
                  />

                  <MiniStat
                    label="Goals"
                    value={stat.goals.total || 0}
                  />

                  <MiniStat
                    label="Assists"
                    value={stat.goals.assists || 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Personal Information */}
        <section className="mt-12">
          <h2 className="mb-6 text-3xl font-bold">
            Personal Information
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard
              label="Date of Birth"
              value={player.birth?.date || "N/A"}
            />

            <InfoCard
              label="Birthplace"
              value={player.birth?.place || "N/A"}
            />

            <InfoCard
              label="Country"
              value={player.birth?.country || "N/A"}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-sm text-gray-500">{label}</p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-white/5 p-3">
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 font-medium">
        {value}
      </p>
    </div>
  );
}