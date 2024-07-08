import { v4 as uuidv4 } from "uuid"
import http from "http"
import url from "url"

function getRandomString() {
	return uuidv4()
}

// Initialize the log variables
let currentTimestamp = new Date().toISOString()
let currentString = getRandomString()

function updateLog() {
	currentTimestamp = new Date().toISOString()
	currentString = getRandomString()
	console.log(`[${currentTimestamp}] ${currentString}`)
}

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true)
	const path = parsedUrl.pathname
	const method = req.method.toUpperCase()

	if (method === "GET") {
		if (path === "/status") {
			res.writeHead(200, { "Content-Type": "text/plain" })
			res.end(
				JSON.stringify({ timestamp: currentTimestamp, string: currentString })
			)
		} else {
			res.writeHead(404, { "Content-Type": "text/plain" })
			res.end("404 Not Found")
		}
	} else {
		res.writeHead(405, { "Content-Type": "text/plain" })
		res.end(`Method ${method} Not Allowed`)
	}
})

// Update log every 5 seconds
setInterval(updateLog, 5000)

// Define the port to listen on
const port = 3000
server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`)
})
