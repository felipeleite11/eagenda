'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { CustomerProps } from '../types/customer'
import { get, urls } from '../utils/fetch'

interface GlobalContextProps {
	customer?: CustomerProps
}

interface GlobalProviderProps {
	children: ReactNode
}

const GlobalContext = createContext({} as GlobalContextProps)

export function GlobalProvider({ children }: GlobalProviderProps) {
	const [customer, setCustomer] = useState<CustomerProps|null>(null)

	async function loadCustomer() {
		const response = await get(urls.customer)

		console.log('response', response)

		setCustomer(response)
	}

	useEffect(() => {
		loadCustomer()
	}, [])

	return (
		<GlobalContext.Provider 
			value={{
				customer
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)
