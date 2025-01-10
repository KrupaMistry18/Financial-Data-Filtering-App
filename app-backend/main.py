from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = FastAPI()

# API Key and API URL
key = os.getenv('API_KEY')
API_URL = f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={key}"

# Enable CORS for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory cache for storing financial data
cached_data = None

def fetch_data_from_api():
    """
    Fetch financial data from the API and store it in memory.
    """
    global cached_data
    try:
        print("Fetching data from API...")
        response = requests.get(API_URL, timeout=10)
        response.raise_for_status()
        data = response.json()

        if isinstance(data, list):
            cached_data = data  # Store data in cache
            print(f"Data successfully cached. {len(data)} records loaded.")
        else:
            print("Unexpected API response format.")
            cached_data = []

    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch data: {str(e)}")
        cached_data = []  # Set to an empty list if API fails

# Route to fetch all financial data (loads cache if not already fetched)
@app.get("/all-financial-data/")
async def get_all_financial_data():
    """
    Return all cached financial data. If cache is empty, fetch from API.
    """
    global cached_data
    if cached_data is None:
        fetch_data_from_api()
    if not cached_data:
        return {"error": "No financial data available"}
    return cached_data

@app.get("/filtered-financial-data/")
async def get_filtered_financial_data(
    start_year: int = Query(None),
    end_year: int = Query(None),
    min_revenue: float = Query(None),
    max_revenue: float = Query(None),
    min_net_income: float = Query(None),
    max_net_income: float = Query(None)
):
    """
    Return filtered financial data from cached data.
    """
    global cached_data
    if cached_data is None:
        fetch_data_from_api()
    if not cached_data:
        return {"error": "No financial data available"}

    # Apply filtering
    filtered_data = []
    for item in cached_data:
        if 'date' not in item or 'revenue' not in item or 'netIncome' not in item:
            continue

        year = int(item['date'].split('-')[0])
        revenue = int(item.get('revenue', 0))
        net_income = int(item.get('netIncome', 0))

        if start_year and year < start_year:
            continue
        if end_year and year > end_year:
            continue
        if min_revenue and revenue < min_revenue * 1e9:
            continue
        if max_revenue and revenue > max_revenue * 1e9:
            continue
        if min_net_income and net_income < min_net_income * 1e9:
            continue
        if max_net_income and net_income > max_net_income * 1e9:
            continue

        filtered_data.append(item)

    return filtered_data

@app.get("/sorted-financial-data/")
async def get_sorted_financial_data(
    sort_by: str = Query("date"),  # Options: "date", "revenue", "net_income"
    sort_order: str = Query("asc"),  # Options: "asc", "desc"
):
    """
    Return sorted financial data from cached data.
    """
    global cached_data
    if cached_data is None:
        fetch_data_from_api()
    if not cached_data:
        return {"error": "No financial data available"}

    # Mapping user-friendly sort fields to API response keys
    sort_key_map = {
        "date": "date",
        "revenue": "revenue",
        "net_income": "netIncome",
    }
    sort_key = sort_key_map.get(sort_by, "date")

    reverse = sort_order == "desc"

    try:
        sorted_data = sorted(
            cached_data,
            key=lambda x: (
                int(x.get(sort_key, 0) if x.get(sort_key) is not None else 0)
                if sort_key != "date" else x.get("date", "")
            ),
            reverse=reverse,
        )
        return sorted_data

    except Exception as e:
        return {"error": f"Failed to sort data: {str(e)}"}
