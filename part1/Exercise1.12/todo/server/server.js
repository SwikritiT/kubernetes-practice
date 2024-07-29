// server.js
import express from "express"
import axios from "axios"
import cors from "cors"
import fs from "fs"
import { promises as fsPromises } from "fs"
import path from "path"

const app = express()
const port = process.env.PORT || 8080
const clientPort = process.env.CLIENT_PORT || 3000
let imageId = 1200
const CACHE_DURATION = 60 * 60 * 1000 // 60 minutes

// const directory = path.join("/", "usr", "src", "app", "files")
// const filePath = path.join(directory, "image.jpg")

const directory = path.join(
	"/",
	"home",
	"swikriti",
	"www",
	"devops",
	"kubernetes",
	"Exercises",
	"part1",
	"Exercise1.12",
	"todo"
)
const filePath = path.join(directory, "image.jpg")

// const fileAlreadyExists = async () =>
// 	new Promise(async (res) => {
// 		await fs.stat(filePath, (err, stats) => {
// 			console.log("here")
// 			if (err || !stats) return res(false)
// 			return res(true)
// 		})
// 	})

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

app.use(cors({ origin: `http://localhost:${clientPort}` }))

app.listen(port, () => {
	console.log(`App listening at on port ${port}`)
})

app.get("/api/data", (req, res) => {
	res.json({ message: "Hello from server!" })
})

async function fetchAndSaveImage() {
	imageId = getRandomNumber(1200, 1300)
	// await new Promise((res) => fs.mkdir(directory, (err) => res()))
	const response = await axios.get(`https://picsum.photos/${imageId}`, {
		responseType: "stream",
	})
	const writer = fs.createWriteStream(filePath)
	response.data.pipe(writer)

	writer.on("finish", () => {
		console.log("file saved")
	})

	writer.on("error", (err) => {
		console.error("Failed to write image:", err)
	})
}

app.get("/api/image", async (req, res) => {
	try {
		const currentTime = new Date().getTime()
		// const imageExists = await fs.pathExists(filePath);
		const stats = await fsPromises.stat(filePath)
		if (currentTime - stats.mtime.getTime() > CACHE_DURATION) {
			await fetchAndSaveImage()
		}
	} catch (error) {
		// If the file does not exist, fetch and save the image
		if (error.code === "ENOENT") {
			await fetchAndSaveImage()
		} else {
			return res.status(500).send("Internal Server Error")
		}
	}
	res.sendFile(filePath)
})
