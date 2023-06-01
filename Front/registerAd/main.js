const base_url = "http://localhost:9999";

let ad = {};

document.querySelector('#myForm').addEventListener('submit', (event) => {
  event.preventDefault();
  submitEdit();
  axios.post(base_url+'/ads', ad, {
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
