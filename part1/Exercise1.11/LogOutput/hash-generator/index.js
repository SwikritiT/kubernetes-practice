import { v4 as uuidv4 } from "uuid"
import { promises as fs } from "fs"
import path from "path"

const directory = path.join("/", "usr", "src", "app", "files")
const filePath = path.join(directory, "output.txt")

function getRandomString() {
	return uuidv4()
}

const fileExists = async () => {
	try {
		await fs.stat(filePath)
		return true
	} catch (err) {
		if (err.code === "ENOENT") {
			return false
		}
		throw err
	}
}

const directoryExists = async () => {
	try {
		await fs.stat(directory)
		return true
	} catch (err) {
		if (err.code === "ENOENT") {
			return false
		}
		throw err
	}
}

// Initialize the log variables
async function writeData() {
	let currentTimestamp = new Date().toISOString()
	let currentString = getRandomString()

	if (!(await directoryExists())) {
		await fs.mkdir(directory, { recursive: true })
	}

	if (await fileExists()) {
		const existingData = await fs.readFile(filePath)
		let data =
			currentTimestamp +
			" " +
			currentString +
			"\n" +
			"Ping / Pong:" +
			existingData
		// Write data in 'output.txt'.
		fs.writeFile(filePath, data, (err) => {
			if (err) {
				console.error("Error writing file:", err)
			} else {
				console.log("File written successfully")
			}
		})
	} else {
		// If file doesn't exist, create it with initial data
		let data = currentTimestamp + " " + currentString + "\nPing / Pong: 0"
		await fs.writeFile(filePath, data)
	}
}

setInterval(writeData, 5000)
