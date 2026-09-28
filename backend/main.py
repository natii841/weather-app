import os
from dotenv import load_dotenv  # <-- Changed here
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests

load_dotenv()  # <-- Changed here
API_KEY = os.getenv("OPENWEATHER_API_KEY")

app = FastAPI()

# Enable CORS so your React frontend can talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/weather")
def get_weather(city: str):
  if not API_KEY:
    raise HTTPException(
        status_code=500, detail="API key not set in environment variables."
    )

  url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

  response = requests.get(url)
  if response.status_code != 200:
    raise HTTPException(status_code=404, detail="City not found")

  data = response.json()

  # Format and return the specific fields your frontend needs
  return {
      "city": data.get("name"),
      "country": data["sys"].get("country"),
      "temperature": f"{round(data['main']['temp'])}°C",
      "feels_like": f"{round(data['main']['feels_like'])}°C",
      "humidity": f"{data['main']['humidity']}%",
      "wind": f"{data['wind']['speed']} m/s",
      "condition": data["weather"][0]["description"],
      "icon": data["weather"][0]["icon"],
  }