const API_BASE_URL =
  process.env.API_FOOTBALL_BASE_URL ||
  "https://v3.football.api-sports.io";

function getApiKey(): string {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    throw new Error("API_FOOTBALL_KEY is missing");
  }

  return apiKey;
}

const API_KEY = getApiKey();

type ApiFootballResponse<T> = {
  get: string;
  parameters: Record<string, string>;
  errors: Record<string, string> | string[] | unknown[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T;
};

export async function footballApi<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<ApiFootballResponse<T>> {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${API_BASE_URL}/${endpoint}?${searchParams.toString()}`,
    {
      headers: {
        "x-apisports-key": API_KEY,
      },
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `API-Football request failed: ${response.status}`
    );
  }

  return response.json();
}