export default function authHeader() {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && accessToken) {
      return { 'x-access-token': accessToken };
    } else {
      return {};
    }
  }