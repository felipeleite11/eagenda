export interface CustomerProps {
	id?: number
	name: string
	logo: string
	description: string
}

export interface ProfileProps {
	id?: number
	description: string
}

export interface PermissionsProps {
	id?: number
	description: string
	link: string
}

export interface StudentProps {
	id?: number
	name: string
	profile: ProfileProps
	image: string
	permissions: PermissionsProps[]
}