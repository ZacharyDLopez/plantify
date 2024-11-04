document.getElementById('upload-btn').addEventListener('click', function() {
  document.getElementById('image-input').click();
});
//image upload handling
document.getElementById('image-input').addEventListener('change', function() {
  const file = this.files[0];

  if (!file) {
    console.log('No file selected');
    return;
  }

  
  document.getElementById('loading-screen').style.display = 'flex'; //display loading screen after img selection

  //convert image to base64 to be read by api
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    const imageBase64 = reader.result.split(',')[1];

    let uploadHeader = new Headers();
    uploadHeader.append("Api-Key","pqnFZtdUpFM1GIpzBbz060OXiMwJMcaFB9usrCRaHBzrv7yWLk");
    uploadHeader.append("Content-Type", "application/json");

    let rawUpload = JSON.stringify({
      "images": imageBase64,
      "similar_images" : true
    });

    let requestOptions = {
      method : 'POST',
      headers : uploadHeader,
      body : rawUpload,
      redirect : 'follow'
    }

    fetch("https://plant.id/api/v3/identification", requestOptions)
      .then(response => response.json())
      .then(data => {
        // let accessToken = data.accessToken
        console.log('SUCCESSFULL',data)
        document.getElementById('loading-screen').style.display = 'none';

        const suggestions = data.result.classification.suggestions;

        if (suggestions.length > 0) {
          const plantInfo = suggestions[0];

          //localstorage to persist across multiple html pages. (might need to check if we can get pruning and sunlight)
          localStorage.setItem('uploadedImage', reader.result);
          localStorage.setItem('plantName', plantInfo.name);
          localStorage.setItem('probability', plantInfo.probability);
          // localStorage.setItem('description', plantInfo.plant_details ? plantInfo.plant_details.description : "No description available.");
          // localStorage.setItem('wateringInfo', plantInfo.watering || "No watering info available.");
          // localStorage.setItem('sunlightInfo', plantInfo.sunlight || "No sunlight info available.");
          // localStorage.setItem('pruningInfo', plantInfo.pruning || "No pruning info available.");
          localStorage.setItem('plantAccessToken', data.access_token);

          window.location.href = '/identifed-page/plant-identified.html';
        } else {
          alert('No plant identified. Please try again.');
        }
      })
      .catch(err => {
        document.getElementById('loading-screen').style.display = 'none';
        console.error('Error:', err);
        alert('Error identifying plant. Please try again.');
      });
    };

    let detailsHeader = new Headers();
    detailsHeader.append("Content-Type", "application/json");
    detailsHeader.append("Api-Key", "pqnFZtdUpFM1GIpzBbz060OXiMwJMcaFB9usrCRaHBzrv7yWLk");

    let detailRequestOptions = {
      method : 'GET',
      headers : detailsHeader,
      redirect : 'follow'
    };

    fetch("https://plant.id/api/v3/kb/plants/ADQuTDRVfU1caQRidkdcbFlsZVVBdV1lBDVnUGJRaFk-?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods&language=en", detailRequestOptions)  
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        document.getElementById('loading-screen').style.display = 'none';
        console.error('Error:', err);
        alert('Error finding plant information. Please try again.');
      });

});
