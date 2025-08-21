# Login API Automation

API simples de login com separação em Controller, Service e Model, testes automatizados e CI com GitHub Actions.

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie a API:
   ```bash
   npm start
   ```

A API estará disponível em `http://localhost:3000`.

## Como rodar os testes

```bash
npm test
```

## Estrutura de Pastas

- `src/controllers` — Controllers da API
- `src/services` — Regras de negócio
- `src/models` — Mock de dados
- `test` — Testes automatizados

## Pipeline CI

Os testes são executados automaticamente a cada push/pull request via GitHub Actions.
