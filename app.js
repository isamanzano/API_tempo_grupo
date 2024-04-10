const express = require ('express'); // Importando o módulo express
const axios = require ('axios'); // Importando o módulo axios
const path = require ('path'); // Importando o módulo path
const cors = require ('cors'); // Importando o módulo cors
const config = require ('./config.json'); // Importando o arquivo de configuração
const apikey = config.apikey; // Obtendo a chave da API do arquivo de configuração

const app = express(); // Inicializando o aplicativo express
app.listen(80); // Configurando o aplicativo para escutar na porta 80

app.use(cors()); // Habilitando o CORS no aplicativo
app.use(express.json()); // Utilizando o middleware express.json para análise de JSON
app.use(express.static(path.join(__dirname, 'public'))); // Servindo arquivos estáticos do diretório 'public'

function traducaoClima() {
    return {
        "Thunderstorm": "Tempestade",
        "thunderstorm with light rain": "Tempestade",
        "thunderstorm with rain": "Tempestade",
        "thunderstorm with heavy rain": "Tempestade",
        "light thunderstorm": "Tempestade",
        "thunderstorm": "Tempestade",
        "heavy thunderstorm": "Tempestade",
        "ragged thunderstorm": "Tempestade",
        "thunderstorm with light drizzle": "Tempestade",
        "thunderstorm with drizzle": "Tempestade",
        "thunderstorm with heavy drizzle": "Tempestade",
        
        "Drizzle": "Garoa",
        "light intensity drizzle": "Garoa",
        "drizzle": "Garoa",
        "heavy intensity drizzle": "Garoa",
        "light intensity drizzle rain": "Chuva",
        "drizzle rain": "Chuva",
        "heavy intensity drizzle rain": "Chuva",
        "shower rain and drizzle": "Chuva",
        "heavy shower rain and drizzle": "Chuva",
        "shower drizzle": "Garoa",
      
        "Rain": "Chuva",
        "light rain": "Chuva",
        "moderate rain": "Chuva",
        "heavy intensity rain": "Chuva",
        "very heavy rain": "Chuva",
        "extreme rain": "Chuva",
        "freezing rain": "Chuva",
        "light intensity shower rain": "Chuva",
        "shower rain": "Chuva",
        "heavy intensity shower rain": "Chuva",
        "ragged shower rain": "Chuva",
      
        "Snow": "Neve",
        "light snow": "Neve",
        "snow": "Neve",
        "heavy snow": "Neve",
        "sleet": "Chuva",
        "light shower sleet": "Chuva",
        "shower sleet": "Chuva",
        "light rain and snow": "Neve",
        "rain and snow": "Neve",
        "light shower snow": "Neve",
        "shower snow": "Neve",
        "heavy shower snow": "Neve",
      
        "Atmosphere": "Névoa",
        "mist": "Névoa",
        "smoke": "Névoa",
        "haze": "Névoa",
        "sand/dust whirls": "Névoa",
        "fog": "Névoa",
        "sand": "Névoa",
        "dust": "Névoa",
        "volcanic ash": "Névoa",
        "squalls": "Névoa",
        "tornado": "Névoa",

        "Clear": "Céu limpo",
        "clear sky": "Céu limpo",
      
        "Clouds": "Parcialmente nublado",
        "few clouds": "Parcialmente nublado",
        "scattered clouds": "Parcialmente nublado",
        "broken clouds": "Parcialmente nublado",
        "overcast clouds": "Nublado"
    }
}

app.get('/climatempo/:cidade', async (req, res) => { // Definindo uma rota GET para '/climatempo/:cidade'
    const city = req.params.cidade; // Obtendo o parâmetro 'cidade' da requisição

    try{ // Tentando executar o bloco de código
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`); // Fazendo uma requisição GET para a API de clima
            
        if(response.status === 200){ // Verificando se a requisição foi bem-sucedida
                // Extraindo informações relevantes da resposta e realizando tradução do clima
                const clima = traducaoClima()[response.data.weather[0].description] || response.data.weather[0].description;
                const iconUrl = `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`;
                
                const weatherData = { // Criando um objeto com os dados do clima
                    nome: response.data.name,
                    pais: response.data.sys.country,
                    temperatura: response.data.main.temp,
                    umidade: response.data.main.humidity,
                    velocidadeDoVento: response.data.wind.speed,
                    clima: clima,
                    iconUrl: iconUrl
                };

                console.log(response.data); // Exibindo os dados da resposta no console

                res.send(weatherData); // Enviando os dados do clima como resposta
            } else{
                res.status(response.status).send({erro: 'Erro ao obter dados meteorologicos'}); // Enviando uma resposta de erro caso a requisição não seja bem-sucedida
            }
    } catch (error){ // Capturando erros
        res.status(500).send({erro: 'Erro ao obter dados meteorologicos', error }); // Enviando uma resposta de erro caso ocorra uma exceção
    }
})
