var options = {
  series: [75],
  chart: {
    height: 350,
    type: "radialBar",
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
      hollow: {
        margin: 0,
        size: "70%",
        background: "#fff",
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: "front",
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24,
        },
      },
      track: {
        background: "#fff",
        strokeWidth: "67%",
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35,
        },
      },

      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: "#888",
          fontSize: "17px",
        },
        value: {
          formatter: function (val) {
            return parseInt(val);
          },
          color: "#111",
          fontSize: "36px",
          show: true,
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: ["#ABE5A1"],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Percent"],
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

let calcBtn = document.querySelector(`#calculate`);

let genderInput = document.querySelector("#gender");
let heightInput = document.querySelector("#height");
let weightInput = document.querySelector("#weight");
let ageInput = document.querySelector("#age");
let activityLevelInput = document.querySelector("#activityLevel");
let resultSection = document.querySelector("#result-section");
// console.log(calcBtn);
calcBtn.addEventListener("click", function (e) {
  fetchBMR();
});

function getAuthToken() {
  return localStorage.getItem("authToken");
}

async function fetchBMR() {
  const gender = genderInput.value;
  const weight = weightInput.value;
  const height = heightInput.value;
  const age = ageInput.value;
  const activityLevel = activityLevelInput.value;
  const token = getAuthToken();

  try {
    const response = await fetch(
      `https://ai-medicare.onrender.com/api/patients/bmr?age=${age}&gender=${gender}&weight=${weight}&height=${height}&activityLevel=${activityLevel}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log({
      Authorization: `Bearer ${token}`,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch BMR data");
    }

    const data = await response.json();
    console.log(data);
    displayResult(data.bmr, data.tdee);
  } catch (error) {
    showAlert("Error fetching BMR data");
  }
}

function displayResult(BMR, tdee) {
  resultSection.classList.remove("d-none");
  resultSection.innerHTML = `
    <span class="py-3 mb-3"> ${BMR.value}: ${BMR.description} </span>
    <br/>
    <span class="py-3 mb-3"> ${tdee.value}: ${tdee.description} </span>
    `;
}
