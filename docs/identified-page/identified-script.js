import config from '/config.js';
 //let apiKey = config.apiKey;
 let apiKey = null;


//Working API Calls
window.onload = function() {
  //back button
  document.getElementById('back-btn').addEventListener('click', function() {
    window.location.replace('../home-page/index.html');
    console.log(window)
    console.log(window.location)
    localStorage.clear();
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
      document.getElementById('loading-screen').style.display = 'flex'; 
      //display loading screen after img selection
    })
    .catch(err => {
      console.error('Error:', err);
      // alert('Error retrieving plant details. Please try again.');
  });
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
        const wateringInfo = data.watering ? `Watering frequency per week: min ${data.watering.min} times, max ${data.watering.max} times`
        : "No watering info available.";
        const propagationInfo = data.propagation_methods ? data.propagation_methods.join(", ") : "No propagation methods available.";
        const edibleInfo = data.edible_parts ? data.edible_parts.join(", ") : "No edible parts available.";
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