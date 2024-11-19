import config from '../config.js';

let apiKey = config.apiKey;

//apiKey = "IY42jPH1izzojdYrFPhEM12u6b7sKQYMhfrkqJ1MTKx5QzfWsx"

//Working API Calls
window.onload = function() {
  //back button
  document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = '/home-page/home-page.html';
    localStorage.clear();
    // localStorage.removeItem('uploadedImage');
    // localStorage.removeItem('scientificName');
    // localStorage.removeItem('plantAcessToken');
    // localStorage.removeItem('plantID');
  });

  //add it globally like the let api key
  const imageUrl = localStorage.getItem('uploadedImage');
  const scientificName = localStorage.getItem('scientificName');
  const plantID = localStorage.getItem('plantID');

  if (!plantID) {
    alert('No token found. Please try uploading the image again.');
    return;
  };

  document.getElementById('uploaded-image').src = imageUrl;
  document.querySelector('.info-section h2').innerText = scientificName;

  identifyPlant();
}

function identifyPlant(){
  const scientificName = localStorage.getItem('scientificName');

  let plantSearchHeaders = new Headers();
  plantSearchHeaders.append("Content-Type", "application/json");
  plantSearchHeaders.append("Api-Key", apiKey);

  let searchRequestOptions = {
    method: 'GET',
    headers: plantSearchHeaders,
    redirect: 'follow'
  };

  console.log('searchRequestOptions', searchRequestOptions)
  fetch(`https://plant.id/api/v3/kb/plants/name_search?q=${scientificName}`, searchRequestOptions)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('plantAccessToken', data.entities[0].access_token)
      getPlantDetails();
    })
    .catch(error => console.error("error: ", error));
      // alert('Error retrieving plant details. Please try again.');
  //};
}

function getPlantDetails() {
    // Plant Details API call
    const plantAccess = localStorage.getItem('plantAccessToken')

    let plantDetailHeader = new Headers();
    plantDetailHeader.append("Content-Type", "application/json");
    plantDetailHeader.append("Api-Key", apiKey);
    
    console.log(plantDetailHeader, 'plantDetailHeader')
    let detailRequestOptions = {
      method: 'GET',
      headers: plantDetailHeader,
      redirect: 'follow'
    };
  
    console.log(detailRequestOptions, 'detailRequestOptions')
    fetch(`https://plant.id/api/v3/kb/plants/${plantAccess}?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods&language=en`, detailRequestOptions)
    .then(response => response.json())
      .then(data => {
        const description = data.description.value || 'No description available.';
        const wateringInfo = data.watering.value|| 'No watering info available.';
        const propagationInfo = data.propagation_methods|| 'No propagation info available.';
        const edibleInfo = data.edibile_parts || 'No info on edible parts available.';
        const commonNames = data.common_names ? data.common_names.join(', ') : 'No common names available.';
  
        document.querySelector('.info-section .description').innerText = description;
        document.querySelector('.watering p').innerText = wateringInfo;
        document.querySelector('.propagation p').innerText = propagationInfo;
        document.querySelector('.edible p').innerText = edibleInfo;
        document.querySelector('.info-section .common-names').innerText = commonNames;
  
        // //saving vars if needed again
        // localStorage.setItem('description', description);
        // localStorage.setItem('wateringInfo', wateringInfo);
        // localStorage.setItem('sunlightInfo', sunlightInfo);
    })
      .catch(err => {
        console.error('Error:', err);
        // alert('Error retrieving plant details. Please try again.');
    });
}