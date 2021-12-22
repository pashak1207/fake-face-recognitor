import express from 'express'
import * as faceapi from 'face-api.js'
import AuthController from './controller/AuthController'
import bodyParser from 'body-parser'

const app = express()
const port = 8081

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, async () => {
  console.log(`Your application is running on port ${port}.`)
  const MODEL_URL = './models'

  try {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL)
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL)
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL)

  } catch (e) {
    console.log(e)
  }
});

app.get('/test', AuthController.login);