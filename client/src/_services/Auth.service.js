export const isAuthenticated = () => {
	const session = localStorage.getItem('session');
    return JSON.parse(session);
};