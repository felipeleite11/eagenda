interface GetOptions {
	output_format?: 'json'
}

export async function get(url: string, { output_format }: GetOptions = { output_format: 'json' }) {
	let partial = await fetch(url)

	let response

	switch(output_format) {
		case 'json':
			response = await partial.json()
			break
		default:
			throw new Error('Output type not handled.')
	}

	return response
}

export const urls = {
	customer: 'https://run.mocky.io/v3/0d86a245-6750-480e-b09b-45c668596a2c',
	student: 'https://run.mocky.io/v3/b97e664f-3398-4998-b90b-baad54ff4eb7',
	schedule: 'https://run.mocky.io/v3/901c78bd-3574-4ae7-950a-1780b815f3b1'
}