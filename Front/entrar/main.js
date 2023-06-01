const base_url = "http://localhost:9999";

const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

document.querySelector('#myForm').addEventListener('submit', (event) => {
  event.preventDefault();
  login()
})


function login() {
  const email = emailInput.value;
  const password = passwordInput.value;

  axios.post(base_url+'/sessions', {
    email,
    password
  })
  .then(function(res) {
    localStorage.setItem('@Ad-token', res.data.token);
    localStorage.setItem('@Ad-user', JSON.stringify(res.data.user))
    window.location.href = '../userLogin';
  })
  .catch(function() {
    alert("Request error");
  });
}
