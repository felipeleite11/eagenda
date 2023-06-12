import { Spinner } from "./Spinner"

interface ButtonProps { 
	type: 'button'|'submit'|'reset'
	children: React.ReactNode
	onClick?: () => void
	loading?: boolean
}

export function Button({ type, children, onClick, loading }: ButtonProps) {
	return (
		<button 
			onClick={onClick} 
			type={type}
			className="w-fit self-center justify-self-end relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 hover:opacity-80 transition-opacity group-hover:to-lime-300 focus:ring-2 focus:outline-none focus:ring-teal-400"
		>
			<span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
				{loading && (
					<Spinner dark={true} />
				)}
			
				{children}
			</span>
		</button>
	)
}
