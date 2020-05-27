const decodeToken = () => {
    const token = readToken();
    const json = JSON.parse(atob(token.split('.')[1]));
    return json;
}

const isTokenValid = () => {
    const token = readToken();
    if (token === null){
        return false;
    }
    const { exp } = decodeToken(token);
    const now = Date.now();
    return exp * 1000 - now > 0;
}

const readToken = () => {
     return window.localStorage.getItem('token');
}

const writeToken = (token) => {
    window.localStorage.setItem("token", token);
}

export { decodeToken, isTokenValid, writeToken, readToken };