import { Inter } from 'next/font/google'

import 'animate.css'

import '@/styles/globals.css'
import Script from 'next/script'
import { Navbar } from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'E-Agenda',
	description: 'Sistema para agendamento de aulas.',
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-BR">
			{/* <head>
				<Script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js" />
			</head> */}
			<body className={`antialiased ${inter.className}`}>
				<Navbar />
				
				{children}
				
				<footer className="h-24 bg-zinc-600">FOOTER</footer>
			</body>
		</html>
	)
}
