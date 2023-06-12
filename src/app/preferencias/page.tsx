'use client'

import { Formik, Form } from 'formik'
import { Card } from "@/components/Card"
import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Form/Checkbox"

interface PreferencesFormData {
	menu_hover: boolean
}

export default function Preferences() {
	async function handleSubmit(values: PreferencesFormData) {
		try {
			localStorage.setItem('@eagenda/preferences', JSON.stringify({
				menu_hover: values.menu_hover
			} as any))
		} catch(e) {
			
		}
	}

	return (
		<main className="flex min-h-main items-center gap-8 p-24">
			<Card
				image="https://img.freepik.com/free-photo/hand-with-support-gears-isolated_53876-26158.jpg"
				title="Preferências"
				text="Configure suas preferências"
				className="animate__animated animate__fadeInUp"
				content={(
					<Formik
						onSubmit={handleSubmit}
						initialValues={{
							menu_hover: false
						}}
					>
						{({ isSubmitting }: any) => (
							<Form>
								<Checkbox 
									label="Exibir menus ao passar o mouse"
									name="menu_hover"
								/>

								<Button type="submit" loading={isSubmitting}>
									Confirmar alterações
								</Button>
							</Form>
						)}
					</Formik>
				)}
			/>
		</main>
	)
}
