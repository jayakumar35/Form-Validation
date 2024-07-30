document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');
  
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (checkInputs()) {
            storeDetails();
            // collect form data
            const formData = new  URLSearchParams(new FormData(form)).toString();
            
            window.location.href = "details.html?" + formData; // Redirect to another page after successful validation
        }
    });
  
    function checkInputs() {
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const password2Value = password2.value.trim();
  
        let isValid = true;
  
        if (usernameValue === '') {
            setErrorFor(username, 'Username cannot be blank');
            isValid = false;
        } else {
            setSuccessFor(username);
        }
  
        if (emailValue === '') {
            setErrorFor(email, 'Email cannot be blank');
            isValid = false;
        } else if (!isEmail(emailValue)) {
            setErrorFor(email, 'Not a valid email');
            isValid = false;
        } else {
            setSuccessFor(email);
        }
  
        if (passwordValue === '') {
            setErrorFor(password, 'Password cannot be blank');
            isValid = false;
        } else {
            setSuccessFor(password);
        }
  
        if (password2Value === '') {
            setErrorFor(password2, 'Confirm password cannot be blank');
            isValid = false;
        } else if (passwordValue !== password2Value) {
            setErrorFor(password2, 'Passwords do not match');
            isValid = false;
        } else {
            setSuccessFor(password2);
        }
  
        return isValid;
    }
  
    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        small.innerText = message;
        formControl.className = 'form-control error';
    }
  
    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }
  
    function isEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/;
        return re.test(email);
    }
  
    function storeDetails() {
        const userDetails = {
            username: username.value.trim(),
            email: email.value.trim(),
            password: password.value.trim()
        };
        // Local Storege
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
  
        //Session Storege
        sessionStorage.setItem('userDetails',JSON.stringify(userDetails));
  
        //Cookies
        document.cookie =`username=${userDetails.username};path=/`;
        document.cookie =`email=${userDetails.email};path=/`;
        document.cookie =`passwoed=${userDetails.password};path=/`;
    }
  });