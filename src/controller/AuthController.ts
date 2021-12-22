import { Request, Response } from 'express'
import FaceRecognition from '../services/FaceRecognition'

class AuthController {
  static async register(req: Request, res: Response) {

  }

  static async login(req: Request, res: Response) {
    const label = 'sigit'
    const imageInput = `./images/${label}.jpg`
    const recognize = new FaceRecognition(imageInput, label)

    const resultRecognize = await recognize.recognize()
    res.send(resultRecognize)
  }
}

export default AuthController