
# Web Service SOAP

Web Service SOAP desenvolvido para apresentação na disciplina de Sistemas Distribuidos

Foi utilizado Spring Boot para desenvolver o webservice e uma página web para consumir esse webservice.




## Stack utilizada

**Front-end:** JavaScript, HTML e CSS

**Back-end:** Spring Boot


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/wellingtonengps/soap_service
```

Entre no diretório do projeto

```bash
  cd soap_service
```

#### Back-end

Instale as dependências (Necessário Java 17 ou superior) e Maven 4.0.0

```bash 
  mvn clean generate-sources
```

Inicie o servidor 

```bash
  mvn spring-boot:run

```

#### Front-end

O front-end está disponivel no /src/main/webapp/index.js

```bash
  /src/main/webapp/index.js
```

## Documentação da API

### Retorna todos os países

Insira a URL com o endpoint, podemos usar apenas POST como método de solicitação. Vá para a guia Cabeçalhos e selecione a chave como Content-Type e o valor como text/xml. Vá para a aba Corpo e passe nossa solicitação SOAP.

```bash
  POST http://localhost:8080/ws
```

#### getAllCountriesRequest

```bash
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:gs="http://spring.io/guides/gs-producing-web-service">
    <soapenv:Header/>
    <soapenv:Body>
        <gs:getAllCountriesRequest/>
    </soapenv:Body>
</soapenv:Envelope> 
```

### Retorna um país

```bash
  POST http://localhost:8080/ws
```

#### getContryRequest

Tag name defini o nome do país que será requisitado

```bash
 <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
				  xmlns:gs="http://spring.io/guides/gs-producing-web-service">
   <soapenv:Header/>
   <soapenv:Body>
      <gs:getCountryRequest>
         <gs:name>State of Eritrea</gs:name>
      </gs:getCountryRequest>
   </soapenv:Body>
</soapenv:Envelope>
```


## Screenshots

![App Screenshot](https://i.ibb.co/vqXBbjN/Screenshot-2024-04-06-150157.png)

![App Screenshot2](https://i.ibb.co/Tw9kVdW/Screenshot-2024-04-06-150230.png)

