import type { Mods } from "@helpers/classNamesHelp/classNamesHelp"
import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import { useModal } from "@hooks/useModal.hook"
import type { PropsWithChildren } from "react"
import { memo, useMemo } from "react"
import { Overlay } from "../../../Overlay"
import { Portal } from "../../../Portal"
import styles from "./Modal.module.scss"

export type ModalProps = {
	classNames?: string
	isOpen?: boolean
	onClose?: () => void
	lazy?: boolean
} & PropsWithChildren

export const Modal = memo<ModalProps>(props => {
	const { classNames, children, isOpen = false, onClose, lazy = false } = props

	const modalProps = useMemo(() => ({ isOpen, onClose }), [isOpen, onClose])

	const { onCloseHandler } = useModal(modalProps)

	if (lazy && !isOpen) {
		return null
	}

	const mods: Mods = { [styles.isOpen]: isOpen }

	return (
		<Portal>
			<div className={classNamesHelp(styles.Modal, mods, [classNames])}>
				<Overlay onClose={onCloseHandler} />

				<div className={styles.content}>{children}</div>
			</div>
		</Portal>
	)
})
