import express from 'express'
import paymentRoutes from './routes/payment.route.js'
import { PORT } from './config.js'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))

app.use(morgan('dev'))
app.use(paymentRoutes)

app.listen(PORT, () => {
  console.log('Server on', PORT)
})
