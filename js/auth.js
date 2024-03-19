var loginUsername = document.querySelector("#username");
var loginEmail = document.querySelector("#email");
var loginPassword = document.querySelector("#password");
var loginCPassword = document.querySelector("#c_password");
var loginButton = document.querySelector("#loginButton");
var signUpDoctorButton = document.querySelector("#signUpDoctorButton");
var signUpPatientButton = document.querySelector("#signUpPatientButton");

function getAuthToken() {
  return localStorage.getItem("authToken");
}
async function login(email, password) {
  const loginData = {
    email,
    password,
  };

  try {
    const response = await fetch(
      "https://ai-medicare.onrender.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to login");
    }
    

    const responseData = await response.json();
    console.log(responseData);
    console.log("token:  ", responseData.token);
    // console.log("user:  ",responseData?.data?.user);
    localStorage.setItem("authToken", responseData.token);
    const role = responseData?.data?.user?.role;
    localStorage.setItem("user-info", JSON.stringify(responseData?.data?.user));
    if (role === "doctor") {
      window.location = "Disease.html";
    } else if (role === "patient") {
      window.location = "HealthCalculators.html";
    } else {
      window.location = "index.html";
    }

    
  } catch (error) {
    showAlert("Error logging in");
  }
  
}

async function signupAsPatient(name, email, password, passwordConfirm) {
  const signupData = {
    name: name,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  };

  try {
    const response = await fetch(
      "https://ai-medicare.onrender.com/api/users/signupAsPatient",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    const responseData = await response.json();
    console.log(responseData);
    console.log("token:  ", responseData.token);
    // console.log("user:  ",responseData?.data?.user);
    localStorage.setItem("authToken", responseData.token);
    const role = responseData?.data?.user?.role;
    localStorage.setItem("user-info", JSON.stringify(responseData?.data?.user));
    
    if (role === "doctor") {
      window.location = "Disease.html";
    } else if (role === "patient") {
      window.location = "HealthCalculators.html";
    } else {
      window.location = "index.html";
    }
  } catch (error) {
    showAlert("Error signing up");
  }
}
async function signupAsDoctor(name, email, password, passwordConfirm) {
  const signupData = {
    name: name,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  };

  try {
    const response = await fetch(
      "https://ai-medicare.onrender.com/api/users/signupAsDoctor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    const responseData = await response.json();
    console.log(responseData);
    console.log("token:  ", responseData.token);
    // console.log("user:  ",responseData?.data?.user);
    localStorage.setItem("authToken", responseData.token);
    const role = responseData?.data?.user?.role;
    localStorage.setItem("user-info", JSON.stringify(responseData?.data?.user));
    if (role === "doctor") {
      window.location = "Disease.html";
    } else if (role === "patient") {
      window.location = "HealthCalculators.html";
    } else {
      window.location = "index.html";
    }
    
  } catch (error) {
    showAlert("Error signing up");
  }
}

loginButton?.addEventListener("click", function () {
  // login("patient@gmail.com","pass1234")
  login(loginEmail.value, loginPassword.value);
});
signUpPatientButton?.addEventListener("click", function () {
  signupAsPatient(
    loginUsername.value,
    loginEmail.value,
    loginPassword.value,
    loginCPassword.value
  );
});
signUpDoctorButton?.addEventListener("click", function () {
  signupAsDoctor(
    loginUsername.value,
    loginEmail.value,
    loginPassword.value,
    loginCPassword.value
  );
});
