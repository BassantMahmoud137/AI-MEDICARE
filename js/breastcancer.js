function getAuthToken() {
  return localStorage.getItem('authToken');
}

let resultSection = document.querySelector('#result-section');
const scrollHeight = document.body.scrollHeight;

const radiusMean = document.querySelector('#radiusMean');
const textureMean = document.querySelector('#textureMean');
const perimeterMean = document.querySelector('#perimeterMean');
const areaMean = document.querySelector('#areaMean');
const smoothnessMean = document.querySelector('#smoothnessMean');
const compactnessMean = document.querySelector('#compactnessMean');
const concavityMean = document.querySelector('#concavityMean');
const concaveMean = document.querySelector('#concaveMean');
const symmetryMean = document.querySelector('#symmetryMean');
const fractalMean = document.querySelector('#fractalMean');

const radiusSe = document.querySelector('#radiusSe');
const textureSe = document.querySelector('#textureSe');
const perimeterSe = document.querySelector('#perimeterSe');
const areaSe = document.querySelector('#areaSe');
const smoothnessSe = document.querySelector('#smoothnessSe');
const compactnessSe = document.querySelector('#compactnessSe');
const concavitySe = document.querySelector('#concavitySe');
const concaveSe = document.querySelector('#concaveSe');
const symmetrySe = document.querySelector('#symmetrySe');
const fractalSe = document.querySelector('#fractalSe');

const radiusWorst = document.querySelector('#radiusWorst');
const textureWorst = document.querySelector('#textureWorst');
const perimeterWorst = document.querySelector('#perimeterWorst');
const areaWorst = document.querySelector('#areaWorst');
const smoothnessWorst = document.querySelector('#smoothnessWorst');
const compactnessWorst = document.querySelector('#compactnessWorst');
const concavityWorst = document.querySelector('#concavityWorst');
const concaveWorst = document.querySelector('#concaveWorst');
const symmetryWorst = document.querySelector('#symmetryWorst');
const fractalWorst = document.querySelector('#fractalWorst');

const calculateBTN = document.querySelector('#calculate');

calculateBTN.addEventListener('click', async function () {
  console.log('clicked');
  await fetchBreastCancer();
});

async function fetchBreastCancer() {
  const token = getAuthToken();

  try {
    const payload = {
      radius_mean: +radiusMean.value,
      texture_mean: +textureMean.value,
      perimeter_mean: +perimeterMean.value,
      area_mean: +areaMean.value,
      smoothness_mean: +smoothnessMean.value,
      compactness_mean: +compactnessMean.value,
      concavity_mean: +concavityMean.value,
      'concave points_mean': +concaveMean.value,
      symmetry_mean: +symmetryMean.value,
      fractal_dimension_mean: +fractalMean.value,

      radius_se: +radiusSe.value,
      texture_se: +textureSe.value,
      perimeter_se: +perimeterSe.value,
      area_se: +areaSe.value,
      smoothness_se: +smoothnessSe.value,
      compactness_se: +compactnessSe.value,
      concavity_se: +concavitySe.value,
      'concave points_se': +concaveSe.value,
      symmetry_se: +symmetrySe.value,
      fractal_dimension_se: +fractalSe.value,

      radius_worst: +radiusWorst.value,
      texture_worst: +textureWorst.value,
      perimeter_worst: +perimeterWorst.value,
      area_worst: +areaWorst.value,
      smoothness_worst: +smoothnessWorst.value,
      compactness_worst: +compactnessWorst.value,
      concavity_worst: +concavityWorst.value,
      'concave points_worst': +concaveWorst.value,
      symmetry_worst: +symmetryWorst.value,
      fractal_dimension_worst: +fractalWorst.value,
    };

    console.log(payload);
    const response = await fetch(
      `https://ai-medicare.onrender.com/api/doctors/breast`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
    console.log({
      Authorization: `Bearer ${token}`,
    });
    if (!response.ok) {
      throw new Error(response);
    }

    const data = await response.json();
    console.log(data);
    // alert('Data fetched successfully');
    // alert(response.status);
    displayResult(data.prediction);
  } catch (error) {
    console.log(error.message);
    showAlert('Error fetching BMI data');
  }
}

function displayResult(result) {
  resultSection.classList.remove('d-none');
  resultSection.innerHTML = `
    <span>Prediction: ${result} </span>
    `;
  window.scrollTo(0, scrollHeight);
}
  