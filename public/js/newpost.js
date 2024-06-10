document.getElementById('newPost').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
  
    fetch('/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
    .then(response => response.json())
    .then(data => {
      // Handle response here
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });