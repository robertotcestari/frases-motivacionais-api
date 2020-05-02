
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const frases = require('./frases.json')
    const frase = frases[Math.floor(Math.random() * frases.length)]

    context.res = {
      status: 200, /* Defaults to 200 */
      body: JSON.stringify(frase),
    };
}