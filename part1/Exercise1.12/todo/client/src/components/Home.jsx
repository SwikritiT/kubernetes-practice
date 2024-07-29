import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {
	const [imageSrc, setImageSrc] = useState(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchImage = async () => {
			try {
				const response = await axios.get(
					`http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/image`,
					{
						responseType: "blob",
					}
				)
				const url = URL.createObjectURL(response.data)
				console.log(url)
				setImageSrc(url)
				setLoading(false)
			} catch (error) {
				console.error("Failed to fetch image:", error)
				setLoading(false)
			}
		}

		fetchImage()
	}, [])
	return (
		<main>
			<div>
				{loading ? (
					<p>Loading...</p>
				) : (
					<img
						src={imageSrc}
						alt='Random from Lorem Picsum'
					/>
				)}
			</div>
		</main>
	)
}
