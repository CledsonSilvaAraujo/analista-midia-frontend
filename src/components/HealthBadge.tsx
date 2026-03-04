import { useEffect, useState } from "react";
import { getHealth, type HealthResponse } from "../api/client";

export function HealthBadge() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch((e) => setError(e instanceof Error ? e.message : "Erro"));
  }, []);

  if (error) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        API offline
      </span>
    );
  }

  if (!health) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
        Verificando…
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        health.openai_configured
          ? "bg-emerald-100 text-emerald-800"
          : "bg-amber-100 text-amber-800"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          health.openai_configured ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />
      v{health.version}
      {health.openai_configured ? " · Pronto" : " · Sem API key"}
    </span>
  );
}
