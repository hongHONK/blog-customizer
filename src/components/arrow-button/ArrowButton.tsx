import arrow from '../../images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	onClick: OnClick;
	isOpen: boolean;
	innerRef?: React.MutableRefObject<HTMLDivElement | null>;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	const refProp = props.innerRef ? { ref: props.innerRef } : {};

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */

		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(
				styles.container,
				props.isOpen ? styles.container_open : null
			)}
			onClick={props.onClick}
			{...refProp}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, props.isOpen ? styles.arrow_open : null)}
			/>
		</div>
	);
};
