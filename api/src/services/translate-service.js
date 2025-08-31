const config = require("../configs/config");
const axios = require("axios");
const qs = require("qs");

module.exports = {
  async translateIntoEnglish(initialText) {
    console.log(`${config.DEEPL_BASE_URL}/translate`, `DeepL-Auth-Key ${config.DEEPL_API_KEY}`, initialText);

    const data = qs.stringify({
      'text': initialText,
      'target_lang': 'RU',
      'source_lang': 'EN'
    });

    let queryRequest = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${config.DEEPL_BASE_URL}/translate`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': `DeepL-Auth-Key ${config.DEEPL_API_KEY}`
      },
      data
    };

    return await axios.request(queryRequest)
      .then((response) => {
        console.log('response', response.data.translations[0].text);
        return response.data.translations[0].text;
      })
      .catch((error) => {
        console.log(error);
        return 'unknown';
      });
  },
}
