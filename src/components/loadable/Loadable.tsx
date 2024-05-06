/* eslint-disable react/display-name */
import { Suspense } from 'react';

import { Loader } from '~/components';

export const Loadable = (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) =>
	(
		<Suspense fallback={<Loader />}>
			<Component {...props} />
		</Suspense>
	);
