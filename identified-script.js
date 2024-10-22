window.onload = function() {
    const imageUrl = localStorage.getItem('uploadedImage');
    const plantName = localStorage.getItem('plantName');
    const description = localStorage.getItem('description');
    const wateringInfo = localStorage.getItem('wateringInfo');
    const sunlightInfo = localStorage.getItem('sunlightInfo');
    const pruningInfo = localStorage.getItem('pruningInfo');
  
    document.getElementById('uploaded-image').src = imageUrl;
    document.querySelector('.info-section h2').innerText = plantName;
    document.querySelector('.info-section .description').innerText = description;
    document.querySelector('.watering p').innerText = wateringInfo;
    document.querySelector('.sunlight p').innerText = sunlightInfo;
    document.querySelector('.pruning p').innerText = pruningInfo;
  };
  