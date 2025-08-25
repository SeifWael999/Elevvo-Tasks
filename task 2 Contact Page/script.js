// DOM elements
const contactForm = document.getElementById('contactForm');

// Form fields
const formFields = {
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
};

// Error message elements
const errorElements = {
    fullName: document.getElementById('fullNameError'),
    email: document.getElementById('emailError'),
    subject: document.getElementById('subjectError'),
    message: document.getElementById('messageError')
};

// Validation patterns
const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    fullName: /^[a-zA-Z\s]{2,50}$/,
    subject: /^.{5,100}$/,
    message: /^.{10,1000}$/
};

// Validation messages
const validationMessages = {
    fullName: {
        required: 'Full name is required',
        invalid: 'Please enter a valid name (2-50 characters, letters only)',
        tooShort: 'Name must be at least 2 characters long',
        tooLong: 'Name cannot exceed 50 characters'
    },
    email: {
        required: 'Email address is required',
        invalid: 'Please enter a valid email address'
    },
    subject: {
        required: 'Subject is required',
        tooShort: 'Subject must be at least 5 characters long',
        tooLong: 'Subject cannot exceed 100 characters'
    },
    message: {
        required: 'Message is required',
        tooShort: 'Message must be at least 10 characters long',
        tooLong: 'Message cannot exceed 1000 characters'
    }
};

// Initialize form
function initForm() {
    // Add event listeners to form fields
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        
        // Real-time validation on input
        field.addEventListener('input', () => {
            validateField(fieldName, field.value);
            updateFieldStyle(fieldName, isValidField(fieldName, field.value));
        });
        
        // Clear error on focus
        field.addEventListener('focus', () => {
            clearFieldError(fieldName);
            updateFieldStyle(fieldName, true);
        });
        
        // Validate on blur
        field.addEventListener('blur', () => {
            validateField(fieldName, field.value);
            updateFieldStyle(fieldName, isValidField(fieldName, field.value));
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', handleFormSubmission);
}

// Validate individual field
function validateField(fieldName, value) {
    const errorElement = errorElements[fieldName];
    let isValid = true;
    let errorMessage = '';
    
    // Check if required
    if (!value.trim()) {
        isValid = false;
        errorMessage = validationMessages[fieldName].required;
    } else {
        // Field-specific validation
        switch (fieldName) {
            case 'fullName':
                if (!validationPatterns.fullName.test(value.trim())) {
                    isValid = false;
                    if (value.trim().length < 2) {
                        errorMessage = validationMessages.fullName.tooShort;
                    } else if (value.trim().length > 50) {
                        errorMessage = validationMessages.fullName.tooLong;
                    } else {
                        errorMessage = validationMessages.fullName.invalid;
                    }
                }
                break;
                
            case 'email':
                if (!validationPatterns.email.test(value.trim())) {
                    isValid = false;
                    errorMessage = validationMessages.email.invalid;
                }
                break;
                
            case 'subject':
                if (value.trim().length < 5) {
                    isValid = false;
                    errorMessage = validationMessages.subject.tooShort;
                } else if (value.trim().length > 100) {
                    isValid = false;
                    errorMessage = validationMessages.subject.tooLong;
                }
                break;
                
            case 'message':
                if (value.trim().length < 10) {
                    isValid = false;
                    errorMessage = validationMessages.message.tooShort;
                } else if (value.trim().length > 1000) {
                    isValid = false;
                    errorMessage = validationMessages.message.tooLong;
                }
                break;
        }
    }
    
    // Display error message
    if (!isValid) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
    } else {
        clearFieldError(fieldName);
    }
    
    return isValid;
}

// Check if field is valid
function isValidField(fieldName, value) {
    if (!value.trim()) return true; // Don't show error state for empty fields until validation
    return validateField(fieldName, value);
}

// Clear field error
function clearFieldError(fieldName) {
    errorElements[fieldName].textContent = '';
    errorElements[fieldName].style.display = 'none';
}

// Update field visual style
function updateFieldStyle(fieldName, isValid) {
    const field = formFields[fieldName];
    field.classList.remove('error', 'success');
    
    if (field.value.trim()) {
        if (isValid) {
            field.classList.add('success');
        } else {
            field.classList.add('error');
        }
    }
}

// Validate entire form
function validateForm() {
    let isValid = true;
    
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        if (!validateField(fieldName, field.value)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return false;
    }
    
    // Show alert
    alert('Message sent successfully');
    
    // Reset form
    resetForm();
}



// Reset form
function resetForm() {
    contactForm.reset();
    
    // Clear all error messages and styles
    Object.keys(formFields).forEach(fieldName => {
        clearFieldError(fieldName);
        updateFieldStyle(fieldName, true);
    });
}

// Initialize form when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
} else {
    initForm();
}

