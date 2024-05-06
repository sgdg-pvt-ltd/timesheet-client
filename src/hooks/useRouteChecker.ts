import { matchPath } from 'react-router-dom';

function useRouteChecker({ pathname }: { pathname: string }) {
	const isAuthPage = matchPath('/auth/*', pathname);
	const isAppPage = matchPath('/app/*', pathname);

	return {
		isAuthPage,
		isAppPage,
	};
}
export default useRouteChecker;
