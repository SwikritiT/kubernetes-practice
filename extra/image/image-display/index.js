import express from "express"
import fs from "fs"
import path from "path"

const app = express()
const port = process.env.PORT || 3000

const directory = path.join("/", "usr", "src", "app", "files")
const filePath = path.join(directory, "image.jpg")

const getFile = async () =>
	new Promise((res) => {
		fs.readFile(filePath, (err, buffer) => {
			if (err)
				return console.log("FAILED TO READ FILE", "----------------", err)
			res(buffer)
		})
	})

app.use(async (ctx) => {
	if (ctx.path.includes("favicon.ico")) return
	ctx.body = await getFile()
	ctx.set("Content-disposition", "attachment; filename=image.jpg")
	ctx.set("Content-type", "image/jpeg")
	ctx.status = 200
})

console.log("Started")

app.listen(port)
