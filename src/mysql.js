import { createPool } from 'mysql2/promise'

export const connectMySQL = async () => {
  const mysql = createPool({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    port: 3306,
    database: 'test'
  })
  console.log('✅ MySQL connected')

  await mysql.query(`DROP TABLE IF EXISTS products`)

  await mysql.query(
    `CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price INT NOT NULL
    )`
  )

  await mysql.query(`INSERT INTO products (name, price) VALUES (?, ?)`, [
    'Product 2',
    200
  ])

  const [mysqlProduct] = await mysql.query('SELECT * FROM products')

  return { mysqlProduct }
}