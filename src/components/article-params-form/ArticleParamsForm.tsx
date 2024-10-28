import { ArrowButton } from '../arrow-button';
import { Button } from '../button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from '../../constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { useModalClose } from './hooks/useModalClose';
import { Text } from '../text';
import { Separator } from '../separator';
import { useToggle } from './hooks/useToggle';

export type ArticleParamsFormProps = {
	setArticleState: (data: ArticleStateType) => void;
	articleState: ArticleStateType;
	isOpen?: boolean;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setArticleState, articleState } = props;

	const [isOpen, toggleIsOpen] = useToggle(!!props.isOpen);

	const [currentFontFamily, setCurrentFontFamily] = useState(
		articleState.fontFamilyOption
	);
	const [currentFontSize, setCurrentFontSize] = useState(
		articleState.fontSizeOption
	);
	const [currentFontColor, setCurrentFontColor] = useState(
		articleState.fontColor
	);
	const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [currentContentWidth, setCurrentContentWidth] = useState(
		articleState.contentWidth
	);

	const arrowButtonRef = useRef<HTMLDivElement | null>(null);
	const sideMenuRef = useRef<HTMLElement | null>(null);
	const defaultSettingsRef = useRef<ArticleStateType | null>(null);

	useModalClose({
		relatedRef: [sideMenuRef, arrowButtonRef],
		isOpen: isOpen,
		onClose: toggleIsOpen,
	});

	useEffect(() => {
		defaultSettingsRef.current = articleState;
	}, []);

	useEffect(() => {
		setCurrentFontFamily(articleState.fontFamilyOption);
		setCurrentFontSize(articleState.fontSizeOption);
		setCurrentFontColor(articleState.fontColor);
		setCurrentBackgroundColor(articleState.backgroundColor);
		setCurrentContentWidth(articleState.contentWidth);
	}, [articleState]);

	const handleReset = () => {
		if (defaultSettingsRef.current) {
			setArticleState({
				fontFamilyOption: defaultSettingsRef.current.fontFamilyOption,
				fontSizeOption: defaultSettingsRef.current.fontSizeOption,
				fontColor: defaultSettingsRef.current.fontColor,
				backgroundColor: defaultSettingsRef.current.backgroundColor,
				contentWidth: defaultSettingsRef.current.contentWidth,
			});
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState({
			fontFamilyOption: currentFontFamily,
			fontSizeOption: currentFontSize,
			fontColor: currentFontColor,
			backgroundColor: currentBackgroundColor,
			contentWidth: currentContentWidth,
		});
	};

	return (
		<>
			<ArrowButton
				innerRef={arrowButtonRef}
				onClick={toggleIsOpen}
				isOpen={isOpen}
			/>
			<aside
				className={clsx(
					styles.container,
					isOpen ? styles.container_open : null
				)}
				ref={sideMenuRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>
					<Select
						selected={currentFontFamily}
						onChange={setCurrentFontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						name='Размер шрифта'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={currentFontSize}
						onChange={setCurrentFontSize}
					/>
					<Select
						selected={currentFontColor}
						onChange={setCurrentFontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator color='#D7D7D7' />
					<Select
						selected={currentBackgroundColor}
						onChange={setCurrentBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={currentContentWidth}
						onChange={setCurrentContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
