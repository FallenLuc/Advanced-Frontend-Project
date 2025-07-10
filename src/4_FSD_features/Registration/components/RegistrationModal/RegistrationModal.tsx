import { useMemo, Suspense, useCallback } from "react"
import type { testingProps } from "@customTypes/testing.types"
import { TypedMemo } from "@sharedProviders/TypedMemo"
import type { ModalProps } from "@ui/Modal"
import { Modal } from "@ui/Modal"
import { Loader } from "@ui/Loader"
import { RegistrationForm } from "../RegistrationForm/RegistrationForm.async"

type RegistrationModalProps = {
	className?: string
} & testingProps &
	ModalProps

export const RegistrationModal = TypedMemo((props: RegistrationModalProps) => {
	const { className, isOpen, lazy = false, onClose } = props

	const fallback = useMemo(() => <Loader />, [])

	const onSuccessHandler = useCallback(() => {
		onClose?.()
	}, [onClose])

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			classNames={className}
			lazy={lazy}
		>
			<Suspense fallback={fallback}>
				{isOpen && <RegistrationForm onSuccess={onSuccessHandler} />}
			</Suspense>
		</Modal>
	)
})
