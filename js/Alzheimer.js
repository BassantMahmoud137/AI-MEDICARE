let resultSection = document.querySelector('#result-section');

document
  .getElementById('imageForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('image', file);

    fetch('https://gibbon-skilled-allegedly.ngrok-free.app/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // assuming API returns JSON
        } else {
          throw new Error('Error uploading image');
        }
      })
      .then((data) => {
        // Handle the API response data here
        // console.log('Predection:', data.prediction);
        displayResult(data);
        // Example: Display a success message
        //   alert('Image uploaded successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        // Example: Display an error message
        alert('Error uploading image');
      });
  });

function displayResult(data) {
  resultSection.classList.remove('d-none');
  resultSection.innerHTML = `
    <span class="py-3 mb-3"> Predection: ${data.prediction}</span>
    `;
}