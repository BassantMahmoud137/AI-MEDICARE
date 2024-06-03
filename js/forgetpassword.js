const resetPasswordBTN = document.querySelector("#resetPasswordBTN")

const sendResetPassword = async () => {
    const email = document.querySelector('#email').value;
    const response = await fetch(`https://ai-medicare.onrender.com/api/users/forgotPassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (response.ok) {
        window.location ="ResetPassword.html";
    } else {
        alert(data.message);
    }
}

resetPasswordBTN.addEventListener('click', sendResetPassword)