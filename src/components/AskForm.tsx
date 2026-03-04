import { useState, FormEvent } from "react";
import { askQuestion, type AgentResponse } from "../api/client";

const PLACEHOLDERS = [
  "Como foi o volume de usuários vindos de Search no último mês?",
  "Como foi o volume de usuários vindos de Organic no último mês?",
  "Quantos usuários vieram do Facebook no último mês?",
  "Qual dos canais tem a melhor performance? E por quê?",
  "Quais canais de tráfego existem?",
];

interface AskFormProps {
  onResult: (data: AgentResponse) => void;
}

export function AskForm({ onResult }: AskFormProps) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeholder =
    PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = question.trim();
    if (!q || loading) return;
    setError(null);
    setLoading(true);
    try {
      const data = await askQuestion(q);
      onResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar pergunta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="question" className="sr-only">
          Pergunta
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          disabled={loading}
        />
      </div>
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading || !question.trim()}
        className="w-full rounded-xl bg-primary-600 px-4 py-3 font-medium text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Analisando…" : "Perguntar ao analista"}
      </button>
    </form>
  );
}
