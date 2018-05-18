import Sequelize, { Op } from 'sequelize'

import User from './user'

import dotenv from 'dotenv'
dotenv.config()

export const db = new Sequelize(process.env.DATABASE_URL, {
  operatorsAliases: Op,
  define: {
    underscored: true
  }
})

// models initialization
User.init(db, Sequelize)
