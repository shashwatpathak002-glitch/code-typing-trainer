const BASE_URL = "http://localhost:8000";

export async function fetchSnippet(language = "python", difficulty = "hard") {
  const url = `${BASE_URL}/snippets?language=${language}&difficulty=${difficulty}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch snippet");
  }
  return res.json();
}
