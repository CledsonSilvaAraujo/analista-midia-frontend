/**
 * Cliente da API do Analista de Mídia.
 * Em dev: proxy Vite /api → localhost:8000.
 * Em prod: use VITE_API_URL se a API estiver em outro domínio.
 * Autenticação: login com usuário/senha fixos, uso do token Bearer nas rotas.
 */

const API_BASE = import.meta.env.VITE_API_URL ?? "";

const LOGIN_USERNAME = "admin";
const LOGIN_PASSWORD = "123456";

let cachedToken: string | null = null;

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface AgentResponse {
  answer: string;
  sources_used: string[];
}

export interface HealthResponse {
  status: string;
  version: string;
  openai_configured: boolean;
}

export async function login(): Promise<string> {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: LOGIN_USERNAME,
      password: LOGIN_PASSWORD,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? `Login falhou: ${res.status}`);
  }
  const data: LoginResponse = await res.json();
  cachedToken = data.access_token;
  return data.access_token;
}

async function getAuthToken(): Promise<string> {
  if (cachedToken) return cachedToken;
  return login();
}

function authHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function askQuestion(question: string): Promise<AgentResponse> {
  const token = await getAuthToken();
  const res = await fetch(`${API_BASE}/api/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(token),
    },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? `Erro ${res.status}`);
  }
  return res.json();
}

export async function getHealth(): Promise<HealthResponse> {
  const token = await getAuthToken();
  const res = await fetch(`${API_BASE}/api/health`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`Health check falhou: ${res.status}`);
  return res.json();
}
