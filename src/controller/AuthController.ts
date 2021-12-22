import { Request, Response } from 'express'
import FaceRecognition from '../services/FaceRecognition'

class AuthController {
  static async register(req: Request, res: Response) {
    return res.send(req.file)
  }

  static async login(req: Request, res: Response) {
    const user = req.body.user
    const image = req.file?.filename
    const imageInput = `./uploads/${image}`
    const recognize = new FaceRecognition(imageInput, user)

    const resultRecognize = await recognize.recognize()
    res.send(resultRecognize)
  }
}

export default AuthController