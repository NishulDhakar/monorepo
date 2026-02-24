# Passion Software

This is a monorepo containing a full-stack web application designed for career and passion discovery, consisting of a front-end React application, a back-end Node.js application, and a Python-based AI service.

## Architecture and Structure

The project is structured into three main applications under the `apps/` directory:

1. **web** (Frontend)
2. **api** (Backend API)
3. **ai-service** (AI Chat API)

### 1. Web (Frontend)
Located in `apps/web`.

- **Framework**: React with TypeScript created via Vite.
- **Routing**: React Router DOM (includes protected routes).
- **State Management**: Zustand (with localStorage persistence).
- **Network Requests**: Axios.
- **Features**: User authentication logic (Login/Register), AI chat interface, Dashboard route.

### 2. API (Backend)
Located in `apps/api`.

- **Runtime environments**: Node.js and Express.
- **Language**: TypeScript (using `tsx` for execution).
- **Database**: MongoDB (Mongoose ORM).
- **Authentication**: JWT stored in HTTP-only cookies, password hashing with bcrypt.
- **Features**: Register user, Login user, Logout user.

### 3. AI Service (Chatbot)
Located in `apps/ai-service`.

- **Framework**: FastAPI (Python).
- **AI Libraries**: LangChain, Groq API.
- **Model**: Custom Prompt integrated with Groq LLM (e.g. gpt-oss-20b).
- **Features**: Analyzes user responses to 5 deep questions to uncover career interests, strengths, and optimal paths for fulfillment. Includes controlled memory to prevent token overflow.

## Running the Application

### Setup Requirements
- Node.js and npm
- Python 3.x
- MongoDB (local or Atlas)
- Groq API Key

### Running Locally

**Web Frontend**
```bash
cd apps/web
npm install
npm run dev
```

**API Backend**
```bash
cd apps/api
npm install
npm run dev
```

**AI Service**
```bash
cd apps/ai-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Features Complete
- Full user authentication (Registration, Login, Protected Routes).
- Maintained user session across browser tabs and reloads utilizing local storage caching for state and HttpOnly cookies via backend.
- Python-based microservice to interface with Groq LLM using custom prompts.
- Front-end integrated with both the API user system and the external AI Service endpoints.
