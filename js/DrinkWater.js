
// Charts
const scrollHeight = document.body.scrollHeight;
var options = {
  series: [44,20],
  chart: {
  type: 'donut',
},
dataLabels: {
  enabled: false,
  
  
},
plotOptions: {
  pie: {
    donut: {
      labels: {
        show: true,
        name: {
          
        },
        value: {
          
        }
      }
    }
  }
},
responsive: [{
  breakpoint: 480,
  options: {
    chart: {
      width: 200
    },
    legend: {
      position: 'bottom'
    }
  }
}]
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render(); 



