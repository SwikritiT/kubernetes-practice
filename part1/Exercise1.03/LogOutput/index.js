import { v4 as uuidv4 } from "uuid"

function getRandomString() {
	const randomstring = uuidv4()

	console.log(new Date().toISOString() + " " + randomstring)

	setTimeout(getRandomString, 5000)
}

getRandomString()
