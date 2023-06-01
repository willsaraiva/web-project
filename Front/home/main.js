const base_url = "http://localhost:9999"

const inputSearch = document.querySelector('#searchAd')

function formatParams( params ){
  return "?" + Object
        .keys(params)
        .map(function(key){
          return key+"="+encodeURIComponent(params[key])
        })
        .join("&")
}

function seachAd() {
  const inputAd = inputSearch.value; // pegar valor do input

  axios.get(base_url+"/searchs"+formatParams({ areaOfInterest: inputAd }))
    .then(function(res) {
        if (res.data.docs.length === 0) { // se não tiver elemento com nome igual a busca
            alert("Ad not exist");
        }else{
            Object.assign(res.data, { areaOfInterest: inputAd }) // insere o resultado da busca em sessionStorage com o nome da pesquisa 
            sessionStorage.setItem('list_ad', JSON.stringify(res.data));
            window.location.href = '../searchAd'; // redireciona para searAd
        }
    })
    .catch(function() {
      alert("Request error");
    });
}
