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
	customer: 'https://run.mocky.io/v3/166ada1e-5850-4194-82d0-be1bddb1419d',
	student: 'https://run.mocky.io/v3/b97e664f-3398-4998-b90b-baad54ff4eb7'
}