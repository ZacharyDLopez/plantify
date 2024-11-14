let apiKey = "GOG9Ce5gxXFtJHnyTiB6t46i176OHoCLq3R2t98GQLcn4YTFiO"

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
    uploadHeader.append("Api-Key",apiKey);
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
        //let accessToken = data.access_token
        document.getElementById('loading-screen').style.display = 'none';

        const suggestions = data.result.classification.suggestions;

        if (suggestions.length > 0) {
          const plantInfo = suggestions[0];

          //localstorage to persist across multiple html pages. (might need to check if we can get pruning and sunlight)
          localStorage.setItem('uploadedImage', reader.result);
          localStorage.setItem('scientificName', plantInfo.name);
          localStorage.setItem('probability', plantInfo.probability);
          localStorage.setItem('description', plantInfo.plant_details ? plantInfo.plant_details.description : "No description available.");
          localStorage.setItem('plantID', data.id);
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
});