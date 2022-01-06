import { Request, Response } from 'express'
import FaceRecognition from '../services/FaceRecognition'
import { nanoid } from 'nanoid'
import fs from 'fs'

class AuthController {
  static async register(req: Request, res: Response) {
    return res.send(req.file)
  }

  static async login(req: Request, res: Response) {
    try {
      console.log('run')
      const user = req.body.user
      const image = req.body.photos
  
      const data = image.replace(/^data:image\/\w+;base64,/, "")
      const buf = Buffer.from(data, 'base64')
      const fileName = user + '-' + nanoid()
  
      fs.writeFile(`./uploads/${fileName}.jpg`, buf, async function (err : any) {
        if (err) console.log(err)
        const imageInput = `./uploads/${fileName}.jpg`
        const recognize = new FaceRecognition(imageInput, user)
  
        const resultRecognize = await recognize.recognize()
        
        res.send(resultRecognize)
      })
    } catch (error: any) {
      res.status(500).send(error.message)
    }

  }
}

export default AuthController