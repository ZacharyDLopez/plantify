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

    fetch('https://api.plant.id/v2/identify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': 'rJHXP3dK2QOMZMmLq68PGc4ZrTE7JQ8Kalhry44oWE0mmOeS1u'
      },
      body: JSON.stringify({ //convert json to string using 'stringify' function
        images: [imageBase64],
        //organs: ["leaf"]
      })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('loading-screen').style.display = 'none';

      if (data.suggestions && data.suggestions.length > 0) {
        const plantInfo = data.suggestions[0];

        //localstorage to persist across multiple html pages. (might need to check if we can get pruning and sunlight)
        localStorage.setItem('uploadedImage', reader.result);
        localStorage.setItem('plantName', plantInfo.plant_name);
        localStorage.setItem('description', plantInfo.plant_details ? plantInfo.plant_details.description : "No description available.");
        localStorage.setItem('wateringInfo', plantInfo.watering || "No watering info available.");
        localStorage.setItem('sunlightInfo', plantInfo.sunlight || "No sunlight info available.");
        localStorage.setItem('pruningInfo', plantInfo.pruning || "No pruning info available.");

        window.location.href = 'plant-identified.html';
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
