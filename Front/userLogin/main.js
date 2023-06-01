
const title = document.querySelector('.t2');
title.innerHTML += ' ' + user.name;

function updateUser() {
  window.location.href = '../updateUser';
}

function registerAd() {
  window.location.href = '../registerAd';
}

function exitUser() {
  localStorage.removeItem('@Ad-token');
  localStorage.removeItem('@Ad-user');
  window.location.href = '../entrar';
}
