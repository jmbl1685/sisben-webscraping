# Web Scraping - Página para consultar puntaje SISBEN (Sistema de Selección de Beneficiarios Para Programas Sociales)

Sitio original: https://www.sisben.gov.co/atencion-al-ciudadano/Paginas/consulta-del-puntaje.aspx

Resultado del proceso (web scraping): https://sisben-webscraping.herokuapp.com/sisben?identification=45485519&type=1

```sh
  xxx/sisben?identification=45485519&type=1

  identification = Documento de la persona
  type = Tipo de Identificación
    [1] Cédula de Ciudadanía
    [2] Tarjeta de Identidad
    [3] Documento de Ciudadano Extranjero
    [4] Registro Civil
    [8] Permiso Especial de Permanencia
```

[![Build Status](https://travis-ci.org/jmbl1685/sisben-webscraping.svg?branch=master)](https://travis-ci.org/jmbl1685/sisben-webscraping/builds)

## Web Scraping

Es una técnica utilizada mediante programas de software para extraer información de sitios web. Usualmente, estos programas simulan la navegación de un humano en la World Wide Web ya sea utilizando el protocolo HTTP manualmente, o incrustando un navegador en una aplicación.

Web scraping es el proceso de recopilar información de forma automática de la Web.

## Cuestiones legales

El web scraping pudiera ir en contra de los términos de uso de algunos sitios webs.

## NOTA:

Cabe aclarar que el siguiente proceso es utilizado con fin de aprendizaje mas no de alterar o infringir la ley.

## Run

```sh
$ npm install
$ npm start
```
