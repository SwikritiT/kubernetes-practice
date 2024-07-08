import express from "express"
const app = express()
const port = process.env.PORT || 3001
let pong = 0


app.listen(port, () => {
	console.log(`App listening at on port ${port}`)
})

app.get("/pingpong", (req, res) => {
	res.json({ message: "Pong " + pong++ })
})
