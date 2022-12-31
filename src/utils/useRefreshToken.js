import useAuth from './useAuth';

function useRefresh() {
	const { setAuth } = useAuth();

	const refresh = async () => {
		try {
			const result = await fetch(
				'https://valoguesser-server.up.railway.app/refresh',
				{
					credentials: 'include',
				}
			);
			const auth = await result.json();
			setAuth(auth);
			// console.log(auth);
		} catch (err) {
			console.error('error no token');
		}
	};
	return refresh;
}
export default useRefresh;
