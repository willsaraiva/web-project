const base_url = "http://localhost:9999"

const title = document.querySelector('#titlesearch')
const { docs: list_ads, page, pages, areaOfInterest } = JSON.parse(sessionStorage.getItem('list_ad'))

if (list_ads) {
  title.innerHTML += ' ' + areaOfInterest
  rederShowAd(list_ads)
} else {
  title.innerHTML = 'Error search';
}

function rederShowAd(list_ads) {
  const content = document.querySelector('#content')

  for (ad of list_ads) {
      const ownerUser = ad.userId

      var pularLinha = document.createElement('br')

      var divCard = document.createElement('div');
      divCard.setAttribute('class', 'card')
      // divCard.setAttribute('class', 'div-card-search')

      // Coluna 1
      var coluna1 = document.createElement('li');
      coluna1.setAttribute('class', 'coluna')

      var c2 = document.createElement('div');
      c2.setAttribute('class', 'c2')

      nameAd = document.createElement('h3')
      nameAd.innerHTML = ad.name

      var img = document.createElement('img');
      img.setAttribute('class', 'img-search')
      img.setAttribute('style', 'width: 250px;')
      img.setAttribute('src', ad.link_img)

      var centerImg = document.createElement('center')
      centerImg.appendChild(img)
      c2.appendChild(nameAd)
      c2.appendChild(centerImg)
      
      coluna1.appendChild(c2)

      // Coluna 2
      var coluna2 = document.createElement('li');
      coluna2.setAttribute('class', 'coluna')

      var c1 = document.createElement('div');
      c1.setAttribute('class', 'c1')
      
      var priceAd = document.createElement('div');
      priceAd.setAttribute('class', 'valor')
      priceAd.innerHTML = "Valor" 

      var price = document.createElement('div');
      price.setAttribute('class', 'caixa')
      //price.innerHTML = ad.price
      centerPrice = document.createElement('center');
      centerPrice.innerHTML = ad.price
      price.appendChild(centerPrice)
      
      var descriptionAd = document.createElement('p');
      descriptionAd.setAttribute('class', 'text-descricao')
      descriptionAd.innerHTML = "Descrição"
      var description = document.createElement('div');
      description.setAttribute('class', 'descricao')
      description.innerHTML = ad.description
      
      var userName = document.createElement('a');
      userName.innerHTML = ownerUser.name
      userName.setAttribute('onclick', `showAdUser('${ownerUser._id}', '${ownerUser.name}')`)
      userName.setAttribute('class', 'user-search')

      c1.appendChild(priceAd)
      c1.appendChild(price)
      c1.appendChild(descriptionAd)
      c1.appendChild(description)
      c1.appendChild(pularLinha)
      c1.appendChild(userName)

      coluna2.appendChild(c1)

      // divInfo.appendChild(divImg)
      // divInfo.appendChild(divDescription)
      // divInfo.setAttribute('onclick', `showSelected('${ad._id}')`)
            
      divCard.appendChild(coluna1)
      divCard.appendChild(coluna2)
      divCard.setAttribute('onclick', `showSelected('${ad._id}')`)

      content.appendChild(divCard)
    }
}

function showAdUser(userId, name) {
  console.log(userId, name)
  axios.get(base_url+'/searchs/'+userId)
  .then(function(res) {
    Object.assign(res.data, { name, visit_profile: true });
    sessionStorage.setItem('list_ad_owner_user', JSON.stringify(res.data));
    window.location.href = '../portifolio';
  })
  .catch(function() {
    alert("Request error");
  });
}

function showSelected(id) {
    axios.get(base_url+'/ads/'+id)
  .then(function(res) {
    Object.assign(res.data, { visit_profile: true })
    sessionStorage.setItem('ad', JSON.stringify(res.data));
    console.log(res.data)
    window.location.href = '../Ad';
  })
  .catch(function() {
    alert("Request error");
  });
}

function clearSearch() {
  window.location.href = '../home';
}
