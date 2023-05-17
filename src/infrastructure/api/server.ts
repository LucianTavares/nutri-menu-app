import dotenv from 'dotenv'
import {app} from './express'

dotenv.config()

const port: number = Number(process.env.PORT) || 3000

app.get("/", async (req, res) => {

  const inicio = `<h1> Nutri Menu App </h1>`

  res.send(inicio)
})

app.listen(port, () => {
  console.log(`Server is running in port: ${port}.`)
})