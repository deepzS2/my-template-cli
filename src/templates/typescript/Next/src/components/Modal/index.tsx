import React, {
	useState,
	forwardRef,
	useImperativeHandle,
	useCallback,
	useEffect,
} from 'react'

import ClientOnlyPortal from '@components/ClientOnlyPortal'

import { Container, ModalBody, Overlay } from './styles'

interface Props {
	defaultOpened?: boolean
	children?: React.ReactNode
}

export interface ModalRef {
	open: () => void
	close: () => void
}

const Modal: React.ForwardRefRenderFunction<ModalRef | undefined, Props> = (
	{ children, defaultOpened = false },
	ref
) => {
	const [isOpen, setIsOpen] = useState(defaultOpened)

	// Performance...
	const close = useCallback(() => setIsOpen(false), [])
	const handleEscape = useCallback(
		(event: KeyboardEvent) => {
			if (event.code === 'Space') close()
		},
		[close]
	)

	useEffect(() => {
		if (isOpen) document.addEventListener('keydown', handleEscape, false)
		return () => {
			document.removeEventListener('keydown', handleEscape, false)
		}
	}, [handleEscape, isOpen])

	// Custom useRef.current values to open and close modal
	useImperativeHandle(
		ref,
		() => ({
			open: () => setIsOpen(true),
			close,
		}),
		[close]
	)

	return isOpen ? (
		<ClientOnlyPortal selector="#dpzt__modal-root">
			<Container>
				<Overlay
					onClick={(e) => {
						e.stopPropagation()
						close()
					}}
				/>
				<ModalBody>{children}</ModalBody>
			</Container>
		</ClientOnlyPortal>
	) : null
}

export default forwardRef(Modal)
