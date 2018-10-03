const fetch = require('node-fetch')
const FormData = require('form-data')

require('dotenv').config()

const sisben_fetch = async (identification,type) => {

  const sisbenRequest = {
    documentType: type,
    documentNumber: identification,
    option: process.env.OPTION,
    recaptcha: process.env.RECAPTCHA,
    eventValidation: process.env.EVENTVALIDATION,
    viewstate: {
      generator: process.env.GENERATOR,
      viewstate: process.env.VIEWSTATE,
      encrypted: ''
    }
  }

  const form = new FormData()

  form.append('ddlTipoDocumento', sisbenRequest.documentType)
  form.append('tboxNumeroDocumento', identification)
  form.append('btnConsultar', sisbenRequest.option)
  form.append('g-recaptcha-response', sisbenRequest.recaptcha)
  form.append('__EVENTVALIDATION', sisbenRequest.eventValidation)
  form.append('__VIEWSTATEGENERATOR', sisbenRequest.viewstate.generator)
  form.append('__VIEWSTATEENCRYPTED', sisbenRequest.viewstate.encrypted)
  form.append('__VIEWSTATE', sisbenRequest.viewstate.viewstate)

  const options = {
    method: 'POST',
    body: form
  }

  const url = process.env.SISBEN_SITE
  const response = await fetch(url, options)
  const data = await response.text()

  return data

}

module.exports = sisben_fetch

