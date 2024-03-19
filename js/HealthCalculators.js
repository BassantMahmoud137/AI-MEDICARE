const symptoms = document.getElementById('symptoms')
async function fetchSymptoms() {
    const token = getAuthToken();
  
    try {
      const response = await fetch(
        `https://ai-medicare.onrender.com/api/patients/symptoms`,
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
        throw new Error("Failed to fetch Symptoms data");
      }
  
      const data = await response.json();
      console.log(data);
      displySymptoms(data.symptoms)
    } catch (error) {
        showAlert("Error fetching Symptoms data");
    }
  }

function displySymptoms(arr) {
    let content = ``
    for(let i =0;i< arr.length ;i++){
        content += `
        <div class="">
            <p>${arr[i].Name}</p>
        </div>
        `
    }
    symptoms.classList.remove("d-none");
    symptoms.innerHTML = content;
    
  }