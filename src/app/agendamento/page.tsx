'use client'

import { useEffect, useState } from "react"
import { Card } from "@/components/Card"
import { Shimmer } from "@/components/Shimmer"

export default function Agendamento() {
	const [data, setData] = useState(null)

	async function loadData() {
		await new Promise((r) => setTimeout(r, 2000)).then(() => {})

		setData({
			description: 'CARREGADO'
		})
	}

	useEffect(() => {
		loadData()
	}, [])

	return (
		<main className="flex min-h-main items-center gap-8 p-24 select-none">
			<Card 
				title="Agendamentos"
				description="Lorem ipsum dolor sit amet consectetur."
				className="animate__animated animate__fadeIn"
			>
				{data ? (
					<h1 className="text-3xl">{data.description}</h1>
				) : (
					<Shimmer />
				)}
			</Card>
		</main>
	)
}
