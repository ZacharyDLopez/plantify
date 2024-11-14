let apiKey = "GOG9Ce5gxXFtJHnyTiB6t46i176OHoCLq3R2t98GQLcn4YTFiO"
// window.onload = function() {
//   //back button
//   document.getElementById('back-btn').addEventListener('click', function() {
//     window.location.href = '/home-page/home-page.html';
//     //Clear local storage
//     localStorage.removeItem('uploadedImage');
//     localStorage.removeItem('ScientificName');
//     localStorage.removeItem('plantAccessToken');
//     localStorage.removeItem('plantID');
//   });

//   const imageUrl = localStorage.getItem('uploadedImage');
//   const scientificName = localStorage.getItem('scientificName');
//   //const accessToken = localStorage.getItem('plantAccessToken');
//   const plantID = localStorage.getItem('plantID');

//   if (!plantID) {
//     alert('No token found. Please try uploading the image again.');
//     return;
//   };

//   document.getElementById('uploaded-image').src = imageUrl;
//   document.querySelector('.info-section h2').innerText = scientificName;

//   //second api call
//   let detailsHeader1 = new Headers();
//   detailsHeader1.append("Content-Type", "application/json");
//   detailsHeader1.append("Api-Key", apiKey);

//   let requestOptions1={
//     method: 'GET',
//     headers: detailsHeader1,
//     redirect: 'follow'
//   };

//   fetch(`https://plant.id/api/v3/kb/plants/name_search?q=${scientificName}`, requestOptions1)
//     .then(response => response.json())
//     .then(data => {
//       localStorage.setItem('plantAccessToken', data.entities[0].access_token)

//     })
//     .catch(error => console.error("error: ", error));
//     // alert('Error retrieving plant details. Please try again.');
//   };
  
//   const plantAccess = localStorage.getItem('plantAccessToken')

//   let detailsHeader2 = new Headers();
//   detailsHeader2.append("Content-Type", "application/json");
//   detailsHeader2.append("Api-Key", apiKey);
  
//   let requestOptions2={
//     method: 'GET',
//     headers: detailsHeader2,
//     redirect: 'follow'
//   };

//   fetch(`https://plant.id/api/v3/kb/plants/${plantAccess}?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods&language=en`, requestOptions2)
//   .then(response => response.json())
//     .then(data => {
  
//       const description = data.description || 'No description available.';
//       const wateringInfo = data.watering || 'No watering info available.';
//       const sunlightInfo = data.sunlight || 'No sunlight info available.';
//       const commonNames = data.common_names ? data.common_names.join(', ') : 'No common names available.';

//       document.querySelector('.info-section .description').innerText = description;
//       document.querySelector('.watering p').innerText = wateringInfo;
//       document.querySelector('.sunlight p').innerText = sunlightInfo;
//       document.querySelector('.info-section .common-names').innerText = commonNames;

//       // //saving vars if needed again
//       // localStorage.setItem('description', description);
//       // localStorage.setItem('wateringInfo', wateringInfo);
//       // localStorage.setItem('sunlightInfo', sunlightInfo);
//   })
//     .catch(err => {
//       console.error('Error:', err);
//       // alert('Error retrieving plant details. Please try again.');
//   });

window.onload = function() {
  //back button
  document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = '/home-page/home-page.html';
    localStorage.removeItem('uploadedImage');
    localStorage.removeItem('scientificName');
    localStorage.removeItem('plantAcessToken');
    localStorage.removeItem('plantID');
  });

  const imageUrl = localStorage.getItem('uploadedImage');
  const scientificName = localStorage.getItem('scientificName');
  //const accessToken = localStorage.getItem('plantAccessToken');
  const plantID = localStorage.getItem('plantID');

  if (!plantID) {
    alert('No token found. Please try uploading the image again.');
    return;
  };

  document.getElementById('uploaded-image').src = imageUrl;
  document.querySelector('.info-section h2').innerText = scientificName;

  //second api call
  let detailsHeader1 = new Headers();
  detailsHeader1.append("Content-Type", "application/json");
  detailsHeader1.append("Api-Key", apiKey);

  let requestOptions1={
    method: 'GET',
    headers: detailsHeader1,
    redirect: 'follow'
  };

  fetch(`https://plant.id/api/v3/kb/plants/name_search?q=${scientificName}`, requestOptions1)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('plantAccessToken', data.entities[0].access_token)

    })
    .catch(error => console.error("error: ", error));
    // alert('Error retrieving plant details. Please try again.');
  };
  
  const plantAccess = localStorage.getItem('plantAccessToken')

  let detailsHeader2 = new Headers();
  detailsHeader2.append("Content-Type", "application/json");
  detailsHeader2.append("Api-Key", apiKey);
  
  let requestOptions2={
    method: 'GET',
    headers: detailsHeader2,
    redirect: 'follow'
  };

  fetch(`https://plant.id/api/v3/kb/plants/${plantAccess}?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods&language=en`, requestOptions2)
  .then(response => response.json())
    .then(data => {
  
      const description = data.description.value || 'No description available.';
      const wateringInfo = data.watering || 'No watering info available.';
      const propagationInfo = data.propagation_methods || 'No propagation info available.';
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

