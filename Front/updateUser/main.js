const base_url = "http://localhost:9999";

if (user) {
  renderUser(user);
} else {
  title.innerHTML = 'Error info User';
}

function renderUser(user) {
  const nameUser = document.querySelector('#name');
  nameUser.value = user.name;

  const emailUser = document.querySelector('#email');
  emailUser.value = user.email;

  const contactUser = document.querySelector('#contact');
  contactUser.value = user.contact;
}

document.querySelector('#myForm').addEventListener('submit', (event) => {
  event.preventDefault();
  submitRegister();
  axios.put(base_url+'/users', user, {
    headers: {
      'authorization': 'Bearer ' + token,
    }
  })
  .then(function(res) {
    alert("User update completed successfully");
    localStorage.setItem('@Ad-user', JSON.stringify(res.data));
    window.location.href = '../userLogin';
  })
  .catch(function() {
    alert("Error update");
  });
});

function submitRegister() {
  const nameUser = document.querySelector('#name');
  user.name = nameUser.value;

  const emailUser = document.querySelector('#email');
  user.email = emailUser.value;

  const contactUser = document.querySelector('#contact');
  user.contact = contactUser.value;

  const oldPasswordUser = document.querySelector('#oldPassword');
  const passwordUser = document.querySelector('#password');
  if (oldPasswordUser.value) {
    user.oldPassword = oldPasswordUser.value;
    user.password = passwordUser.value;
  }
}

function cancelUpdate() {
  window.history.back();
}