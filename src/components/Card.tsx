import { ReactNode } from "react"

interface CardProps {
	title?: string
	image?: string
	description?: string
	className?: string
	content?: React.ReactNode
	onClick?: () => void
	children?: ReactNode
}

export function Card({ title, description, image, className = '', onClick, children }: CardProps) {
	return (
		<div 
			className={`max-w-sm rounded overflow-hidden shadow-lg bg-white text-zinc-800 hover:shadow-2xl transition-shadow ${className}`}
			onClick={onClick}
		>
			{image && (
				<img src={image} alt={title} className="w-full h-32 object-cover" />
			)}

			<div className="px-6 py-4 bg-white text-gray-800">
				<div className="font-semibold text-lg mb-2">{title}</div>
				<p className="text-gray-700 text-sm">{description}</p>
	
				{children && (
					<div className="mt-4 text-sm">
						{children}
					</div>
				)}
			</div>
		</div>
	)
}