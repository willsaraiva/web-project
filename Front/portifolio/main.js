const base_url = "http://localhost:9999"

console.log(JSON.parse(sessionStorage.getItem('list_ad_owner_user')))

const { docs: listAds, page, pages } = JSON.parse(sessionStorage.getItem('list_ad_owner_user'));

const title = document.querySelector('#titlesearch')

if (listAds) {
    const user = listAds[0].userId
    title.innerHTML += ' ' + user.name
    // rederUserOwner(user)
    rederShowAd(listAds)
} else {
    title.innerHTML = 'Error search';
}

// function rederUserOwner(user) {
//     const infoUser = document.querySelector('#info-user')

//     var emailUser = document.createElement('p')
//     emailUser.setAttribute('class', 'p-email-user')
//     emailUser.innerHTML = user.email

//     var contactUser = document.createElement('p')
//     contactUser.setAttribute('class', 'p-contact-user')
//     contactUser.innerHTML = user.contact

//     infoUser.appendChild(emailUser)
//     infoUser.appendChild(contactUser)
// }

function rederShowAd(Ads) {
const content = document.querySelector('#content')

for (ad of Ads) {   
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
    
    // var userName = document.createElement('a');
    // userName.innerHTML = ownerUser.name
    // userName.setAttribute('onclick', `showAdUser('${ownerUser._id}', '${ownerUser.name}')`)
    // userName.setAttribute('class', 'user-search')

    c1.appendChild(priceAd)
    c1.appendChild(price)
    c1.appendChild(descriptionAd)
    c1.appendChild(description)
    c1.appendChild(pularLinha)
    // c1.appendChild(userName)

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
        Object.assign(res.data, { visit_profile: false })
        sessionStorage.setItem('ad', JSON.stringify(res.data));
        window.location.href = '../Ad';
      })
      .catch(function() {
        alert("Request error");
      });
}