import express from "express"
import fs from "fs"
import path from "path"

const directory = path.join("/", "usr", "src", "app", "files")
const filePath = path.join(directory, "output.txt")

const app = express()
const port = process.env.PORT || 3001
let count = 0

const fileExists = async () =>
	new Promise((res) => {
		fs.stat(filePath, (err, stats) => {
			if (err || !stats) return res(false)
			return res(true)
		})
	})

app.listen(port, () => {
	console.log(`App listening at on port ${port}`)
})

app.get("/pingpong", async (req, res) => {
	count++
	const data = "Ping / Pong: " + count
	if (await fileExists()) {
		fs.writeFile(filePath, data, (err) => {
			if (err) {
				console.error("Error writing file:", err)
			} else {
				console.log("File written successfully")
			}
		})
	}
	res.send(data)
})
