'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGlobalContext } from '@/app/contexts/GlobalContext'

export function Footer() {
	const { customer } = useGlobalContext()

	return (
		<footer className="h-24 px-16">
			<div className="border-t-[1px] border-zinc-300 py-8 px-24 grid grid-cols-[2fr_1fr_1fr] text-center">
				<div className="flex flex-col gap-2">
					{customer ? (
						<>
							<Link href="/" className="justify-self-center mb-3">
								<Image
									src={customer?.logo}
									alt={customer.name}
									width={120}
									height={36}
									priority
								/>
							</Link>
						
							<ul className="text-sm text-zinc-200 leading-7">
								<li className="flex gap-1 items-center">
									<i className="ph-bold ph-phone text-lg"></i>
									<span>{customer?.phone}</span>
								</li>
								<li className="flex gap-1 items-center">
									<i className="ph-bold ph-envelope text-lg"></i>
									<span>{customer?.email}</span>
								</li>
								<li className="flex gap-1 items-center">
									<i className="ph-bold	 ph-map-pin text-lg"></i>
									<span>{customer?.address}</span>
								</li>
							</ul>
						</>
					) : null}
				</div>

				<div className="flex flex-col items-center">
					{customer && (
						<>
							<h1 className="font-semibold mb-2 mt-6">Links</h1>

							<ul className="w-24 text-sm leading-7">
								{customer?.links.map(link => (
									<li key={link.link}>
										<a href={link.link} target="_blank" className="flex gap-1 items-center text-zinc-200 hover:text-white transition-colors">
											<i className={`text-lg ph-bold ph-${link.icon}`}></i>
											
											<span>{link.description}</span>
										</a>
									</li>
								))}
							</ul>
						</>
					)}
				</div>

				<div className="flex flex-col items-center">
					{customer && (
						<>
							<h1 className="font-semibold mb-2 mt-6">Parcerias</h1>

							<ul className="w-24 text-sm leading-7">
								{customer?.partners.map(partner => (
									<li key={partner.link}>
										<a href={partner.link} target="_blank" className="text-center text-zinc-200 hover:text-white transition-colors">
											<span>{partner.description}</span>
										</a>
									</li>
								))}
							</ul>
						</>
					)}
				</div>
			</div>
		</footer>
	)
}