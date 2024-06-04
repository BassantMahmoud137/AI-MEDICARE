const scrollHeight = document.body.scrollHeight;
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

function getAuthToken() {
  return localStorage.getItem("authToken");
}
let heightInput = document.querySelector("#height");
let weightInput = document.querySelector("#weight");
let calculateBTN = document.querySelector("#calculate");
let resultSection = document.querySelector("#result-section");



calculateBTN.addEventListener("click", function () {
  fetchBMI();
  
});

async function fetchBMI() {
  const weight = weightInput.value;
  const height = heightInput.value;
  const token = getAuthToken();

  try {
    const response = await fetch(
      `https://ai-medicare.onrender.com/api/patients/bmi?weight=${weight}&height=${height}`,
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
      throw new Error("Failed to fetch BMI data");
    }

    const data = await response.json();
    console.log(data);
    displayResult(data.BMI,data.weightStatus);
  } catch (error) {
    showAlert("Error fetching BMI data");
  }
}

function displayResult(BMI, weightStatus) {
  resultSection.classList.remove("d-none");
  resultSection.innerHTML = `
  <span class="py-3"> BMI: ${BMI} </span>
  <br/>
  <span>Weight Status: ${weightStatus}</span>
  `;
  window.scrollTo(0, scrollHeight);
}
