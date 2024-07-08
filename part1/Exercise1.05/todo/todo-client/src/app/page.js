"use client"

import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {
	const [data, setdata] = useState(null)

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(
				`http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/data`
			)
			setdata(response.data)
		}
		fetchData()
	}, [])
	return (
		<main>
			<div>
				<h1>Data from Express</h1>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		</main>
	)
}
