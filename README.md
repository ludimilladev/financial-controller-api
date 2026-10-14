# Financial Controller

Aplicação de controle financeiro com backend em Python (FastAPI), banco de dados MongoDB e frontend em HTML, CSS e JavaScript. Permite listar, criar, editar e excluir transações, além de acompanhar o saldo.

O projeto está em desenvolvimento.

## Funcionalidades atuais

**Backend**

- Listar transações.
- Criar uma nova transação.
- Editar uma transação existente (PUT).
- Excluir uma transação (DELETE).
- Consultar o saldo.

**Frontend**

- Exibição do saldo total, das entradas (inflow) e das saídas (outflow).
- Formulário para adicionar uma transação (descrição, valor, tipo e categoria).
- Lista de transações com rolagem vertical.
- Modal de edição de transação, responsivo (centralizado no desktop e no formato bottom sheet no mobile), com animações de abertura e fechamento. Fecha com o botão X, com a tecla ESC ou ao clicar fora dele.
- Modal de confirmação ao excluir uma transação, com mensagem de sucesso (toast) após apagar.
- Renderização da lista com `textContent`, evitando a injeção de HTML pelas descrições.

## Tecnologias

- Python
- FastAPI
- Uvicorn
- MongoDB (PyMongo)
- HTML, CSS e JavaScript

## Armazenamento dos dados

As transações são armazenadas no MongoDB e persistem após reiniciar a aplicação. A conexão é feita com o PyMongo, e os dados podem ser visualizados com o MongoDB Compass. Cada transação é identificada pelo `_id` gerado pelo próprio MongoDB.

## Pré-requisitos

- Python 3 instalado.
- MongoDB Community Server rodando localmente (por padrão em `mongodb://localhost:27017`).

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
python -m pip install -r requirements.txt
```

### 4. Iniciar o backend

Com o MongoDB em execução, rode:

```powershell
python -m uvicorn app.main:app --reload
```

O comando utiliza a aplicação `app` definida no arquivo `app/main.py`. A opção `--reload` reinicia o servidor quando o código é alterado durante o desenvolvimento.

### 5. Abrir o frontend

Abra o arquivo HTML do frontend com um servidor local, como a extensão Live Server do VS Code. O frontend se comunica com a API em `http://localhost:8000`.

## Rotas da API

Todas as rotas têm o prefixo `/financial`.

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| GET | `/transactions` | Lista as transações |
| POST | `/transactions` | Cria uma transação |
| PUT | `/transactions/{id}` | Atualiza uma transação |
| DELETE | `/transactions/{id}` | Exclui uma transação |

## Documentação da API

Com o servidor em execução, acesse a documentação interativa para visualizar e testar as rotas:

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## Observação sobre CORS

O CORS está restrito a uma lista de origens permitidas (frontend em produção e o servidor local de desenvolvimento) e libera apenas os métodos `GET`, `POST`, `PUT` e `DELETE` e os cabeçalhos `Content-Type` e `Authorization`.

## Próximas etapas

- [x] Implementar as funcionalidades iniciais do backend.
- [x] Integrar a API com um banco de dados para persistir as transações.
- [x] Desenvolver a interface básica do frontend.
- [x] Editar transações (PUT).
- [x] Excluir transações (DELETE).
- [x] Restringir o CORS para produção.
- [x] Substituir o `confirm()` nativo por um modal de confirmação.
- [ ] Adicionar testes automatizados nas rotas (pytest).

## Objetivo

Projeto de estudo e portfólio para praticar o desenvolvimento de APIs com Python e FastAPI, evoluindo gradualmente para uma aplicação completa de controle financeiro.