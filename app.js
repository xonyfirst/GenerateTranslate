var i18nGenerator = require('i18n-generator')
var Tabletop = require('Tabletop')
const fs = require('fs');

var URL = '!!LINK_URL_EXCEL!!'

var options = {
  key: URL,
  callback: onLoad,
  simpleSheet: true
}

Tabletop.init(options)

function onLoad(data, tabletop) {
  
  var dataString = ''
  var title = ''
  var language = ''
  var keyLength = Object.keys(data[0]).length
  var iteration = 0

  for (var key in data[0]) {
    iteration += 1

    if (iteration === keyLength) {
      title += key
      iteration = 0
    } else {
      title += key
      title += ' , '
    }
  }

  data.forEach(function (value, key) {
    for (var key2 in value) {
      iteration += 1
      language += value[key2]
      if (iteration % keyLength === 0) {
        language += '\n'
      } else {
        language += ' , '
      }
    }
  })

  dataString = title
  dataString += '\n'
  dataString += language

  i18nGenerator.get(dataString, 'csv', function (err, data) {
    const outputPath = '!!PATH_TRANSLATE!!';

    console.log('Load DATA Success!')
    // i18nGenerator(data, outputPath, true, 'csv')
    for (var key in data) {
      if (!(['Description']).includes(key)) {
        let tmpdata = JSON.stringify(data[key]);
        fs.writeFileSync(outputPath + key + '.json', tmpdata);
      }
    };
  });
}