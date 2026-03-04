/**
 * Cliente da API do Analista de Mídia.
 * Em dev: proxy Vite /api → localhost:8000.
 * Em prod: use VITE_API_URL se a API estiver em outro domínio.
 */

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export interface AgentResponse {
  answer: string;
  sources_used: string[];
}

export interface HealthResponse {
  status: string;
  version: string;
  openai_configured: boolean;
}

export async function askQuestion(question: string): Promise<AgentResponse> {
  const res = await fetch(`${API_BASE}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? `Erro ${res.status}`);
  }
  return res.json();
}

export async function getHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE}/api/health`);
  if (!res.ok) throw new Error(`Health check falhou: ${res.status}`);
  return res.json();
}
