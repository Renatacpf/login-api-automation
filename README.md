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

## Documentação Swagger

A documentação interativa da API está disponível em:  
`http://localhost:3000/api-docs`

Você pode testar a rota `/login` diretamente pelo Swagger UI.

### Exemplo de requisição

**POST** `/login`

Body (JSON):
```json
{
   "username": "user1",
   "password": "password1"
}
```

Resposta de sucesso (200):
```json
{
   "token": "fake-jwt-token"
}
```

Outros exemplos de respostas e detalhes estão disponíveis na interface do Swagger.

## Como rodar os testes

```bash
npm test
```

## Estrutura de Pastas

- `src/controllers` — Controllers da API
- `src/services` — Regras de negócio
- `src/models` — Mock de dados
- `test` — Testes automatizados



## Relatórios Allure

Os testes geram relatórios detalhados com o Allure.

### Visualização online (GitHub Pages)

Após cada execução da pipeline, o relatório Allure fica disponível visualmente em:
**[Relatório Allure - GitHub Pages](https://renatacpf.github.io/login-api-automation/)**

### Como gerar e visualizar o relatório localmente

1. Execute os testes para gerar os resultados:
   ```bash
   npm test
   ```
2. Gere o relatório Allure:
   ```bash
   npm run allure:generate
   ```
3. Abra o relatório no navegador:
   ```bash
   npm run allure:open
   ```

O diretório `allure-report` será criado com o relatório visual.

## Pipeline CI

Os testes são executados automaticamente a cada push/pull request via GitHub Actions. O relatório Allure é gerado e publicado como artefato do workflow, podendo ser baixado pela interface do GitHub Actions.

## Scripts disponíveis

- `npm start` — Inicia a API
- `npm test` — Executa os testes automatizados com geração dos resultados Allure
- `npm run allure:generate` — Gera o relatório Allure a partir dos resultados
- `npm run allure:open` — Abre o relatório Allure no navegador

## Requisitos e dependências

- Node.js 20+
- Dependências principais: express, swagger-ui-express
- Dependências de desenvolvimento: mocha, chai, sinon, supertest, mocha-allure-reporter, allure-commandline

---
Se tiver dúvidas ou problemas, consulte a documentação do Swagger em `/api-docs` ou abra uma issue no repositório.
