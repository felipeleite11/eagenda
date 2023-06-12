import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const socialMedias = [
	{
		description: 'Site',
		icon: 'cursor-click',
		link: 'https://dublinidiomas.com.br/'
	},
	{
		description: 'Instagram',
		icon: 'instagram-logo',
		link: 'https://www.instagram.com/dublinidiomasclub/'
	},
	{
		description: 'Facebook',
		icon: 'facebook-logo',
		link: 'https://www.facebook.com/dublinidiomasclub'
	},
	{
		description: 'Youtube',
		icon: 'youtube-logo',
		link: 'https://www.youtube.com/@dublinidiomasclub3551'
	}
]

const partners = [
	{
		name: 'SINPEFPA',
		link: 'https://www.sinpefpa.org.br/convenios/dublin-idiomas-club-2/'
	},
	{
		name: 'ASSINDELP',
		link: 'https://www.assindelp.org.br/conteudo/view/conteudo-unico/14526'
	},
	{
		name: 'Ótica Ravi',
		link: 'https://www.instagram.com/p/CpTL0PYOdmX/'
	}
]

export function Footer() {
	return (
		<footer className="h-24 px-16">
			<div className="border-t-[1px] border-zinc-300 py-8 px-24 grid grid-cols-[2fr_1fr_1fr] text-center">
				<div className="flex flex-col gap-2">
					<Link href="/" className="justify-self-center mb-3">
						<Image
							src="/images/logo-horizontal.png"
							alt="E-Agenda"
							width={120}
							height={36}
							priority
						/>
					</Link>
					
					<ul className="text-sm text-zinc-200 leading-7">
						<li className="flex gap-1 items-center">
							<i className="ph-bold ph-phone text-lg"></i>
							<span>+55 (91) 3117-9678</span>
						</li>
						<li className="flex gap-1 items-center">
							<i className="ph-bold ph-envelope text-lg"></i>
							<span>contato@dublinidiomas.com.br</span>
						</li>
						<li className="flex gap-1 items-center">
							<i className="ph-bold	 ph-map-pin text-lg"></i>
							<span>Tv. Três de Maio, 1465 - São Brás - Belém - Pará</span>
						</li>
					</ul>
				</div>

				<div className="flex flex-col items-center">
					<h1 className="font-semibold mb-2 mt-6">Links</h1>

					<ul className="w-24 text-sm leading-7">
						{socialMedias.map(media => (
							<li key={media.link}>
								<a href={media.link} target="_blank" className="flex gap-1 items-center text-zinc-200 hover:text-white transition-colors">
									<i className={`text-lg ph-bold ph-${media.icon}`}></i>
									
									<span>{media.description}</span>
								</a>
							</li>
						))}
					</ul>
				</div>

				<div className="flex flex-col items-center">
					<h1 className="font-semibold mb-2 mt-6">Parcerias</h1>

					<ul className="w-24 text-sm leading-7">
						{partners.map(partner => (
							<li key={partner.link}>
								<a href={partner.link} target="_blank" className="text-center text-zinc-200 hover:text-white transition-colors">
									<span>{partner.name}</span>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	)
}