require('dotenv').config()
const express = require('express')
const db = require('./db')
const routes = require('./routes')

const app = express()

async function connection() {
  try {
    const hasTable = await db.schema.hasTable("users")

    if (!hasTable) {
      await db.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('email').notNullable().unique()
        table.string('role').defaultTo('user').notNullable()
      })
      console.log("Таблица создана")
    }
  } catch (err) {
    console.error("Ошибка при работе с БД:", err)
  }
}


connection()

app.use(express.json())

app.use('/', routes)

module.exports = app