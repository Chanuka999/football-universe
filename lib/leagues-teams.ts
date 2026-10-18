export type TeamItem = {
  id: number;
  name: string;
  logo: string;
};

export type LeagueItem = {
  id: number;
  name: string;
  country: string;
  logo: string;
  teams: TeamItem[];
};

export const LEAGUES: LeagueItem[] = [
  {
    id: 39,
    name: "Premier League",
    country: "England",
    logo: "https://media.api-sports.io/football/leagues/39.png",
    teams: [
      { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png" },
      { id: 42, name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" },
      { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" },
      { id: 33, name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png" },
      { id: 49, name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png" },
      { id: 47, name: "Tottenham Hotspur", logo: "https://media.api-sports.io/football/teams/47.png" },
      { id: 66, name: "Aston Villa", logo: "https://media.api-sports.io/football/teams/66.png" },
      { id: 34, name: "Newcastle United", logo: "https://media.api-sports.io/football/teams/34.png" },
      { id: 51, name: "Brighton & Hove Albion", logo: "https://media.api-sports.io/football/teams/51.png" },
      { id: 48, name: "West Ham United", logo: "https://media.api-sports.io/football/teams/48.png" },
      { id: 36, name: "Fulham", logo: "https://media.api-sports.io/football/teams/36.png" },
      { id: 55, name: "Brentford", logo: "https://media.api-sports.io/football/teams/55.png" },
      { id: 52, name: "Crystal Palace", logo: "https://media.api-sports.io/football/teams/52.png" },
      { id: 35, name: "AFC Bournemouth", logo: "https://media.api-sports.io/football/teams/35.png" },
      { id: 65, name: "Nottingham Forest", logo: "https://media.api-sports.io/football/teams/65.png" },
      { id: 45, name: "Everton", logo: "https://media.api-sports.io/football/teams/45.png" },
      { id: 39, name: "Wolverhampton Wanderers", logo: "https://media.api-sports.io/football/teams/39.png" },
      { id: 46, name: "Leicester City", logo: "https://media.api-sports.io/football/teams/46.png" },
      { id: 41, name: "Southampton", logo: "https://media.api-sports.io/football/teams/41.png" },
      { id: 57, name: "Ipswich Town", logo: "https://media.api-sports.io/football/teams/57.png" },
    ],
  },
  {
    id: 140,
    name: "La Liga",
    country: "Spain",
    logo: "https://media.api-sports.io/football/leagues/140.png",
    teams: [
      { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" },
      { id: 529, name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" },
      { id: 530, name: "Atletico Madrid", logo: "https://media.api-sports.io/football/teams/530.png" },
      { id: 531, name: "Athletic Club", logo: "https://media.api-sports.io/football/teams/531.png" },
      { id: 548, name: "Real Sociedad", logo: "https://media.api-sports.io/football/teams/548.png" },
      { id: 543, name: "Real Betis", logo: "https://media.api-sports.io/football/teams/543.png" },
      { id: 547, name: "Girona", logo: "https://media.api-sports.io/football/teams/547.png" },
      { id: 533, name: "Villarreal", logo: "https://media.api-sports.io/football/teams/533.png" },
      { id: 536, name: "Sevilla", logo: "https://media.api-sports.io/football/teams/536.png" },
      { id: 532, name: "Valencia", logo: "https://media.api-sports.io/football/teams/532.png" },
      { id: 538, name: "Celta Vigo", logo: "https://media.api-sports.io/football/teams/538.png" },
      { id: 798, name: "Mallorca", logo: "https://media.api-sports.io/football/teams/798.png" },
      { id: 727, name: "Osasuna", logo: "https://media.api-sports.io/football/teams/727.png" },
      { id: 728, name: "Rayo Vallecano", logo: "https://media.api-sports.io/football/teams/728.png" },
      { id: 546, name: "Getafe", logo: "https://media.api-sports.io/football/teams/546.png" },
      { id: 540, name: "Espanyol", logo: "https://media.api-sports.io/football/teams/540.png" },
    ],
  },
  {
    id: 135,
    name: "Serie A",
    country: "Italy",
    logo: "https://media.api-sports.io/football/leagues/135.png",
    teams: [
      { id: 505, name: "Inter Milan", logo: "https://media.api-sports.io/football/teams/505.png" },
      { id: 496, name: "Juventus", logo: "https://media.api-sports.io/football/teams/496.png" },
      { id: 489, name: "AC Milan", logo: "https://media.api-sports.io/football/teams/489.png" },
      { id: 492, name: "Napoli", logo: "https://media.api-sports.io/football/teams/492.png" },
      { id: 497, name: "AS Roma", logo: "https://media.api-sports.io/football/teams/497.png" },
      { id: 487, name: "Lazio", logo: "https://media.api-sports.io/football/teams/487.png" },
      { id: 499, name: "Atalanta", logo: "https://media.api-sports.io/football/teams/499.png" },
      { id: 502, name: "Fiorentina", logo: "https://media.api-sports.io/football/teams/502.png" },
      { id: 500, name: "Bologna", logo: "https://media.api-sports.io/football/teams/500.png" },
      { id: 503, name: "Torino", logo: "https://media.api-sports.io/football/teams/503.png" },
      { id: 1005, name: "Como", logo: "https://media.api-sports.io/football/teams/1005.png" },
      { id: 494, name: "Udinese", logo: "https://media.api-sports.io/football/teams/494.png" },
    ],
  },
  {
    id: 78,
    name: "Bundesliga",
    country: "Germany",
    logo: "https://media.api-sports.io/football/leagues/78.png",
    teams: [
      { id: 157, name: "Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png" },
      { id: 168, name: "Bayer Leverkusen", logo: "https://media.api-sports.io/football/teams/168.png" },
      { id: 165, name: "Borussia Dortmund", logo: "https://media.api-sports.io/football/teams/165.png" },
      { id: 173, name: "RB Leipzig", logo: "https://media.api-sports.io/football/teams/173.png" },
      { id: 169, name: "Eintracht Frankfurt", logo: "https://media.api-sports.io/football/teams/169.png" },
      { id: 172, name: "VfB Stuttgart", logo: "https://media.api-sports.io/football/teams/172.png" },
      { id: 160, name: "SC Freiburg", logo: "https://media.api-sports.io/football/teams/160.png" },
      { id: 161, name: "VfL Wolfsburg", logo: "https://media.api-sports.io/football/teams/161.png" },
      { id: 163, name: "Borussia Mönchengladbach", logo: "https://media.api-sports.io/football/teams/163.png" },
      { id: 162, name: "Werder Bremen", logo: "https://media.api-sports.io/football/teams/162.png" },
    ],
  },
  {
    id: 61,
    name: "Ligue 1",
    country: "France",
    logo: "https://media.api-sports.io/football/leagues/61.png",
    teams: [
      { id: 85, name: "Paris Saint-Germain", logo: "https://media.api-sports.io/football/teams/85.png" },
      { id: 91, name: "Monaco", logo: "https://media.api-sports.io/football/teams/91.png" },
      { id: 81, name: "Marseille", logo: "https://media.api-sports.io/football/teams/81.png" },
      { id: 80, name: "Lyon", logo: "https://media.api-sports.io/football/teams/80.png" },
      { id: 79, name: "Lille", logo: "https://media.api-sports.io/football/teams/79.png" },
      { id: 84, name: "Nice", logo: "https://media.api-sports.io/football/teams/84.png" },
      { id: 116, name: "Lens", logo: "https://media.api-sports.io/football/teams/116.png" },
      { id: 106, name: "Brest", logo: "https://media.api-sports.io/football/teams/106.png" },
      { id: 94, name: "Rennes", logo: "https://media.api-sports.io/football/teams/94.png" },
    ],
  },
  {
    id: 2,
    name: "UEFA Champions League",
    country: "World",
    logo: "https://media.api-sports.io/football/leagues/2.png",
    teams: [
      { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" },
      { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png" },
      { id: 157, name: "Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png" },
      { id: 529, name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" },
      { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" },
      { id: 42, name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" },
      { id: 85, name: "Paris Saint-Germain", logo: "https://media.api-sports.io/football/teams/85.png" },
      { id: 505, name: "Inter Milan", logo: "https://media.api-sports.io/football/teams/505.png" },
      { id: 168, name: "Bayer Leverkusen", logo: "https://media.api-sports.io/football/teams/168.png" },
      { id: 165, name: "Borussia Dortmund", logo: "https://media.api-sports.io/football/teams/165.png" },
      { id: 530, name: "Atletico Madrid", logo: "https://media.api-sports.io/football/teams/530.png" },
      { id: 496, name: "Juventus", logo: "https://media.api-sports.io/football/teams/496.png" },
      { id: 489, name: "AC Milan", logo: "https://media.api-sports.io/football/teams/489.png" },
      { id: 228, name: "Sporting CP", logo: "https://media.api-sports.io/football/teams/228.png" },
      { id: 211, name: "Benfica", logo: "https://media.api-sports.io/football/teams/211.png" },
      { id: 169, name: "Aston Villa", logo: "https://media.api-sports.io/football/teams/66.png" },
    ],
  },
  {
    id: 253,
    name: "Major League Soccer (MLS)",
    country: "USA",
    logo: "https://media.api-sports.io/football/leagues/253.png",
    teams: [
      { id: 9568, name: "Inter Miami", logo: "https://media.api-sports.io/football/teams/9568.png" },
      { id: 1604, name: "LA Galaxy", logo: "https://media.api-sports.io/football/teams/1604.png" },
      { id: 1609, name: "Los Angeles FC", logo: "https://media.api-sports.io/football/teams/1609.png" },
      { id: 1599, name: "Columbus Crew", logo: "https://media.api-sports.io/football/teams/1599.png" },
      { id: 1608, name: "New York Red Bulls", logo: "https://media.api-sports.io/football/teams/1608.png" },
      { id: 1605, name: "Atlanta United", logo: "https://media.api-sports.io/football/teams/1605.png" },
      { id: 1595, name: "Seattle Sounders", logo: "https://media.api-sports.io/football/teams/1595.png" },
      { id: 9569, name: "FC Cincinnati", logo: "https://media.api-sports.io/football/teams/9569.png" },
    ],
  },
  {
    id: 307,
    name: "Saudi Pro League",
    country: "Saudi Arabia",
    logo: "https://media.api-sports.io/football/leagues/307.png",
    teams: [
      { id: 345, name: "Al Nassr", logo: "https://media.api-sports.io/football/teams/345.png" },
      { id: 348, name: "Al Hilal", logo: "https://media.api-sports.io/football/teams/348.png" },
      { id: 346, name: "Al Ittihad", logo: "https://media.api-sports.io/football/teams/346.png" },
      { id: 347, name: "Al Ahli", logo: "https://media.api-sports.io/football/teams/347.png" },
      { id: 351, name: "Al Ettifaq", logo: "https://media.api-sports.io/football/teams/351.png" },
      { id: 350, name: "Al Shabab", logo: "https://media.api-sports.io/football/teams/350.png" },
    ],
  },
  {
    id: 71,
    name: "Brasileirão Série A",
    country: "Brazil",
    logo: "https://media.api-sports.io/football/leagues/71.png",
    teams: [
      { id: 127, name: "Flamengo", logo: "https://media.api-sports.io/football/teams/127.png" },
      { id: 121, name: "Palmeiras", logo: "https://media.api-sports.io/football/teams/121.png" },
      { id: 120, name: "Botafogo", logo: "https://media.api-sports.io/football/teams/120.png" },
      { id: 126, name: "São Paulo", logo: "https://media.api-sports.io/football/teams/126.png" },
      { id: 131, name: "Corinthians", logo: "https://media.api-sports.io/football/teams/131.png" },
      { id: 124, name: "Fluminense", logo: "https://media.api-sports.io/football/teams/124.png" },
      { id: 1062, name: "Atlético Mineiro", logo: "https://media.api-sports.io/football/teams/1062.png" },
    ],
  },
  {
    id: 94,
    name: "Liga Portugal",
    country: "Portugal",
    logo: "https://media.api-sports.io/football/leagues/94.png",
    teams: [
      { id: 228, name: "Sporting CP", logo: "https://media.api-sports.io/football/teams/228.png" },
      { id: 211, name: "Benfica", logo: "https://media.api-sports.io/football/teams/211.png" },
      { id: 212, name: "FC Porto", logo: "https://media.api-sports.io/football/teams/212.png" },
      { id: 217, name: "SC Braga", logo: "https://media.api-sports.io/football/teams/217.png" },
    ],
  },
  {
    id: 88,
    name: "Eredivisie",
    country: "Netherlands",
    logo: "https://media.api-sports.io/football/leagues/88.png",
    teams: [
      { id: 197, name: "PSV Eindhoven", logo: "https://media.api-sports.io/football/teams/197.png" },
      { id: 194, name: "Ajax", logo: "https://media.api-sports.io/football/teams/194.png" },
      { id: 247, name: "Feyenoord", logo: "https://media.api-sports.io/football/teams/247.png" },
      { id: 209, name: "AZ Alkmaar", logo: "https://media.api-sports.io/football/teams/209.png" },
    ],
  },
];

// Helper to get all popular teams across all leagues (unique by id)
export function getAllPopularTeams(): TeamItem[] {
  const map = new Map<number, TeamItem>();
  for (const league of LEAGUES) {
    for (const team of league.teams) {
      if (!map.has(team.id)) {
        map.set(team.id, team);
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getTeamsForLeague(leagueId: number | null): TeamItem[] {
  if (!leagueId) {
    return getAllPopularTeams();
  }
  const league = LEAGUES.find((l) => l.id === leagueId);
  return league ? league.teams : [];
}
