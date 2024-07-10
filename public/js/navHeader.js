const newPostBttn = document.getElementById('new-post-btn');
const newPostModal = document.getElementById('new-post-modal');
const postForm = document.getElementById('post-form');
const closePostModal = document.getElementById('close-modal-btn');
const sharePostBttn = document.getElementById('share-post-btn');
const dashboardBtn = document.getElementById('dashboard-btn');
const homeBtn = document.getElementById('home-btn');


newPostBttn.addEventListener('click', () => {
  newPostModal.classList.remove('hidden');
});

closePostModal.addEventListener('click', () => {
  newPostModal.classList.add('hidden');
});



postForm.addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const title = document.getElementById('post-title').value;
    const text = document.getElementById('post-text').value;
  
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // This line of code is used to convert the data to a JSON string.
        body: JSON.stringify({ title, text}),
      });
      // This if/else statement is used to check if the response is ok or not.
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.log(error);
        alert("Failed to create");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sharing the post");
    }
  });

  homeBtn.addEventListener('click', () => {
    window.location.href = '/';
  });

 dashboardBtn.addEventListener('click', () => {
    window.location.href = '/dashboard';
  });