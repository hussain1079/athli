// // JavaScript to handle profile update
// const profileLink = document.getElementById('profile-link');
// const profileForm = document.getElementById('profile-form');
// const updateProfileForm = document.getElementById('update-profile-form');
// const usernameElement = document.getElementById('username');

// const { logout } = require("../backend/controllers/userController");

// // Show profile form when "Profile" link is clicked
// profileLink.addEventListener('click', (e) => {
//   e.preventDefault();
//   profileForm.style.display = 'block';
// });

// // Handle form submission
// updateProfileForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const name = document.getElementById('name').value;
//   const bio = document.getElementById('bio').value;

//   // Update the username and hide the form
//   usernameElement.textContent = name;
//   profileForm.style.display = 'none';

//   // Clear the form
//   updateProfileForm.reset();
// });

// document.getElementById('postButton').addEventListener('click', async () => {
//     const content = document.getElementById('postContent').value;

//     try {
//       const response = await fetch('http://localhost:5000/api/posts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content }),
//       });

//       if (response.ok) {
//         document.getElementById('postContent').value = '';
//         loadPosts(); // Refresh the posts list
//       } else {
//         console.error('Failed to post');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   });

//   // Function to load and display posts
//   async function loadPosts() {
//     try {
//       const response = await fetch('http://localhost:5000/api/posts');
//       const posts = await response.json();

//       const container = document.getElementById('postsContainer');
//       container.innerHTML = '';

//       posts.forEach(post => {
//         const postElement = document.createElement('div');
//         postElement.className = 'post-item';
//         postElement.innerHTML = `
//           <p>${post.content}</p>
//           <small>${new Date(post.createdAt).toLocaleString()}</small>
//         `;
//         container.appendChild(postElement);
//       });
//     } catch (error) {
//       console.error('Error loading posts:', error);
//     }
//   }

//   // Load posts when page loads
//   document.addEventListener('DOMContentLoaded', loadPosts);

// auth.js

document.addEventListener('DOMContentLoaded', function () {
  const user = JSON.parse(localStorage.getItem('user'));
  const usernameElement = document.getElementById('username');
  const fullNameInput = document.getElementById('fullName');

  if (user?.fullName) {
    if (usernameElement) usernameElement.textContent = user.fullName;
    if (fullNameInput) fullNameInput.value = user.fullName;
  } else {
    if (usernameElement) usernameElement.textContent = 'Guest';
    if (fullNameInput) fullNameInput.value = '';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Handle page navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      showPage(pageId);
    });
  });

  document.querySelectorAll('.btn').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      if (pageId) { // Only if data-page attribute exists
        showPage(pageId);
      }
    });
  });

  // Handle external link (Opportunity)
  document.querySelector('a[href="https://revsportz.in/"]').addEventListener('click', function (e) {
    // Optional: confirm before leaving
    if (!confirm('You are leaving our site. Continue?')) {
      e.preventDefault();
    }
  });

  // Show initial page (home)
  showPage('home');
});

function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show selected page
  const activePage = document.getElementById(`${pageId}-page`);
  if (activePage) {
    activePage.classList.add('active');
  }
}

// .................................logout.................................


document.querySelector('.logout')?.addEventListener('click', async function () {
  const logoutBtn = this;
  const originalText = logoutBtn.textContent;

  try {
    // Immediate UI feedback
    logoutBtn.disabled = true;
    logoutBtn.textContent = 'Logging out...';

    // Clear client-side data first
    localStorage.removeItem('user');

    // Attempt backend logout (will work even without valid token)
    const response = await fetch('http://localhost:5000/api/users/logout', {
      method: 'POST',
      credentials: 'include' // Crucial for cookies
    });

    // Always redirect even if request fails
    window.location.href = 'Athlifymainbackup.html?logout=success';

  } catch (error) {
    console.error('Logout error:', error);
    // Still redirect - best effort logout
    window.location.href = 'Athlifymainbackup.html?logout=success';
  } finally {
    // Reset button if still on page
    if (logoutBtn && document.body.contains(logoutBtn)) {
      logoutBtn.disabled = false;
      logoutBtn.textContent = originalText;
    }
  }
});