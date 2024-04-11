# instalação

- instale o Node.js.

- clone o repositório da API Clima Tempo ou crie um novo projeto e adicione o seguinte package.json:

json
{
  "name": "api_clima_tempo",
  "version": "1.0.0",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.6.7",
    "cors": "^2.8.5",
    "express": "^4.18.2"
  }
}

- no diretório do projeto, instale as dependências:


npm install


- para utilizar a API Clima Tempo, execute no terminal:


node app.js

# exemplo

- rotas
GET /clima/:cidade (Retorna as informações meteorológicas da cidade especificada.)

- parâmetros de URL
cidade: Nome da cidade desejada.

- GET /clima/São Paulo

- json
{
  "cidade": "São Paulo",
  "temperatura": "25°C",
  "condicao": "Ensolarado"
}

# código para Apikey 

- no arquivo chamado config.json coloque sua chave api entre aspas na parte entre colchetes:

{
    "apikey": "[sua chave da api]"
}

# como conseguir uma chave API 


- entre em https://openweathermap.org/api
- crie uma conta (está na navbar)
- clique no seu nome 
- vá em "My API keys"

(lembre-se sempre de instalar as dependecias)