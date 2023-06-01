const base_url = "http://localhost:9999";

var title = document.querySelector('#title');
var content = document.querySelector('#bloco');

axios.get(base_url+'/ads', {
  headers: {
    'authorization': 'Bearer ' + token,
  }
})
.then(function(res) {
  //console.log(res.data.docs);
  if (res.data.docs.length === 0) { // se não tiver elemento com nome igual a busca
    alert("Ad not exist");
  }else {
    rederShowAd(res.data.docs);
  }
}).catch(function() {
  alert("Sign in to your account");
  // title.innerHTML = 'Error in the search of anuncio'
});

function rederShowAd(Ads) {

  for (ad of Ads) {
    
    var content = document.querySelector('#content')

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
    var textdescrip = document.createElement('p');
    textdescrip.innerHTML = ad.description
    description.appendChild(textdescrip)
    
    c1.appendChild(priceAd)
    c1.appendChild(price)
    c1.appendChild(descriptionAd)
    c1.appendChild(description)
    c1.appendChild(pularLinha) 
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

function showSelected(id) {
    axios.get(base_url+'/ads/'+id)
      .then(function(res) {
        Object.assign(res.data, { meusAd: true })
        sessionStorage.setItem('ad', JSON.stringify(res.data));
        window.location.href = '../Ad';
      })
      .catch(function() {
        alert("Request error");
      });
}

function registerAd() {
  window.location.href = '../registerAd';
}


