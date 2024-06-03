async function fetchSymptoms() {  
    try {
      const response = await fetch(
        `https://ai-medicare.onrender.com/api/patients/symptoms`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzUxM2UwZWUyY2E1ZTllOWMzNDhlNSIsImlhdCI6MTcxNjA5MTYyOSwiZXhwIjoxNzIzODY3NjI5fQ.68InNboZqmlnQXfKEIuIzq6dPAiPMvIiaSgA2Bq4agY  `,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Symptoms data");
      }
  
      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
        console.log(error.message);
    }
}

const getSymptomsDiagnosis = async () => {

    const age = +document.querySelector('#age').value;
    const gender = document.querySelector('#gender').value.toLowerCase();
    let symptoms = $('#symptoms-dropdown').val();
    symptoms = symptoms.map(symptom => +symptom);

    console.log(age, gender, symptoms);

    try{
        const response = await fetch(
            `https://ai-medicare.onrender.com/api/patients/diagnosis?year_of_birth=${age}&gender=${gender}&symptoms=[${symptoms.join(',')}]`,
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzUxM2UwZWUyY2E1ZTllOWMzNDhlNSIsImlhdCI6MTcxNjA5NTgyMywiZXhwIjoxNzIzODcxODIzfQ.Ba2U_YyGkYTrlvv7SZ0wNaletzAwpqMFCqU8POWaBnU`
                }
            }
        )
    
        if (!response.ok) {
            throw new Error("Failed to fetch Diagnosis data");
        }
    
        const data = await response.json();

        handleDiagnosisResponse(data.diagnosis);
        console.log(data);
    }catch(error){
        console.log(error.message);
    }
    
}




const handleDiagnosisResponse = (diagnosis) => {
    const diagnosisDiv = document.querySelector('#diagnosis-section');
    diagnosisDiv.classList.remove('d-none');
    const diagnosisForm = document.querySelector('#symptoms-form');
    if (diagnosisForm) {
        diagnosisForm.classList.add('d-none');
    }

    // Clear previous diagnosis details
    diagnosisDiv.innerHTML = '';

    diagnosis.forEach((diag, index) => {
        const div = document.createElement('div');
        div.classList.add('card', 'mb-3');
        div.innerHTML = `
            <div class="card-header">
                <h5 class="card-title">${diag.Issue.Name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Ranking: ${diag.Issue.Ranking}</h6>
            </div>
            <div class="card-body">
                <p class="card-text">ICD: ${diag.Issue.Icd}</p>
                <p class="card-text">Accuracy: ${diag.Issue.Accuracy}%</p>
                <p class="card-text">ICD Name: ${diag.Issue.IcdName}</p>
                <p class="card-text">Professional Name: ${diag.Issue.ProfName}</p>
                <p class="card-text">Specialisations:</p>
                <ul>
                    ${diag.Specialisation.map(spec => `<li>${spec.Name}</li>`).join('')}
                </ul>
                <button class="btn btn-primary view-issue-btn" data-index="${index}">View Issue</button>
            </div>
        `;
        diagnosisDiv.appendChild(div);
    });

    // Attach event listener to the "View Issue" buttons
    document.querySelectorAll('.view-issue-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            loadIssueDetails(diagnosis[index].Issue.ID);
        });
    });
};

const loadIssueDetails = (issueId) => {
    console.log('Loading issue details:', issueId);

    fetch(`https://ai-medicare.onrender.com/api/patients/issue?issueId=${issueId}`,
    {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzUxM2UwZWUyY2E1ZTllOWMzNDhlNSIsImlhdCI6MTcxNjA5NTgyMywiZXhwIjoxNzIzODcxODIzfQ.Ba2U_YyGkYTrlvv7SZ0wNaletzAwpqMFCqU8POWaBnU`
        }
    }
    )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayIssuePopup(data.issue);
        })
        .catch(error => {
            console.error('Error fetching issue details:', error);
        });
};


const displayIssuePopup = (issue) => {
    const issueDetailsDiv = document.querySelector('#issue-details');
    issueDetailsDiv.innerHTML = `
        <h3>${issue.Name}</h3>
        <p><strong>Description:</strong> ${issue.Description}</p>
        <p><strong>Short Description:</strong> ${issue.DescriptionShort}</p>
        <p><strong>Medical Condition:</strong> ${issue.MedicalCondition}</p>
        <p><strong>Professional Name:</strong> ${issue.ProfName}</p>
        <p><strong>Synonyms:</strong> ${issue.Synonyms}</p>
        <p><strong>Treatment Description:</strong> ${issue.TreatmentDescription}</p>
    `;
    
    // Show the modal
    $('#issue-popup').modal('show');
};

onload = async () => {
    $('#symptoms-dropdown').select2({
        placeholder: 'Select an option'
    });
    
    const response = await fetchSymptoms();
    const symptoms = response.symptoms;

    for(const symptom of symptoms) {
        const option = document.createElement('option');
        option.value = symptom.ID;
        option.innerText = symptom.Name;
        document.querySelector('#symptoms-dropdown').appendChild(option);
    }

    const calcBtn = document.querySelector(`#calculate`);
    calcBtn.addEventListener('click', getSymptomsDiagnosis);
}
