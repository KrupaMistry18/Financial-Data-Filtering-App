# Financial Data Filtering and Sorting App

This is a web application that allows users to filter and sort financial data based on various criteria. The app is built with **React** (frontend), **TailwindCSS** for styling, and **FastAPI** (backend). It fetches financial data from the [Financial Modeling Prep API](https://financialmodelingprep.com/).

## **Features**
- Filter financial data based on:
  - Date range
  - Revenue range
  - Net Income range
- Sort data by:
  - Date
  - Revenue
  - Net Income
- Fully responsive design for desktop, tablet, and mobile devices.
- Fixed "Date" column for better readability on mobile.

---

## **Getting Started**

### **Prerequisites**
Make sure you have the following installed on your system:
- **Node.js** (v16 or above)
- **Python** (v3.9 or above)
- **Pipenv** (or pip)
- **Git** (optional, for cloning the repository)

---

# **Instructions to Run the Project Locally**

## 1. Clone the Repository
- git clone https://github.com/KrupaMistry18/Financial-Data-Filtering-App.git
- cd Financial-Data-Filtering-App

## 2. Backend Setup
- cd backend

## Create and activate a virtual environment (optional, but recommended)
- python -m venv venv
- source venv/bin/activate
- On Windows: venv\Scripts\activate

## Install dependencies
- pip install -r requirements.txt

## Run the FastAPI server
- uvicorn main:app --reload

## The backend will run at: http://127.0.0.1:8000

## 3. Frontend Setup
- cd ../frontend

## Install Node.js dependencies
- npm install

## Start the React app
- npm start

## The frontend will run at: http://localhost:3000


## Deployed URL

https://financial-data-app-16a02.web.app/
