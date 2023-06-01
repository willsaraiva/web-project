const token = localStorage.getItem('@Ad-token');
const user = localStorage.getItem('@Ad-user');

if(!(token && user)) {
  alert('Sign in');
  window.location.href = '../entrar';
}
