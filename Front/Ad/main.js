const base_url = "http://localhost:9999"

const title = document.querySelector('#titlesearch')

const ad = JSON.parse(sessionStorage.getItem('ad'))

//console.log(ad)

if (ad) {
    const user = ad.userId;
    title.innerHTML = ad.name + ' - ' + user.name;
    rederAd(ad);
} else {
  title.innerHTML = 'Error info Ad';
}

function rederAd(ad) {
  const content = document.querySelector('#content')

  var pularLinha = document.createElement('br')

  var divCard = document.createElement('ul')
  
  var coluna2 = document.createElement('li');
  coluna2.setAttribute('class', 'div-mg-search')

  var c2 = document.createElement('div')
  c2.setAttribute('class', 'c2')

  var centerC2 = document.createElement('center')

  var img = document.createElement('img');
  img.setAttribute('src', ad.link_img)
  // img.setAttribute('style', 'width: px;')
  img.setAttribute('style', 'height: 170px;')
  img.setAttribute('class', 'img-search')

  centerC2.appendChild(img)
  if(ad.visit_profile) {
    var buttonProfile = document.createElement('button');
    buttonProfile.setAttribute('class', 'button-user')
    buttonProfile.setAttribute('onclick', `showAdsUserOwner('${ad.userId._id}')`)
    buttonProfile.innerHTML = 'Visitar perfil'
    centerC2.appendChild(buttonProfile)
  }

  c2.appendChild(centerC2)
  coluna2.appendChild(c2)

  var divInfo = document.createElement('li');
  divInfo.setAttribute('class', 'div-info');

  var c1 = document.createElement('div')
  c1.setAttribute('class', 'c1')

  var priceAd = document.createElement('div');
  priceAd.setAttribute('class', 'valor')
  priceAd.innerHTML = "Valor"

  var price = document.createElement('div');
  price.setAttribute('class', 'caixa1')
  var centerPrice = document.createElement('center');
  centerPrice.innerHTML = ad.price
  price.appendChild(centerPrice)

  var descriptionAd = document.createElement('p');
  descriptionAd.setAttribute('class', 'text-descricao')
  descriptionAd.innerHTML = "Descrição"

  var description = document.createElement('div');
  description.setAttribute('class', 'descricao')
  description.innerHTML = ad.description

  var contactUser = document.createElement('div');
  contactUser.setAttribute('class', 'caixa2')
  var contact = document.createElement('div');
  contact.setAttribute('class', 'contato')
  contact.innerHTML = ad.userId.contact
  contactUser.appendChild(contact)

  c1.appendChild(priceAd)
  c1.appendChild(pularLinha)
  c1.appendChild(price)
  c1.appendChild(descriptionAd)
  c1.appendChild(pularLinha)
  c1.appendChild(description)
  c1.appendChild(contactUser)

  divInfo.appendChild(c1)

  var divButtons = document.createElement('div')
  var buttonCenter = document.createElement('center')

  if(ad.meusAd) { 
      var buttonUpdate = document.createElement('button')
      buttonUpdate.setAttribute('class', 'button-update')
      buttonUpdate.setAttribute('onclick', 'updateAd()')
      buttonUpdate.innerHTML = 'Atualizar'
      
      var buttonDelete = document.createElement('button');
      buttonDelete.setAttribute('class', 'button-delete')
      buttonDelete.setAttribute('onclick', 'deleteAd()')
      buttonDelete.innerHTML = 'Apagar'

      buttonCenter.appendChild(buttonUpdate)
      buttonCenter.appendChild(buttonDelete)
  }

  divButtons.appendChild(buttonCenter)

	divCard.appendChild(coluna2)
  divCard.appendChild(divInfo)

  content.appendChild(divCard)
  content.appendChild(pularLinha) 
  content.appendChild(divButtons)
}

function showAdsUserOwner(userId) {
    axios.get(base_url+'/searchs/'+userId)
    .then(function(res) {
      console.log(res.data)
      sessionStorage.setItem('list_ad_owner_user', JSON.stringify(res.data));
      window.location.href = '../portifolio';
    })
    .catch(function() {
      alert("Request error");
    });
}

function updateAd() {
  window.location.href = '../updateAd';
}

function deleteAd() {
  const token = localStorage.getItem('@Ad-token');
  axios.delete(base_url+'/ads/' + ad._id, {
    headers: {
      'authorization': 'Bearer ' + token,
    },
  }).then(function() {
    alert("Delete sucess");
    window.location.href = "../meusAd";
  })
  .catch(function() {
    alert("Error delete ad");
  });
}
