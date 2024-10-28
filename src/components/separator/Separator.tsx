import styles from './index.module.scss';

type SeparatorProps = {
	color?: string;
};

export const Separator = ({ color = '#000' }: SeparatorProps) => {
	return (
		<div
			className={styles.separator}
			style={{ background: color } as React.CSSProperties}></div>
	);
};
