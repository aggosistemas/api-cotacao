# Projeto: API Cotação em Kubernetes (Multicloud com CI/CD)

Este projeto demonstra um ciclo completo de desenvolvimento, validação, empacotamento e entrega de uma aplicação Node.js containerizada com deploy automatizado em um cluster Kubernetes no Google Cloud Platform (GKE). Todo o processo é controlado via pipelines GitHub Actions e integra práticas de DevSecOps, incluindo análise com SonarCloud.

---

## 🚀 Funcionalidades

- API em Node.js com Express para consulta de cotações de moedas (PTAX - Banco Central)
- Documentação interativa com Swagger
- Testes automatizados com Jest
- Análise de qualidade com SonarCloud
- Imagem Docker publicada no Docker Hub
- Deploy automático no GKE via GitHub Actions
- Destruição controlada da aplicação (GKE + Docker Hub) via pipeline

---

## 🧱 Estrutura do Repositório

```
.
├── api-cotacao/
│   ├── index.js
│   ├── server.js
│   ├── routes/cotacao.js
│   ├── docs/swagger.js
│   ├── Dockerfile
│   ├── package.json
│   └── tests/cotacao.test.js
├── k8s/
│   └── deployment.yaml
├── infra-as-code/
│   └── backstage/gcp/kubernetes/
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── backend.tf
└── .github/workflows/
    ├── k8s-gcp-terraform.yml
    ├── api-cotacao.yml
    └── api-cotacao-destroy.yml
```

---

## 🔧 Tecnologias Utilizadas

- Node.js + Express
- Docker
- Kubernetes (GKE)
- Terraform + backend remoto S3
- GitHub Actions
- SonarCloud
- Swagger UI
- Jest

---

## ⚙️ Pipelines GitHub Actions

### `k8s-gcp-terraform.yml`
Provisiona ou destrói o cluster GKE via Terraform com backend remoto em S3 (AWS).

### `api-cotacao.yml`
1. Roda testes com Jest
2. Executa análise SonarCloud
3. Builda imagem Docker
4. Publica no Docker Hub
5. Aplica no GKE

### `api-cotacao-destroy.yml`
Remove deployment + service do GKE e apaga imagem Docker do Docker Hub.

---

## 🌐 Como acessar

Após deploy no GKE com Service `LoadBalancer`, a API fica acessível em:

```
http://<EXTERNAL-IP>
```

### Exemplo de endpoints:

- Swagger: `http://<EXTERNAL-IP>/api-docs`
- API: `http://<EXTERNAL-IP>/cotacao?moeda=USD&inicio=05-09-2023&fim=05-09-2023`

---

## ✅ Testes

Rodar localmente:

```bash
npm install
npm test
```

Executado automaticamente nas pipelines.

---

## 🔐 Secrets usados no GitHub Actions

- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- `GCP_PROJECT_ID`, `GCP_SA_KEY`
- `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`
- `SONAR_TOKEN`, `SONAR_PROJECT_KEY`, `SONAR_ORGANIZATION`

---

## 🧠 Autor e Finalidade
autor: aggosistemas
Este projeto foi criado com foco em aprendizado prático de DevOps, CI/CD, IaC e Kubernetes com multicloud. Ele serve como base para provisionar, escalar e manter aplicações modernas com automação.

