'use client'

import { Card } from '@/components/Card'
import { useRouter } from 'next/navigation'

export default function Home() {
	const { push } = useRouter()

	return (
		<main className="flex flex-col items-center justify-between min-h-main p-24 select-none">
			<Card
				image="https://img.freepik.com/free-photo/businessman-marking-calendar-appointment_53876-14778.jpg"
				title="Agendar aulas"
				description="Agende aqui sua aula presencial ou online. Selecione a melhor data e horário, conforme sua disponibilidade e confirme seu agendamento."
				className="animate__animated animate__fadeInUp cursor-pointer"
				onClick={() => { push('/agendamento') }}
			/>
		</main>
	)
}
