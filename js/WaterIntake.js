//  Charts
//  var options_1 = {
//   series: [
//     {
//       name: "Inflation",
//       data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
//     },
//   ],
//   chart: {
//    height: 350,
//     type: "bar",
//     toolbar: {
//       show: false,
//     },
//   },
//   plotOptions: {
//     bar: {
//       borderRadius: 10,
//       dataLabels: {
//         position: "top", // top, center, bottom
//       },
//     },
//   },
//   dataLabels: {
//     enabled: true,
//     formatter: function (val) {
//       return val + "%";
//     },
//     offsetY: -20,
//     style: {
//       fontSize: "12px",
//       colors: ["#304758"],
//     },
//   },

//   xaxis: {
//     categories: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     position: "top",
//     axisBorder: {
//       show: false,
//     },
//     axisTicks: {
//       show: false,
//     },
//     crosshairs: {
//       fill: {
//         type: "gradient",
//         gradient: {
//           colorFrom: "#D8E3F0",
//           colorTo: "#BED1E6",
//           stops: [0, 100],
//           opacityFrom: 0.4,
//           opacityTo: 0.5,
//         },
//       },
//     },
//     tooltip: {
//       enabled: true,
//     },
//   },
//   yaxis: {
//     axisBorder: {
//       show: false,
//     },
//     axisTicks: {
//       show: false,
//     },
//     labels: {
//       show: false,
//       formatter: function (val) {
//         return val + "%";
//       },
//     },
//   },
//   title: {
//     text: "2022",
//     floating: true,
//     offsetY: 330,
//     align: "center",
//     style: {
//       color: "#444",
//     },
//   },
// };
// var options_2 = {
//   series: [
//     {
//       name: "Inflation",
//       data: [44, 55, 41, 67, 22, 43],
//     },
//   ],
//   chart: {
//     height: 350,
//     type: "bar",
//     toolbar: {
//       show: false,
//     },
//   },
//   plotOptions: {
//     bar: {
//       borderRadius: 10,
//       dataLabels: {
//         // position: 'top', // top, center, bottom
//       },
//     },
//   },
//   dataLabels: {
//     enabled: true,
//     formatter: function (val) {
//       return val + "%";
//     },
//     offsetY: -20,
//     style: {
//       fontSize: "12px",
//       colors: ["#304758"],
//     },
//   },

//   xaxis: {
//     categories: ["Jan'11", "02Jan", "03Jan", "04Jan", "05Jan", "06Jan"],
//     position: "bottom",
//     axisBorder: {
//       show: false,
//     },
//     axisTicks: {
//       show: false,
//     },
//     crosshairs: {
//       fill: {
//         type: "gradient",
//         gradient: {
//           colorFrom: "#D8E3F0",
//           colorTo: "#BED1E6",
//           stops: [0, 100],
//           opacityFrom: 0.4,
//           opacityTo: 0.5,
//         },
//       },
//     },
//     tooltip: {
//       enabled: true,
//     },
//   },
//   yaxis: {
//     axisBorder: {
//       show: false,
//     },
//     axisTicks: {
//       show: false,
//     },
//     labels: {
//       show: false,
//       formatter: function (val) {
//         return val + "%";
//       },
//     },
//   },
// };

// var chart_1 = new ApexCharts(document.querySelector("#chart_1"), options_1);
// var chart_2 = new ApexCharts(document.querySelector("#chart_2"), options_2);
// chart_1.render();
// chart_2.render();

// function getAuthToken() {
//   return localStorage.getItem("authToken");
// }

// async function fetchWaterIntake() {
//   // const weight = weightInput.value;
//   // const activityLevel = activityLevelInput.value;
//   const token = getAuthToken();

//   try {
//     const response = await fetch(
//       `https://ai-medicare.onrender.com/api/patients/waterIntake?weight=${70}&activityLevel=${'sedentary'}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log({
//       Authorization: `Bearer ${token}`,
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch Water Intake data");
//     }

//     const data = await response.json();
//     console.log(data);
//     // displayResult(data.BMI, data.weightStatus);
//   } catch (error) {
//     showAlert("Error fetching Water Intake data");
//   }
// }
// // fetchWaterIntake()