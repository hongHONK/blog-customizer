import { useEffect } from 'react';

export type TModalClose = {
	relatedRef: React.RefObject<HTMLElement | null>[];
	isOpen: boolean;
	onClose: () => void;
};

export const useModalClose = ({ relatedRef, isOpen, onClose }: TModalClose) => {
	const handleClickOutside = (e: MouseEvent) => {
		const { target } = e;
		let targetIsRelated = false;
		relatedRef.forEach((ref) => {
			if (target instanceof Node && ref.current && ref.current.contains(target))
				targetIsRelated = true;
		});

		if (!targetIsRelated) onClose();
	};

	const handleEscKeydown = (e: KeyboardEvent) => {
		const { key } = e;
		if (key === 'Escape') onClose();
	};

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('mouseup', handleClickOutside);
			window.addEventListener('keydown', handleEscKeydown);
		}

		return () => {
			window.removeEventListener('mouseup', handleClickOutside);
			window.removeEventListener('keydown', handleEscKeydown);
		};
	}, [relatedRef, isOpen, onClose]);
};
