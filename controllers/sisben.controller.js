'use strict'

const htmlToJson = require('html-to-json')
const sisbenfetch = require('../services/sisben.service')

require('dotenv').config()

const SisbenWebScrapingHandle = async (req, res) => {

  try {

    const { identification, type } = req.query

    const htmlResponse = await sisbenfetch(identification, type)

    const user = await htmlToJson.parse(htmlResponse, doc => {

      const validation = {
        NotResult: doc.find('#panelNoResultado')
          .text()
          .trim()
          .includes('Ésta identificación no se encuentra registrada.'),
        panelMessage: doc.find('#panelMensaje')
          .text()
          .trim()
          .includes('No se han ingresado los valores necesarios para la consulta. Intente nuevamente.'),
        EmptyName: (doc.find('#labelNumeroDocumento').text() == "")
      }

      if ((validation.NotResult) || (validation.panelMessage) || (validation.EmptyName)) {
        return { data: 'User not found' }
      }

      return {
        nombreCompleto: `${doc.find('#labelNombres').text()} ${doc.find('#labelApellidos').text()}`,
        tipoDocumento: doc.find('#labelTipoDocumento').text(),
        numeroDocumento: doc.find('#labelNumeroDocumento').text(),
        codigoMunicipio: doc.find('#labelCodigoMunicipio').text(),
        ficha: doc.find('#labelFicha').text(),
        area: doc.find('#labelArea').text(),
        puntaje: doc.find('#labelPuntaje').text(),
        departamento: doc.find('#labelNombreDepartamento').text(),
        municipio: doc.find('#labelNombreMunicipio').text(),
        fechaIngreso: doc.find('#labelFechaingreso').text(),
        estado: doc.find('#labelMarca').text()
      }
    })

    return res.status(200).send(user)

  } catch (err) {
    res.status(404).send({ data: 'An error has occurred' })
  }
}

module.exports = { 
  SisbenWebScrapingHandle 
}

