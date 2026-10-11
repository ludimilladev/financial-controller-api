# Financial Controller API

API de controle financeiro desenvolvida em Python com FastAPI. Permite buscar transações, criar novas transações e consultar o saldo.

O projeto está em desenvolvimento. A primeira etapa implementa o backend; o próximo passo é construir o frontend.

## Funcionalidades atuais

- Buscar transações.
- Criar uma nova transação.
- Consultar o saldo.

## Tecnologias

- Python
- FastAPI
- Uvicorn

## Armazenamento dos dados

Atualmente, as transações são armazenadas em memória, em uma lista de dicionários, sem conexão com um banco de dados.

As novas transações não persistem após reiniciar a aplicação. A integração com um banco de dados está prevista para uma etapa futura.

## Como executar

Execute os comandos abaixo na pasta principal do projeto. As instruções de ativação do ambiente virtual são para Windows PowerShell.

### 1. Criar o ambiente virtual

```powershell
python -m venv .venv
```

### 2. Ativar o ambiente virtual

```powershell
.\.venv\Scripts\Activate.ps1
```

### 3. Instalar as dependências

```powershell
python -m pip install fastapi uvicorn
```

### 4. Iniciar a aplicação

```powershell
python -m uvicorn app.main:app --reload
```

O comando utiliza a aplicação `app` definida no arquivo `app/main.py`. A opção `--reload` reinicia o servidor quando o código é alterado durante o desenvolvimento.

## Documentação da API

Com o servidor em execução, acesse a documentação interativa para visualizar e testar as rotas:

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## Próximas etapas

- [x] Implementar as funcionalidades iniciais do backend.
- [ ] Desenvolver o frontend.
- [ ] Integrar a API com um banco de dados para persistir as transações.

## Objetivo

Projeto de estudo e portfólio para praticar o desenvolvimento de APIs com Python e FastAPI, evoluindo gradualmente para uma aplicação completa de controle financeiro.
