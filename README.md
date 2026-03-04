# Analista de Mídia — Frontend

Interface React para consumir a **API do Analista de Mídia** (agente de IA + BigQuery).

**Backend (API) em repositório separado:** [analista-midia-backend](https://github.com/SEU_USUARIO/analista-midia-backend) *(substitua pela URL real do repositório da API)*

---

## Stack

- React 18 + TypeScript  
- Vite  
- Tailwind CSS  

---

## Pré-requisitos

- Node.js 18+  
- A **API do backend** rodando (ver repositório do backend)  

---

## Desenvolvimento

1. **Suba a API** (no repositório do backend):
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Neste repositório:**
   ```bash
   npm install
   npm run dev
   ```

3. Acesse **http://localhost:5173**.  
   O Vite faz proxy de `/api` para `http://localhost:8000`, então não é necessário configurar URL da API em desenvolvimento.

---

## Produção

- **Build:** `npm run build` → saída em `dist/`.
- **Preview local:** `npm run preview`.

Para apontar para a API em outro domínio, crie um `.env` na raiz:

```env
VITE_API_URL=https://sua-api.com
```

O frontend fará as requisições para `https://sua-api.com/api/ask` e `https://sua-api.com/api/health`. A API precisa permitir CORS da origem do frontend.

---

## Estrutura

```
src/
├── api/
│   └── client.ts       # askQuestion(), getHealth()
├── components/
│   ├── HealthBadge.tsx
│   ├── AskForm.tsx
│   └── AnswerCard.tsx
├── App.tsx
├── main.tsx
└── index.css
```

---

## Dois repositórios

- **Backend (API):** [analista-midia-backend](https://github.com/SEU_USUARIO/analista-midia-backend) — FastAPI, LangChain, BigQuery.
- **Frontend (este):** [analista-midia-frontend](https://github.com/SEU_USUARIO/analista-midia-frontend) — React, Vite, Tailwind.

Para publicar este frontend no GitHub, crie um repositório vazio (ex.: `analista-midia-frontend`), depois na pasta deste projeto:

```bash
git init
git add .
git commit -m "Frontend React + Tailwind para Analista de Mídia"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/analista-midia-frontend.git
git push -u origin main
```

Atualize o link do backend no topo deste README.

---

## Licença

MIT
