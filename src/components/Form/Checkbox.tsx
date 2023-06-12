import { useField } from "formik"

interface CheckboxProps {
	label: string	
	name: string
	className?: string
	onClick?: () => void
}

export function Checkbox({ label, name, className = '', onClick }: CheckboxProps) {
	const [field, meta, helpers] = useField(name)

	return (
		<div className={`flex items-center cursor-pointer ${className}`} onClick={onClick}>
			<input 
				{...field}
				id={name}
				type="checkbox" 
				className="w-4 h-4 text-blue-600 rounded bg-gray-700 border-gray-600 cursor-pointer" 
			/>

			<label htmlFor={name} className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">{label}</label>

			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</div>
	)
}