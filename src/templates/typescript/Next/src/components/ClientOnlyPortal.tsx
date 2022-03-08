import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
	selector: string
}

const ClientOnlyPortal: React.FC<Props> = ({ children, selector }) => {
	const ref = useRef<Element | null>()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		ref.current = document.querySelector(selector)
		setMounted(true)
	}, [selector])

	return mounted && ref.current ? createPortal(children, ref.current) : null
}

export default ClientOnlyPortal
