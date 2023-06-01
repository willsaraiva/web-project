const token = localStorage.getItem('@Ad-token');
let user = localStorage.getItem('@Ad-user');

if(!(token && user)) {
  alert('Sign in');
  window.location.href = '../entrar';
}

user = JSON.parse(user);