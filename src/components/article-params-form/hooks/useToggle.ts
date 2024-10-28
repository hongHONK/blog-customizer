import { useCallback, useState } from 'react';

type TUseToggle = (initValue: boolean) => [value: boolean, toggle: () => void];

export const useToggle: TUseToggle = (initValue: boolean) => {
	const [value, setValue] = useState(initValue);
	const toggle = useCallback(() => {
		setValue((value) => !value);
	}, []);

	return [value, toggle];
};
