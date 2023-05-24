interface CardProps {
	title?: string
	image?: string
	text?: string
	className?: string
	onClick?: () => void
}

export function Card({ title, text, image, className = '', onClick }: CardProps) {
	return (
		<div 
			className={`max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-2xl transition-shadow ${className}`}
			onClick={onClick}
		>
			<img src={image} alt={title} className="w-full h-32 object-cover" />

			<div className="px-6 py-4 bg-white text-gray-800">
				<div className="font-semibold text-lg mb-2">{title}</div>
				<p className="text-gray-700 text-sm">{text}</p>
			</div>
		</div>
	)
}