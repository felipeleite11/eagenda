import { Card } from "@/components/Card"

export default function Agendamento() {
	return (
		<main className="flex min-h-main items-center gap-8 p-24">
			<Card
				image="https://img.freepik.com/free-photo/businessman-marking-calendar-appointment_53876-14778.jpg"
				title="Agendar aulas"
				text="Agende aqui sua aula presencial ou online. Selecione a melhor data e horário, conforme sua disponibilidade e confirme seu agendamento."
				className="animate__animated animate__fadeInUp"
			/>
		</main>
	)
}
