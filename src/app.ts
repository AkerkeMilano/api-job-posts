import express from 'express'
import cors from 'cors'
import { postRouter } from './jobPost'
import { recruiterRouter } from './recruiter'
import { applicationRouter } from './jobApplication'
import { SETTINGS } from './settings'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
export const app = express()
app.use(express.json())
app.use(cors())
 
app.get('/', (req, res) => {
    res.status(200).json({version: '1.0'})
})

app.use(SETTINGS.PATH.POSTS, postRouter)
app.use(SETTINGS.PATH.APPLICATIONS, applicationRouter)
app.use(SETTINGS.PATH.AUTH, recruiterRouter)

app.use(globalErrorHandler)