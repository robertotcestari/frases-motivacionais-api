const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs')

// Esse é um scraper do site https://crmpiperun.com/blog/frases-motivacionais/
// Ele pega as frases motivacionais, limpa os strings e cria um objeto.

async function getSiteHtml() {
  const response = await axios.get(
    "https://crmpiperun.com/blog/frases-motivacionais/"
  );
  return response.data;
}

function getItems(html) {
  const $ = cheerio.load(html);

  const frasesArray = [];
  const frasesElements = $("#frases-motiv li h4");

  frasesElements.each((index, element) => {
    const fullText = $(element).text();
    const fullTextWithoutDate = fullText.split(
      /\([0-9]{2}\/[0-9]{2}\)\s“/gm
    )[1];
    if (fullTextWithoutDate) {
      // temos q fzer o if pq vem alguns undefined.
      const fraseArr = fullTextWithoutDate.split(/”/gm);
      fraseArr[1] = fraseArr[1].replace(/[\(\)\.]/g, "").trim();
      frasesArray.push({ texto: fraseArr[0], autor: fraseArr[1] });
    }
  });
  return frasesArray;
}

(async () => {
  const html = await getSiteHtml();
  const frasesArray = getItems(html);
  fs.writeFileSync('./frases.json', JSON.stringify(frasesArray));
  console.log(frasesArray)
})();
