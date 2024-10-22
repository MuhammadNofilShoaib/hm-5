// Get input elements
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var educationInput = document.getElementById('education');
var experienceInput = document.getElementById('experience');
var skillsInput = document.getElementById('skills');
var photoInput = document.getElementById('photo');
// Function to display the resume
function display() {
    var resumeDisplay = document.getElementById('resumeDisplay');
    var photoDisplay = document.getElementById('photoDisplay');
    var formSection = document.getElementById('form-section');
    var resumeSection = document.getElementById('resume-section');
    // Hide the form and show the resume
    formSection.style.display = 'none';
    resumeSection.style.display = 'block';
    // Generate the resume content
    resumeDisplay.innerHTML = "\n        <div class=\"resume\">\n            <h2 style=\"color: red; font-size: 60px;\">Resume</h2>\n            <h3 style=\"color: rgb(0, 123, 255);\">Personal Information</h3>\n            <p><strong>Name:</strong> ".concat(nameInput.value, "</p>\n            <p><strong>Email:</strong> ").concat(emailInput.value, "</p>\n            <p><strong>Phone No.:</strong> ").concat(phoneInput.value, "</p>\n            <h3 style=\"color: rgb(0, 123, 255);\">Education</h3>\n            <p>").concat(educationInput.value, "</p>\n            <h3 style=\"color: rgb(0, 123, 255);\">Experience</h3>\n            <p>").concat(experienceInput.value, "</p>\n            <h3 style=\"color: rgb(0, 123, 255);\">Skills</h3>\n            <p>").concat(skillsInput.value, "</p>\n        </div>\n    ");
    // Display the uploaded photo
    if (photoInput.files && photoInput.files.length > 0) {
        var file = photoInput.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            if ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) {
                photoDisplay.innerHTML = "<img src=\"".concat(e.target.result, "\" alt=\"Uploaded Photo\" style=\"width: 150px; height: 150px; border-radius: 50%; border: 4px solid #4a90e2; object-fit: cover; margin-bottom: 20px;\">");
            }
        };
        reader.readAsDataURL(file);
    }
    else {
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
function edit() {
    var formSection = document.getElementById('form-section');
    var resumeSection = document.getElementById('resume-section');
    // Show the form and hide the resume
    resumeSection.style.display = 'none';
    formSection.style.display = 'block';
    // Populate input fields with existing data
    var resumeData = localStorage.getItem('resume');
    if (resumeData) {
        var data = JSON.parse(resumeData);
        nameInput.value = data.name || '';
        emailInput.value = data.email || '';
        phoneInput.value = data.phone || '';
        educationInput.value = data.education || '';
        experienceInput.value = data.experience || '';
        skillsInput.value = data.skills || '';
    }
}
// Function to share the resume link
function shareResume() {
    var resumeData = localStorage.getItem('resume');
    var shareLinkElement = document.getElementById('shareLink');
    if (resumeData) {
        var resumeObject = JSON.parse(resumeData);
        var shareableLink = "".concat(window.location.href, "#resume=").concat(btoa(JSON.stringify(resumeObject)));
        shareLinkElement.style.display = 'block';
        shareLinkElement.innerHTML = "Share this link: <a href=\"".concat(shareableLink, "\" target=\"_blank\">").concat(shareableLink, "</a>");
    }
}
// Add event listeners to buttons
var submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', display);
var editButton = document.getElementById('editButton');
editButton.addEventListener('click', edit);
var printButton = document.getElementById('print');
printButton.addEventListener('click', function () {
    window.print(); // Call the print function
});
// Ensure the share button is added outside of the print function
var shareButton = document.getElementById('share');
shareButton.addEventListener('click', shareResume);
