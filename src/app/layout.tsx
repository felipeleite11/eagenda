import { Inter } from 'next/font/google'

import 'animate.css'
import '@/styles/globals.scss'
import '@/styles/form.scss'
import '@/styles/animations.scss'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { GlobalProvider } from './contexts/GlobalContext'

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
			<head>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/bold/style.css"
				/>
			</head>
				<body className={`antialiased ${inter.className}`}>
					<GlobalProvider>
						<Navbar />
						
						{children}
						
						<Footer />
					</GlobalProvider>
				</body>
		</html>
	)
}
