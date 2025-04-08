// ....................................signup...................................

// DOM Elements
const signupForm = document.getElementById('signupForm');

// Signup Form Submission
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const mobileNo = document.getElementById('mobileNo').value;
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('fullName').value;
    const username = document.getElementById('username').value;

    // Simple client-side validation
    if (!mobileNo || !password || !fullName || !username) {
      alert('Please fill in all fields');
      return;
    }

    // Mobile number validation (simple 10-digit check)
    if (!/^\d{10}$/.test(mobileNo)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    // Password length check
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      // Show loading state
      const submitBtn = signupForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Signing Up...';

      // Make API request
      const response = await fetch('http://127.0.0.1:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ mobileNo, password, fullName, username }),
      });

      const data = await response.json();

      if (data.success) {
        // Success - redirect to dashboard or profile page
        window.location.href = 'loginathlify.html';
      } else {
        // Show error message
        alert(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during signup. Please try again.');
    } finally {
      // Reset button state
      const submitBtn = signupForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign Up';
      }
    }
  });
}

// Utility function to check authentication status (can be used on other pages)
async function checkAuth() {
  try {
    const response = await fetch('http://localhost:5000/api/users/profile', {
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('User is authenticated:', data.user);
      return data.user;
    } else {
      // If not authenticated and not on login/signup page, redirect to login
      if (!window.location.pathname.includes('login') && 
          !window.location.pathname.includes('signup')) {
        window.location.href = '/loginathlify.html';
      }
      return null;
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return null;
  }
}

// You can call checkAuth() on pages that require authentication
// For example, in dashboard.html:
// document.addEventListener('DOMContentLoaded', async () => {
//   const user = await checkAuth();
//   if (!user) return;
//   // Update UI with user data
// });


// ...............................login.............................

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        // Clear previous messages
        messageDiv.textContent = '';
        messageDiv.className = 'error-message';
  
        // Disable button during request
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';
  
        try {
          const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Important for cookies
            body: JSON.stringify({ username, password }),
          });
  
          const data = await response.json();
  
          if (data.success) {
            messageDiv.textContent = 'Login successful! Redirecting...';
            messageDiv.className = 'success-message';
            
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify({
                id: data.user.id,
                username: data.user.username,
                fullName: data.user.fullName
                // Never store tokens or sensitive data here!
              }));
                          
            // Redirect to dashboard or home page after 1 second
            setTimeout(() => {
              window.location.href = 'athlify.html';
            }, 1000);
          } else {
            messageDiv.textContent = data.message || 'Login failed';
          }
        } catch (error) {
          console.error('Login error:', error);
          messageDiv.textContent = 'An error occurred during login. Please try again.';
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Login';
        }
      });
    }
  });
  
  // Utility function to check if user is logged in (for other pages)
  async function checkAuth() {
    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        return data.user;
      } else {
        // Redirect to login if not authenticated
        if (!window.location.pathname.includes('loginathlify.html') && 
            !window.location.pathname.includes('signupathlify.html')) {
          window.location.href = 'loginathlify.html';
        }
        return null;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      return null;
    }
  }