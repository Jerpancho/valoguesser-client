import React from 'react';
import { useNavigate } from 'react-router-dom';
function homeIcon() {
	const navigate = useNavigate();
	return (
		<svg
			cursor={'pointer'}
			xmlns='http://www.w3.org/2000/svg'
			width={38}
			height={41}
			xmlSpace='preserve'
			onClick={() => {
				navigate('/');
			}}
		>
			<g>
				<path
					style={{
						stroke: 'red',
						strokeWidth: 0.264583,
						strokeDasharray: 'none',
						strokeLinecap: 'butt',
						strokeDashoffset: 0,
						strokeLinejoin: 'miter',
						strokeMiterlimit: 4,
						fill: '#fff',
						fillRule: 'nonzero',
						opacity: 1,
					}}
					transform='matrix(3.78 0 0 3.78 -.013 0)'
					d='M7.441 2.514 1.82 6.945l6.416 3.87s1.505.016 1.82.033z'
					strokeLinecap='round'
				/>
				<path
					style={{
						stroke: 'red',
						strokeWidth: 0.264582,
						strokeDasharray: 'none',
						strokeLinecap: 'butt',
						strokeDashoffset: 0,
						strokeLinejoin: 'miter',
						strokeMiterlimit: 4,
						fill: '#000',
						fillOpacity: 0,
						fillRule: 'nonzero',
						opacity: 1,
					}}
					transform='matrix(3.78 0 0 3.78 -.01 .011)'
					d='M1.827 6.962A3.743 3.744 0 0 1 .362 2.889 3.743 3.744 0 0 1 3.718.155 3.743 3.744 0 0 1 7.41 2.416'
					strokeLinecap='round'
					fill='none'
				/>
				<path
					style={{
						stroke: '#fff',
						strokeWidth: 0.502708,
						strokeDasharray: 'none',
						strokeLinecap: 'butt',
						strokeDashoffset: 0,
						strokeLinejoin: 'miter',
						strokeMiterlimit: 4,
						fill: 'red',
						fillRule: 'nonzero',
						opacity: 1,
					}}
					transform='matrix(3.78 0 0 3.78 -.007 .006)'
					d='M7.33 3.891A3.361 3.362 0 0 1 3.97 7.253 3.361 3.362 0 0 1 .607 3.891 3.361 3.362 0 0 1 3.97.53 3.361 3.362 0 0 1 7.33 3.891Z'
					strokeLinecap='round'
				/>
			</g>
		</svg>
	);
}

export default homeIcon;
