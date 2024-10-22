// Get input elements
const nameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const phoneInput = document.getElementById('phone') as HTMLInputElement;
const educationInput = document.getElementById('education') as HTMLInputElement;
const experienceInput = document.getElementById('experience') as HTMLInputElement;
const skillsInput = document.getElementById('skills') as HTMLInputElement;
const photoInput = document.getElementById('photo') as HTMLInputElement;

// Function to display the resume
function display(): void {
    const resumeDisplay = document.getElementById('resumeDisplay') as HTMLElement;
    const photoDisplay = document.getElementById('photoDisplay') as HTMLElement;
    const formSection = document.getElementById('form-section') as HTMLElement;
    const resumeSection = document.getElementById('resume-section') as HTMLElement;

    // Hide the form and show the resume
    formSection.style.display = 'none';
    resumeSection.style.display = 'block';

    // Generate the resume content
    resumeDisplay.innerHTML = `
        <div class="resume">
            <h2 style="color: red; font-size: 60px;">Resume</h2>
            <h3 style="color: rgb(0, 123, 255);">Personal Information</h3>
            <p><strong>Name:</strong> ${nameInput.value}</p>
            <p><strong>Email:</strong> ${emailInput.value}</p>
            <p><strong>Phone No.:</strong> ${phoneInput.value}</p>
            <h3 style="color: rgb(0, 123, 255);">Education</h3>
            <p>${educationInput.value}</p>
            <h3 style="color: rgb(0, 123, 255);">Experience</h3>
            <p>${experienceInput.value}</p>
            <h3 style="color: rgb(0, 123, 255);">Skills</h3>
            <p>${skillsInput.value}</p>
        </div>
    `;

    // Display the uploaded photo
    if (photoInput.files && photoInput.files.length > 0) {
        const file = photoInput.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            if (e.target?.result) {
                photoDisplay.innerHTML = `<img src="${e.target.result}" alt="Uploaded Photo" style="width: 150px; height: 150px; border-radius: 50%; border: 4px solid #4a90e2; object-fit: cover; margin-bottom: 20px;">`;
            }
        };
        reader.readAsDataURL(file);
    } else {
        photoDisplay.innerHTML = "<p>No photo uploaded</p>";
    }

    // Store resume data in localStorage
    localStorage.setItem('resume', JSON.stringify({ 
        name: nameInput.value, 
        email: emailInput.value, 
        phone: phoneInput.value, 
        education: educationInput.value, 
        experience: experienceInput.value, 
        skills: skillsInput.value 
    }));
}

// Function to edit the resume
function edit(): void {
    const formSection = document.getElementById('form-section') as HTMLElement;
    const resumeSection = document.getElementById('resume-section') as HTMLElement;

    // Show the form and hide the resume
    resumeSection.style.display = 'none';
    formSection.style.display = 'block';

    // Populate input fields with existing data
    const resumeData = localStorage.getItem('resume');
    if (resumeData) {
        const data = JSON.parse(resumeData);
        nameInput.value = data.name || '';
        emailInput.value = data.email || '';
        phoneInput.value = data.phone || '';
        educationInput.value = data.education || '';
        experienceInput.value = data.experience || '';
        skillsInput.value = data.skills || '';
    }
}

// Function to share the resume link
function shareResume(): void {
    const resumeData = localStorage.getItem('resume');
    const shareLinkElement = document.getElementById('shareLink') as HTMLElement;

    if (resumeData) {
        const resumeObject = JSON.parse(resumeData);
        const shareableLink = `${window.location.href}#resume=${btoa(JSON.stringify(resumeObject))}`;
        shareLinkElement.style.display = 'block';
        shareLinkElement.innerHTML = `Share this link: <a href="${shareableLink}" target="_blank">${shareableLink}</a>`;
    }
}

// Add event listeners to buttons
const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
submitButton.addEventListener('click', display);

const editButton = document.getElementById('editButton') as HTMLButtonElement;
editButton.addEventListener('click', edit);

const printButton = document.getElementById('print') as HTMLButtonElement;
printButton.addEventListener('click', function() {
    window.print(); // Call the print function
});

// Ensure the share button is added outside of the print function
const shareButton = document.getElementById('share') as HTMLButtonElement;
shareButton.addEventListener('click', shareResume);

