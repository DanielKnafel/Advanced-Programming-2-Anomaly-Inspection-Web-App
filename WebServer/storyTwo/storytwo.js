async function run(){
  var url = 'http://127.0.0.1:9876'
  const fs = require('fs')
  // Importing library
  const FormData = require('form-data');
  // Creating a new form data
  var bodyFormData = new FormData();
  // Appending info to body form data
  await bodyFormData.append('algorithm', 'Simple');
  await bodyFormData.append('learnFile', fs.createReadStream("train.csv"), "train.csv"); 
  await bodyFormData.append('detectFile', fs.createReadStream("test.csv"), "test.csv"); 
  const axios = require('axios')
  // POST request
  let results = await axios.post(url, bodyFormData, {  });
  // Showing results
  console.log(results);
}
run();