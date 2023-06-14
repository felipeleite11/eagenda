export interface FooterPartnerProps {
	description: string
	link: string
}

export interface FooterLinkProps {
	description: string
	link: string
	icon: string
}

export interface CustomerProps {
	id?: number
	name: string
	logo: string
	description: string
	phone: string
	email: string
	address: string
	partners: FooterPartnerProps[]
	links: FooterLinkProps[]
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