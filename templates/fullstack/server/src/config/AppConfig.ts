import { Application, Request, Response, NextFunction } from 'express'
import * as express from 'express'
import * as morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

export const appConfig = (app: Application) => {
  app.use(morgan.default('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use('/uploads', express.static(uploadPath))
  app.use(cors({ credentials: true }))
  app.use(handleErrors)
}

const handleErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  const errorCode = err.statusCode || 500
  res.status(errorCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
}

const uploadPath = path.join(process.cwd(), 'uploads')
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + '_' + file.originalname)
  }
})

export const upload = multer({ storage: storage })
