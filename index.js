//start change img (doctor icon) //

var options = {
  series: [44, 55, 13, 43, 22],
  chart: {
  width: 380,
  type: 'pie',
},
labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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

// var chart = new ApexCharts(document.querySelector("#chart"), options);
// chart.render();

function navigate(path){
  window.location = path;
}
function getAuthToken() {
  return localStorage.getItem("authToken");
}
function checkAuth(){
  if(localStorage.getItem("user-info")){
    return JSON.parse(localStorage.getItem("user-info"))
  }
  return null;
}
var authUser = document.querySelector("#auth-user");

async function logout() {
  const token = getAuthToken();
    try {
      const response = await fetch("https://ai-medicare.onrender.com/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: "",
      });
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      const responseData = await response.json();
      console.log(responseData);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user-info");
      
      window.location.replace("index.html");
    
    

    } catch (error) {
      showAlert('Error logging out');
    }
  }

(function(){
  if(checkAuth()){
    let username = checkAuth().name
    if(authUser){

      authUser.innerHTML = `
      <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle ss" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                ${username}
              </a>
              <ul class="dropdown-menu">
                <li id="logout">
                  <button onclick="logout()" class="dropdown-item  doctor">Logout 
                  </button>
                </li>
                
  
              </ul>
            </li>
      `
    }

  }else{
    if(authUser){
      authUser.innerHTML = `
      <li class="nav-item" id="signin">
              <a class="nav-link" href="login.html">Sign in</a>
            </li>
  
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle ss" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                JOIN US
              </a>
              <ul class="dropdown-menu">
                <li id="doctors"><a class="dropdown-item  doctor" href="doctor.html">Continue as doctor <img id="doctor"
                      src="assets/Group 426.png " alt="doctorImage"></a></li>
                <li id="patients"><a class="dropdown-item  patient" href="Patient.html">Continue as a patient <img
                      id="patient" src="assets/Group 427.png" alt="patientImage"> </a></li>
  
              </ul>
            </li>`

    }
  }
})()



var facebook = document.getElementById("doctors");

facebook?.addEventListener("mouseover", function setnewimg() {
  document.getElementById("doctor").src="assets/doc.png" ;
});
facebook?.addEventListener("mouseout", function set_defult_img() {
  document.getElementById("doctor").src = "assets/Group 426.png " ;
});

//start change img (patient icon) //

var facebook = document.getElementById("patients");
facebook?.addEventListener("mouseover", function setnewimg() {
  document.getElementById("patient").src="assets/pitatient.png" ;
});
facebook?.addEventListener("mouseout", function set_defult_img() {
  document.getElementById("patient").src = "assets/Group 427.png " ;
});

let go = document.getElementById("done");
go?.addEventListener("click",function(){
  window.location ="direction.html";
})

let signIn = document.getElementById("signin");
signIn?.addEventListener("click",function(){
  window.location ="login.html";
});




function togglePassword(targetId,buttonId) {
  var passwordField = document.getElementById(targetId);
  var toggleBtn = document.getElementById(buttonId);
console.log("passwordField: ",passwordField);
console.log("toggleBtn: ",toggleBtn);
  if (passwordField.type === "password") {
      passwordField.type = "text";
      toggleBtn.innerHTML = `<img src="/assets/eye-close.svg" alt="" class="w-100"/>`;
  } else {
      passwordField.type = "password";
      toggleBtn.innerHTML = `<img src="/assets/eye-open.svg" alt="" class="w-100"/>`;
  }
}


function makeCall(){
  window.open('tel:+2011288228462');
}


function nearbyHospitals() {
  window.open('https://www.google.com/maps/search/hospitals/');
}






function showAlert(message){
  const alertContainer = document.getElementById('alert-container')
  alertContainer.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
  ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
  
}