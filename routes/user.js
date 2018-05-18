import { Router } from 'express'
import User from '../models/user'

let api = Router()

api.get('/', async (req, res) => {
  let users = await User.findAll()
  res.json({ users })
})

api.post('/', async (req, res) => {
  let { firstname, lastname, email } = req.body

  try {
    let user = new User({ firstname, lastname, email })
    let data = await user.save()
    res.json({ data })
  } catch (error) {
    res.json({ error })
  }
})

export default api
