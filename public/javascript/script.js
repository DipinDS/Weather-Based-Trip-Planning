// Banner Slider
// console.log("script.js is loaded");
const slider = document.querySelector('.slider');
// const sliderWidth = slider.clientWidth;
let currentSlide = 1;

// function scrollToNextSlide() {
//     currentSlide++;
//     if (currentSlide > 6) {
//         currentSlide = 1;
//     }
//     const scrollAmount = (currentSlide - 1) ;
//     slider.scroll({
//         left: scrollAmount,
//         behavior: 'smooth'
//     });
// }

// setInterval(scrollToNextSlide, 2000); // Scroll every 2 seconds

// Image change on edit location when new image is updated

function viewImage(event) {
    document.getElementById('imgView').src = URL.createObjectURL(event.target.files[0])
}


// Validate signup form
function validateForm() {
    // Call your validation functions here
    var isPasswordValid = validatePassword();
    var isConfirmPasswordValid = validateConfirmPassword();

    // Return false if any validation fails
    return isPasswordValid && isConfirmPasswordValid;
}

// Password Validation
function validatePassword() {
    var passwordInput = document.getElementById('password');
    var password = passwordInput.value;

    // Define the regex patterns for each criteria
    var minLength = 8;
    var uppercaseRegex = /[A-Z]/;
    var lowercaseRegex = /[a-z]/;
    var digitRegex = /\d/;
    var specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Check each criteria
    var isValid = true;
    if (password.length < minLength) {
      isValid = false;
      displayError("Password must be at least 8 characters long");
    } else if (!uppercaseRegex.test(password)) {
      isValid = false;
      displayError("Password must contain at least one uppercase letter");
    } else if (!lowercaseRegex.test(password)) {
      isValid = false;
      displayError("Password must contain at least one lowercase letter");
    } else if (!digitRegex.test(password)) {
      isValid = false;
      displayError("Password must contain at least one digit");
    } else if (!specialCharRegex.test(password)) {
      isValid = false;
      displayError("Password must contain at least one special character");
    }

    // Clear error message if the password is valid
    if (isValid) {
      clearError();
    }
  }

  function displayError(message) {
    var errorDiv = document.getElementById('passwordError');
    errorDiv.textContent = message;
  }

  function clearError() {
    var errorDiv = document.getElementById('passwordError');
    errorDiv.textContent = '';
  }


// Confirm Password
function validateConfirmPassword() {
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirmPassword');
    var confirmPassword = confirmPasswordInput.value;

    var password = passwordInput.value;

    if (password !== confirmPassword) {
      displayConfirmPasswordError("Passwords do not match");
    } else {
      clearConfirmPasswordError();
    }
  }

  function displayConfirmPasswordError(message) {
    var errorDiv = document.getElementById('confirmPasswordError');
    errorDiv.textContent = message;
  }

  function clearConfirmPasswordError() {
    var errorDiv = document.getElementById('confirmPasswordError');
    errorDiv.textContent = '';
  }

// Search Box related
// └─> code written in the user-header file






// feedback popup
function submitFeedback() {
    alert("Feedback sent successfully")
    setTimeout(function () {
        location.reload();
    }, 10);
}

// suggestion popup
function submitSuggestion() {
    alert("Suggestion sent successfully")
    setTimeout(function () {
        location.reload();
    }, 10);
}

