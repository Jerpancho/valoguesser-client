import useAuth from './useAuth';

const useLogout = () => {
	const { setAuth } = useAuth();
	const logout = async () => {
		setAuth({});
		try {
			await fetch('https://valoguesser.netlify.app/logout', {
				method: 'DELETE',
				credentials: 'include',
			});
		} catch (error) {
			console.error(error.message);
		}
	};
	return logout;
};
export default useLogout;
