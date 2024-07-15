import express from "express"
import fs from "fs"
import path from "path"
import axios from "axios"

const app = express()
const port = process.env.PORT || 3001

const directory = path.join("/", "usr", "src", "app", "files")
const filePath = path.join(directory, "image.jpg")

const fileExists = async () =>
	new Promise((res) => {
		fs.stat(filePath, (err, stats) => {
			if (err || !stats) return res(false)
			return res(true)
		})
	})
const getNewImage = async () => {
	if (fileExists()) return
	await new Promise((res) => fs.mkdir(directory, (err) => res()))
	const response = await axios.get("https://picsum.photos/200", {
		responseType: "stream",
	})
	response.data.pipe(fs.createWriteStream(filePath))
}

const removeFile = async () =>
	new Promise((res) => fs.unlink(filePath, (err) => res()))

app.use(async (ctx) => {
	if (ctx.path.includes("favicon.ico")) return
	// Get a new image
	await removeFile()
	getNewImage()
	ctx.status = 200
})

console.log("started")
getNewImage()

app.listen(port, () => {
	console.log(`App listening at on port ${port}`)
})
