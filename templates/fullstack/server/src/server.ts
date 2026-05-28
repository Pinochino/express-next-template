import dotenv from 'dotenv'
dotenv.config({})
import express, { Application, Request, Response } from 'express'
import { appConfig } from './config/AppConfig'

const app: Application = express()

const port: number = Number(process.env.PORT) || 9000

appConfig(app)

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`App is running on the http://localhost:${port}`)
})
