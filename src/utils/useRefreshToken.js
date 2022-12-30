import useAuth from './useAuth';

function useRefresh() {
	const { setAuth } = useAuth();

	const refresh = async () => {
		try {
			const result = await fetch('http://localhost:4444/refresh', {
				credentials: 'include',
			});
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
