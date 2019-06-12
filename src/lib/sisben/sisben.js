'use strict';

require('dotenv').config();

const fetch = require('node-fetch');
const FormData = require('form-data');
const htmlToJson = require('html-to-json');
const {
  sisbenScoreHandler,
  convertToNumber,
  userNameHandler,
} = require('../../utils/utils');

async function callSisbenServer(identification, type) {
  return new Promise(async (resolve, reject) => {
    try {
      const sisbenRequest = {
        documentType: type,
        documentNumber: identification,
        option: process.env.OPTION,
        recaptcha: process.env.RECAPTCHA,
        eventValidation: process.env.EVENTVALIDATION,
        viewstate: {
          generator: process.env.GENERATOR,
          viewstate: process.env.VIEWSTATE,
          encrypted: '',
        },
      };

      const form = new FormData();

      form.append('ddlTipoDocumento', sisbenRequest.documentType);
      form.append('tboxNumeroDocumento', identification);
      form.append('btnConsultar', sisbenRequest.option);
      form.append('g-recaptcha-response', sisbenRequest.recaptcha);
      form.append('__EVENTVALIDATION', sisbenRequest.eventValidation);
      form.append('__VIEWSTATEGENERATOR', sisbenRequest.viewstate.generator);
      form.append('__VIEWSTATEENCRYPTED', sisbenRequest.viewstate.encrypted);
      form.append('__VIEWSTATE', sisbenRequest.viewstate.viewstate);

      const options = {
        method: 'POST',
        body: form,
      };

      const url = process.env.SISBEN_SITE;
      const response = await fetch(url, options);
      const data = await response.text();
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

async function getUserInfo(htmlResponse) {
  return new Promise(async (resolve, reject) => {
    try {
      await htmlToJson.parse(htmlResponse, doc => {
        const validation = {
          NotResult: doc
            .find('#panelNoResultado')
            .text()
            .trim()
            .includes('Ésta identificación no se encuentra registrada.'),
          panelMessage: doc
            .find('#panelMensaje')
            .text()
            .trim()
            .includes(
              'No se han ingresado los valores necesarios para la consulta. Intente nuevamente.',
            ),
          EmptyName: doc.find('#labelNumeroDocumento').text() == '',
        };

        let infoResponse = { data: 'User not found' };

        console.log(doc.children());
        if (
          !(
            validation.NotResult ||
            validation.panelMessage ||
            validation.EmptyName
          )
        ) {
          infoResponse = {
            recordCode: convertToNumber(doc.find('#labelFicha').text()),
            fullname: userNameHandler(
              doc.find('#labelNombres').text(),
              doc.find('#labelApellidos').text(),
            ),
            documentType: doc.find('#labelTipoDocumento').text(),
            identification: doc.find('#labelNumeroDocumento').text(),
            score: sisbenScoreHandler(doc.find('#labelpuntajeIII').text()),
            area: doc.find('#labelArea').text(),
            departament: doc.find('#labelNombreDepartamento').text(),
            municipalityCode: convertToNumber(
              doc.find('#labelCodigoMunicipio').text(),
            ),
            municipality: doc.find('#labelNombreMunicipio').text(),
            createdAt: doc.find('#labelFechaingreso').text(),
            state: doc.find('#labelMarca').text(),
          };
        }

        resolve(infoResponse);
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  callSisbenServer,
  getUserInfo,
};
