'use client'

import Feather from 'feather-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useGlobalContext } from '@/app/contexts/GlobalContext'

interface PermissionProps { 
	id: number
	icon?: string
	title: string
	redirect: string
	subpermissions?: PermissionProps[]
}

const permissions: PermissionProps[] = [
	{
		id: 1,
		icon: 'home',
		title: 'Início',
		redirect: '/'
	},
	{
		id: 2,
		icon: 'calendar',
		title: 'Minhas aulas',
		redirect: '/',
		subpermissions: [
			{
				id: 1,
				title: 'Marcar aulas',
				redirect: '/agendamento',
				icon: 'plus-square'
			},
			{
				id: 2,
				title: 'Consultar agenda',
				redirect: '/nao_implementado',
				icon: 'calendar'
			}
		]
	}
]

export function Navbar() {
	const { customer } = useGlobalContext()

	async function expandSubMenu(submenuId: string) {
		const element = document.querySelector(submenuId)

		const openedSubmenu = document.querySelector('.submenu:not(.hidden)')

		if(openedSubmenu) {
			openedSubmenu.classList.replace('animate__fadeIn', 'animate__fadeOut')

			setTimeout(() => {
				openedSubmenu.classList.replace('animate__fadeOut', 'animate__fadeIn')

				openedSubmenu.classList.add('hidden')
			}, 600)

			return 
		}

		if(!element.classList.contains('hidden')) {
			element.classList.replace('animate__fadeIn', 'animate__fadeOut')

			await new Promise((r) => setTimeout(r, 600)).then(() => {})

			element.classList.replace('animate__fadeOut', 'animate__fadeIn')
		}

		element.classList.toggle('hidden')
	}

	useEffect(() => {
		function click(e) {
			const openedSubmenus = document.querySelectorAll('.submenu:not(.hidden)')

			if(openedSubmenus.length) {
				const openedSubmenu = document.querySelector('.submenu:not(.hidden)')

				openedSubmenu.classList.replace('animate__fadeIn', 'animate__fadeOut')

				setTimeout(() => {
					openedSubmenu.classList.replace('animate__fadeOut', 'animate__fadeIn')

					openedSubmenus.forEach(sub => sub.classList.add('hidden'))
				}, 600)
			}
		}

		document.body.addEventListener('click', click)

		return () => {
			document.body.removeEventListener('click', click)
		}
	}, [])

	return (
		<nav className="bg-transparent select-none">
			<div className="container px-6 mx-auto lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center justify-between flex-grow">
						<div className="flex-shrink-0">
							<Link href="/">
								{customer ? (
									<Image
										src={customer?.logo || '/images/logo-horizontal.png'}
										alt={customer?.name || 'Customer Name'}
										width={145}
										height={40}
										priority
										className="animate__animated animate__fadeInDown animate__fast"
									/>
								) : <div></div>}
							</Link>
						</div>

						<div className="hidden lg:block">
							<div className="flex items-center">
								
								{permissions.map((permission, index) => {
									const animationDelay = (permissions.length - index) * 100

									if(permission.subpermissions) {
										return (
											<div className="relative" key={permission.id}>
												<button 
													onClick={() => { expandSubMenu(`.submenu-${permission.id}`) }}
													className={`
														submenu-trigger submenu-trigger-${permission.id} 
														flex flex-row items-center px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md 
														hover:text-white hover:bg-translucent focus:outline-none focus:text-white focus:bg-gray-700
														animate__animated animate__fadeInDown animate__fast animate__delay-${animationDelay}ms
													`}
												>
													<div dangerouslySetInnerHTML={{ __html: Feather.icons[permission.icon].toSvg({ width: 16 }) }} />

													<span className="mx-2">{permission.title}</span>
													
													<div dangerouslySetInnerHTML={{ __html: Feather.icons['chevron-down'].toSvg({ width: 16 }) }} />
												</button>

												<div className={`submenu submenu-${permission.id} absolute hidden z-10 right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg animate__animated animate__fadeIn animate__faster`}>
													<div className="py-1 bg-white rounded-md shadow-xs">
														{permission.subpermissions.map(subpermission => (
															<Link key={subpermission.id} href={subpermission.redirect} className="flex flex-row gap-2 items-center px-4 py-2 text-sm text-gray-700 focus:text-gray-900 hover:text-gray-900 focus:outline-none hover:bg-gray-100">
																
																{subpermission.icon && (
																	<div dangerouslySetInnerHTML={{ __html: Feather.icons[subpermission.icon].toSvg({ width: 16 }) }} />
																)}

																{subpermission.title}
															</Link>
														))}
													</div>
												</div>
											</div>
										)
									} else {
										return (
											<Link 
												key={permission.id} 
												href={permission.redirect} 
												className={`
													flex flex-row items-center px-3 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:text-white hover:bg-translucent
													animate__animated animate__fadeInDown animate__fast animate__delay-${animationDelay}ms
												`}
											>
												<div dangerouslySetInnerHTML={{ __html: Feather.icons[permission.icon].toSvg({ width: 16 }) }} />
		
												<span className="ml-2">{permission.title}</span>
											</Link>
										)
									}
								})}
							</div>
						</div>
					</div>

					<div className="hidden lg:block">
						<div className="flex items-center ml-4 md:ml-6">
							<div className="relative ml-3">
								<div onClick={() => { expandSubMenu('.profile-options') }}>
									<button 
										className={`
											submenu-trigger submenu-trigger-profile-options flex items-center max-w-xs text-sm text-white rounded-full focus:outline-none focus:shadow-solid
											animate__animated animate__fadeInDown animate__fast animate__delay-100ms
										`} 
										id="user-menu" 
										aria-label="User menu" 
										aria-haspopup="true"
									>
										<Image
											src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											alt="Felipe Leite"
											className="rounded-full"
											width={36}
											height={36}
										/>
									</button>
								</div>

								<div className="profile-options submenu absolute hidden right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg animate__animated animate__fadeIn animate__faster">
									<div className="py-1 bg-white rounded-md shadow-xs">
										<Link href="/preferencias" className="flex flex-row items-center px-4 py-2 text-sm text-gray-700 focus:text-gray-900 hover:text-gray-900 focus:outline-none hover:bg-gray-100">
											<div dangerouslySetInnerHTML={{ __html: Feather.icons.settings.toSvg({ width: 16 }) }} />
											<span className="ml-2">Preferências</span>
										</Link>
										<Link href="#" className="flex flex-row items-center px-4 py-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-100 focus:outline-none focus:text-red-700 focus:bg-red-100">
											<div dangerouslySetInnerHTML={{ __html: Feather.icons['log-out'].toSvg({ width: 16 }) }} />
											<span className="ml-2">Sair</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="flex -mr-2 lg:hidden">
						<button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
							<svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
								<path className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
								<path className="hidden" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

				</div>
			</div>

			<div className="hidden lg:hidden">
				<div className="container px-6 mx-auto">
					<div className="pt-2 pb-3">
						<Link href="#" className="flex flex-row items-center px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md focus:outline-none focus:text-white focus:bg-gray-700">
							<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
							<span className="ml-2">Dashboard</span>
						</Link>
						<Link href="#" className="flex flex-row items-center px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
							<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
							<span className="ml-2">Posts</span>
						</Link>
						<div className="relative" x-data="{ open: false }">
							<button className="flex flex-row items-center w-full px-3 py-2 mt-1 text-base font-medium text-left text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
								<span className="mx-2">Pages</span>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-1 transform feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
							</button>
							<div className="px-2 py-2 mt-2 bg-white rounded-md shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
								<Link href="#" className="flex flex-row items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200" role="menuitem">
									Pages-1
								</Link>
								<Link href="#" className="flex flex-row items-center px-3 py-2 mt-1 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200" role="menuitem">
									Pages-2
								</Link>
								<Link href="#" className="flex flex-row items-center px-3 py-2 mt-1 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200" role="menuitem">
									Pages-3
								</Link>
							</div>
						</div>
						<Link href="#" className="flex flex-row items-center px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
							<span className="ml-2">Comments</span>
						</Link>
						<div className="relative" x-data="{ open: false }">
							<button className="flex flex-row items-center w-full px-3 py-2 mt-1 text-base font-medium text-left text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
								<span className="mx-2">Users</span>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-1 transform feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
							</button>
							<div className="px-2 py-2 mt-2 bg-white rounded-md shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
								<Link href="#" className="flex flex-row items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200" role="menuitem">
									Users-1
								</Link>
								<Link href="#" className="flex flex-row items-center px-3 py-2 mt-1 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200" role="menuitem">
									Users-2
								</Link>
								<Link href="#" className="flex flex-row items-center px-3 py-2 mt-1 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200" role="menuitem">
									Users-3
								</Link>
							</div>
						</div>
						<Link href="#" className="flex flex-row items-center px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
							<span className="ml-2">Settings</span>
						</Link>
					</div>
				</div>
				<div className="container px-6 mx-auto">
					<div x-data="{ open: false }" className="py-4 border-t border-gray-700">
						<button className="flex items-center w-full focus:outline-none">
							<div className="flex items-center w-full text-left">
								<div className="flex-shrink-0">
									<img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
								</div>
								<div className="ml-3">
									<div className="text-base font-medium leading-none text-white">Tom Cook</div>
									<div className="mt-1 text-sm font-medium leading-none text-gray-400">tom@example.com</div>
								</div>
							</div>
							<div className="text-white">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-1 transform feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
							</div>
						</button>
						<div className="py-2 mt-4 bg-white rounded-md shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
							<Link href="#" className="flex flex-row items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200" role="menuitem">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
								<span className="ml-2">Your Profile</span>
							</Link>
							<Link href="#" className="flex flex-row items-center px-3 py-2 mt-1 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200" role="menuitem">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
								<span className="ml-2">Settings</span>
							</Link>
							<Link href="#" className="flex flex-row items-center px-3 py-2 mt-1 text-base font-medium text-red-500 rounded-md hover:text-red-700 hover:bg-red-200 focus:outline-none focus:text-red-700 focus:bg-red-200" role="menuitem">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
								<span className="ml-2">Sign out</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}