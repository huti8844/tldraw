import { useEffect } from 'react'
import { useEditor } from './useEditor'

export function useCoarsePointer() {
	const editor = useEditor()
	useEffect(() => {
		// This is a workaround for a Firefox bug where we don't correctly
		// detect coarse VS fine pointer. For now, let's assume that you have a fine
		// pointer if you're on Firefox on desktop.
		if (editor.isFirefox && !editor.isAndroid && !editor.isIos) {
			editor.isCoarsePointer = false
			return
		}
		if (window.matchMedia) {
			const mql = window.matchMedia('(pointer: coarse)')
			const handler = () => {
				editor.isCoarsePointer = mql.matches
			}
			handler()
			mql.addEventListener('change', handler)
			return () => mql.removeEventListener('change', handler)
		}
	}, [editor])
}
