import http from "http"
import url from "url"
import { promises as fs } from "fs"
import path from "path"

const directory = path.join("/", "usr", "src", "app", "files")
const filePath = path.join(directory, "output.txt")

async function readFromFile() {
	try {
		const data = await fs.readFile(filePath, "utf8")
		return data
	} catch (err) {
		console.error("Failed to read file:", err)
		throw err
	}
}

const server = http.createServer(async (req, res) => {
	const parsedUrl = url.parse(req.url, true)
	const path = parsedUrl.pathname
	const method = req.method.toUpperCase()

	if (method === "GET") {
		if (path === "/") {
			const data = await readFromFile()
			res.writeHead(200, { "Content-Type": "text/plain" })
			res.end(data)
		} else {
			res.writeHead(404, { "Content-Type": "text/plain" })
			res.end("404 Not Found")
		}
	} else {
		res.writeHead(405, { "Content-Type": "text/plain" })
		res.end(`Method ${method} Not Allowed`)
	}
})

const port = 3000
server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`)
})
	