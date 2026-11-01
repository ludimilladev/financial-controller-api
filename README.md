🇧🇷 Português | [🇺🇸 English](README.en.md)

# Financial Controller

Aplicação de gerenciamento financeiro com backend em Python (FastAPI), banco de dados MongoDB e frontend em HTML, CSS e JavaScript. Permite visualizar, criar, editar e excluir transações, além de acompanhar o saldo.

O projeto está em desenvolvimento.

## Funcionalidades Atuais

**Backend**

- Listar transações.
- Criar uma nova transação.
- Editar uma transação existente (PUT).
- Excluir uma transação (DELETE).
- Consultar o saldo.

**Frontend**

- Exibir o saldo total, as receitas (entradas) e as despesas (saídas).
- Adicionar transações por meio de um formulário com os campos descrição, valor, tipo e categoria.
- Visualizar as transações em uma lista com rolagem vertical.
- Editar transações por meio de um modal responsivo, centralizado no desktop e exibido como bottom sheet no celular, com animações de abertura e fechamento. O modal fecha ao clicar no botão X, pressionar ESC ou clicar fora dele.
- Confirmar a exclusão de transações por meio de um modal, com um toast de sucesso exibido em seguida.
- Renderizar a lista de transações usando `textContent` para evitar injeção de HTML por meio das descrições das transações.

## Tecnologias

- Python
- FastAPI
- Uvicorn
- MongoDB (PyMongo)
- HTML, CSS e JavaScript

## Armazenamento de Dados

As transações são armazenadas no MongoDB e persistem entre as reinicializações da aplicação. A conexão é feita por meio do PyMongo, e os dados podem ser visualizados com o MongoDB Compass. Cada transação é identificada por um `_id` gerado pelo MongoDB.

## Pré-requisitos

- Python 3 instalado.
- MongoDB Community Server em execução localmente (por padrão, em `mongodb://localhost:27017`).

## Executando a Aplicação

Execute os comandos abaixo a partir do diretório raiz do projeto. As instruções de ativação do ambiente virtual são para o Windows PowerShell.

### 1. Criar um Ambiente Virtual

```powershell
python -m venv .venv
```

### 2. Ativar o Ambiente Virtual

```powershell
.\.venv\Scripts\Activate.ps1
```

### 3. Instalar as Dependências

```powershell
python -m pip install -r requirements.txt
```

### 4. Iniciar o Backend

Com o MongoDB em execução, rode:

```powershell
python -m uvicorn app.main:app --reload
```

Esse comando executa a aplicação `app` definida em `app/main.py`. A opção `--reload` reinicia o servidor sempre que o código é alterado durante o desenvolvimento.

### 5. Abrir o Frontend

Sirva o arquivo HTML do frontend usando um servidor local, como a extensão Live Server do VS Code. O frontend se comunica com a API em `http://localhost:8000`.

## Endpoints da API

Todos os endpoints usam o prefixo `/financial`.

| Método | Endpoint | Descrição |
| ------ | -------- | --------- |
| GET | `/transactions` | Listar transações |
| POST | `/transactions` | Criar uma transação |
| PUT | `/transactions/{id}` | Atualizar uma transação |
| DELETE | `/transactions/{id}` | Excluir uma transação |

## Documentação da API

Com o servidor em execução, acesse a documentação interativa para explorar e testar os endpoints:

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## Configuração de CORS

O CORS é restrito a uma lista de origens permitidas (o frontend de produção e o servidor de desenvolvimento local). Apenas os métodos `GET`, `POST`, `PUT` e `DELETE` e os cabeçalhos `Content-Type` e `Authorization` são permitidos.

## Roadmap

- [x] Implementar as funcionalidades iniciais do backend.
- [x] Integrar a API a um banco de dados para persistir as transações.
- [x] Construir a interface básica do frontend.
- [x] Editar transações (PUT).
- [x] Excluir transações (DELETE).
- [x] Restringir o CORS para produção.
- [x] Substituir o diálogo nativo `confirm()` por um modal de confirmação.
- [ ] Adicionar testes automatizados dos endpoints com pytest.

## Objetivo do Projeto

Um projeto de aprendizado e portfólio para praticar o desenvolvimento de APIs com Python e FastAPI, evoluindo gradualmente para uma aplicação completa de gerenciamento financeiro.