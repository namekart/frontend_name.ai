import axios from "axios";

const nameAiService = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_NAME_AI_BACKEND_SERVICE_URL}/api` ||
    "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default nameAiService;
