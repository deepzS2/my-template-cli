import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
} from 'react'
import { useTransition } from 'react-spring'

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
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: 'translateY(-40px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-40px)' },
  })

  // Performance...
  const close = useCallback(() => setIsOpen(false), [])
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Escape') setIsOpen(false)
  }, [])

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

  return (
    <>
      {transitions(
        (styles, item) =>
          item && (
            <ClientOnlyPortal selector="#dpzt__modal-root">
              <Container style={styles}>
                <Overlay
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(false)
                  }}
                />
                <ModalBody>{children}</ModalBody>
              </Container>
            </ClientOnlyPortal>
          )
      )}
    </>
  )
}

export default forwardRef(Modal)