from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
SNIPPETS_PATH = BASE_DIR / "snippets.json"


def load_snippets():
    with SNIPPETS_PATH.open("r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/snippets")
def get_snippet(language: str = "python", difficulty: str = "hard"):
    data = load_snippets()
    lang_data = data.get(language, {})
    options = lang_data.get(difficulty, [])
    if not options:
        return {"language": language, "difficulty": difficulty, "snippet": ""}
    return {
        "language": language,
        "difficulty": difficulty,
        "snippet": options[0],
    }
