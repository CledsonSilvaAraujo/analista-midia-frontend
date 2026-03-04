import { useState } from "react";
import { HealthBadge } from "./components/HealthBadge";
import { AskForm } from "./components/AskForm";
import { AnswerCard } from "./components/AnswerCard";
import type { AgentResponse } from "./api/client";

function App() {
  const [lastResult, setLastResult] = useState<AgentResponse | null>(null);

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-slate-800">
            Analista de Mídia
          </h1>
          <HealthBadge />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10">
        <p className="mb-8 text-slate-600">
          Faça perguntas em linguagem natural sobre tráfego e performance dos
          canais. O agente consulta o data warehouse e devolve insights
          acionáveis.
        </p>

        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <AskForm onResult={setLastResult} />
        </div>

        {lastResult && (
          <section>
            <AnswerCard data={lastResult} />
          </section>
        )}
      </main>

      <footer className="mt-16 border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        MVP — Agente de IA + BigQuery (thelook_ecommerce)
      </footer>
    </div>
  );
}

export default App;
