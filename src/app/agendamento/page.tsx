'use client'

import { useEffect, useState } from "react"
import { Card } from "@/components/Card"
import { Shimmer } from "@/components/Shimmer"

import { get, urls } from "../utils/fetch"

export default function Agendamento() {
	const [schedule, setSchedule] = useState(null)

	async function loadSchedule() {
		const response = await get(urls.schedule)
		
		setSchedule(response)
	}

	useEffect(() => {
		loadSchedule()
	}, [])

	return (
		<main className="flex min-h-main items-center gap-8 p-24 select-none">
			<Card 
				title="Agendamentos"
				description="Lorem ipsum dolor sit amet consectetur."
				className="animate__animated animate__fadeIn"
			>
				{schedule ? (
					<h1 className="text-3xl">{`${schedule.length} itens`}</h1>
				) : (
					<Shimmer />
				)}
			</Card>
		</main>
	)
}
