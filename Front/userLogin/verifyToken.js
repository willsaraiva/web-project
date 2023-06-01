const token = localStorage.getItem('@Ad-token');
let user = localStorage.getItem('@Ad-user');

if(!(token && user)) {
  window.location.href = '../entrar';
}

user = JSON.parse(user);
