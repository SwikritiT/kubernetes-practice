// server.js
import express from "express"
import cors from "cors"
const app = express()
const port = process.env.PORT || 8080
const clientPort = process.env.CLIENT_PORT || 3000

app.use(cors({ origin: `http://localhost:${clientPort}` }))

app.listen(port, () => {
	console.log(`App listening at on port ${port}`)
})

app.get("/api/data", (req, res) => {
	res.json({ message: "Hello from server!" })
})
