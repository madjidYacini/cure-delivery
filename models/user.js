import { Model } from 'sequelize'

export default class User extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        firstname: {
          type: DataTypes.STRING
        },
        lastname: {
          type: DataTypes.STRING
        },
         address: {
          type: DataTypes.STRING,
          
          
        },
         password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          },

        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true
          },
          unique: {
            args: true,
            msg: 'Email already in use'
          }
        }
      },
      {
        sequelize: sequelize
      }
    )
  }

  constructor({ firstname, lastname, email, address, password }) {
    super()

    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.address =address
    this.password = password

  }
}
