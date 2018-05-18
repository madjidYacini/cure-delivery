import { Router } from 'express'
import user from './user'

let api = Router()

api.get('/', (req, res) => {
  res.json({ hi: 'startupWeek API' })
})

api.use('/users', user)

export default api
