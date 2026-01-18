# Emailer Server

Essa aplicação é o server-side de um desáfio prático desenvolvido pra um processo seletivo.

Este projeto requer uma **chave de API da OpenAI** para funcionar.

**Repositório do client-side:** https://github.com/victorgfz/emailer_client.git

## Instalação

```bash
# Clone o repositório
git clone https://github.com/victorgfz/emailer_server.git
cd emailer_server

# Instale as dependências
npm install

# Configure a variável de ambiente

# Execute o servidor
npm run dev
```

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=8080
OPENAI_API_KEY=sk-...
```

O servidor estará disponível em `http://localhost:8080`

## Tecnologias

- Node.js
- Express
- OpenAI API
