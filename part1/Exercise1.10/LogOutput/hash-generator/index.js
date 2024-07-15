import { v4 as uuidv4 } from "uuid"
import fs from "fs"
import path from "path"

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, "output.txt")

function getRandomString() {
	return uuidv4()
}

// Initialize the log variables
let currentTimestamp = new Date().toISOString()
let currentString = getRandomString()
let data = currentTimestamp + " " + currentString
// Write data in 'Output.txt' .
fs.writeFile(filePath, data, (err) => {
	// In case of a error throw err.
	if (err) throw err
})

function updateLog() {
	currentTimestamp = new Date().toISOString()
	currentString = getRandomString()
	data = "\n" + currentTimestamp + " " + currentString
	// Write data in 'Output.txt' .
	fs.appendFile(filePath, data, (err) => {
		// In case of a error throw err.
		if (err) throw err
	})
}

setInterval(updateLog, 5000)

