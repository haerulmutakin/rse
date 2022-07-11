export const login = (username) => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    
    const data = {
        username: username,
        exp: date.getTime()
    }
    
    localStorage.setItem('session', JSON.stringify(data))
    return;
}

export const isAuthenticated = () => {
	const session = localStorage.getItem('session');
    return JSON.parse(session);
};