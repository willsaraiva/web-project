const token = localStorage.getItem('@Ad-token');
const user = localStorage.getItem('@Ad-user');

if(token && user) {
  window.location.href = '../userLogin';
}
