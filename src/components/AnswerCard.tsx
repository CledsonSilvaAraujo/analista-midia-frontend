import type { AgentResponse } from "../api/client";

interface AnswerCardProps {
  data: AgentResponse;
}

export function AnswerCard({ data }: AnswerCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Resposta
      </h2>
      <p className="whitespace-pre-wrap text-slate-800">{data.answer}</p>
      {data.sources_used.length > 0 && (
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="mb-2 text-xs font-medium text-slate-500">
            Ferramentas utilizadas
          </p>
          <ul className="flex flex-wrap gap-2">
            {data.sources_used.map((name) => (
              <li
                key={name}
                className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
