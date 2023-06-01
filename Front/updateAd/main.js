const base_url = "http://localhost:9999";

const ad = JSON.parse(sessionStorage.getItem('ad'))

if (ad) {
  renderAd(ad);
} else {
  title.innerHTML = 'Error info Ad';
}

document.querySelector('#myForm').addEventListener('submit', (event) => {
  event.preventDefault();
  submitEdit();
  axios.put(base_url+'/ads/'+ad._id, ad, {
    headers: {
      'authorization': 'Bearer ' + token,
    },
  })
  .then(function(res) {
    console.log(res.data)
    alert("Ad registration completed successfully");
    window.location.href = "../meusAd"
  })
  .catch(function() {
    alert("Sign in to your account");
  });
});

function renderAd(ad) {
  const nameAd = document.querySelector('#name');
  nameAd.value = ad.name;

  const priceAd = document.querySelector('#price');
  priceAd.value = ad.price;

  const areaOfInterestAd = document.querySelector('#areaOfInterest');
  areaOfInterestAd.value = ad.areaOfInterest;

  const link_imgAd = document.querySelector('#link_img');
  link_imgAd.value = ad.link_img;

  const descriptionAd = document.querySelector('#description');
  descriptionAd.value = ad.description;
}

function submitEdit() {
  const nameAd = document.querySelector('#name');
  ad.name = nameAd.value;

  const priceAd = document.querySelector('#price');
  ad.price = priceAd.value;

  const areaOfInterest = document.querySelector('#areaOfInterest');
  ad.areaOfInterest = areaOfInterest.value;

  const descriptionAd = document.querySelector('#description');
  ad.description = descriptionAd.value;

  const link_imgAd = document.querySelector('#link_img');
  ad.link_img = link_imgAd.value;
}
