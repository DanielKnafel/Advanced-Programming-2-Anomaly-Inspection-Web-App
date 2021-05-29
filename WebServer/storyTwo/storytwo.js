var url = 'http://localhost:9876/detect'
const fs = require('fs')
var train
var test
try {
  const data = fs.readFileSync('train.csv', 'utf8')
  train = data
} catch (err) {
  console.error(err)
}
try {
    const data = fs.readFileSync('test.csv', 'utf8')
    test = data
  } catch (err) {
    console.error(err)
  }
const axios = require('axios')

axios
  .post(url, {
    algorithm: 'Simple',
    learnFile:  train,
    detectFile: test
  })
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })