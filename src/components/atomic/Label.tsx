import { memo } from 'react';

interface LabelProps {
	id?: string;
	className?: string;
	children: React.ReactNode;
	required?: boolean;
}

const Label = ({ id = 'id', className = '', children, required = false }: LabelProps) => {
	return (
		<label
			htmlFor={id}
			data-test-id={`${id}-test-label`}
			className={`w-full text-sm leading-5 font-medium text-gray-700 inline-block ${className}`}
		>
			{children}
			{required && <span className='text-error'> *</span>}
		</label>
	);
};

export default memo(Label);
