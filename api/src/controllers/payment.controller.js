import mp from 'mercadopago'
import { API_MP } from '../config'

export const createOrder = async (req, res) => {
  //configuracion de vendedor
  mp.configure({
    access_token: API_MP
  })

  // crear orden de compra
  /*  
    esto recibe un objeto que tiene 
    el siguiente formato en el que se
    espesifica los detalles de la compra 
  */
  const result = await mp.preferences.create({
    items: [
      {
        title: 'Producto-prueba',
        unit_price: 500,
        currency_id: 'ARS',
        quantity: 1
      }
    ],
    back_urls: {
      success: 'http://localhost:3000/success',
      failure: 'http://localhost:3000/failure',
      pending: 'http://localhost:3000/pending'
    },
    notification_url:
      'https://c0b0-2800-810-4fc-84a8-48dd-79ad-8a07-d94b.sa.ngrok.io/webhook'
  })

  console.log(result)

  res.send(result.body)
}

export const receiveWebhook = async (req, res) => {
  const payment = req.query
  try {
    if (payment.type == 'payment') {
      const data = await mp.payment.findById(payment['data.id'])
      console.log(data)
      // revisar en base de datos
      /* hay que revisar como se guardan los datos de los productos */
    }

    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}
