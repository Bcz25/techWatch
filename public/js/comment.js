const commentBtns = document.querySelectorAll('#comment-btn');
const shareCommentBtn = document.getElementById('share-comment-btn');

commentBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const postId = btn.getAttribute('data-post-id');
        window.location.replace(`/post/${postId}`);
    });
});

// add event listener to share comment button to trigger post request
shareCommentBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const commentText = document.getElementById('comment-text').value.trim();
    const postId = shareCommentBtn.getAttribute('data-post-id');

    if (commentText) {
        const response = await fetch(`/api/comments/post/${postId}`, {
            method: 'POST',
            body: JSON.stringify({ comment_text: commentText }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.getElementById('comment-text').value = '';
            window.location.reload();
        } else {
            alert('Failed to share comment');
        }
    }
});
