
if(document.getElementById("add_new_post")){
    var formEl = document.querySelector('#add_new_post');
    async function createNewPost(event) {
        event.preventDefault();
        const title = document.querySelector('#title').value;
        const post_content = document.querySelector('#post_content').value;
        if(title == ""){
            alert("Please enter a title");
            return;
        }
    
        if(post_content == ""){
            alert("Please enter the post content");
            return;
        }
    
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, post_content }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
    
    formEl.addEventListener('submit', createNewPost);
    
}

if(document.getElementById('add_new_comment') ){
    var commentFormEl = document.querySelector('#add_new_comment');

    async function createNewComment(event) {
        console.log("Testing comment");
        event.preventDefault();
        const comment_content = document.querySelector('#comment_content').value;
        const post_id = document.querySelector('#comment_post_id').value;
    
        if(comment_content == ""){
            alert("Please enter a comment");
            return;
        }
    
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_content, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/post/'+post_id);
        } else {
            alert(response.statusText);
        }
    }
    
    commentFormEl.addEventListener('submit', createNewComment);
    
}

if(document.getElementById('add_new_post_btn') ){
    var buttonEl = document.querySelector('#add_new_post_btn');
    buttonEl.addEventListener('click', function(e){
        formEl.classList.remove('hide');
        formEl.classList.add('show');
        this.classList.add('hide');
    });
}

if(document.getElementById('edit_post_btn')){
    var editPostFormEl = document.getElementById('edit_post_form');

    var editPostButtonEl = document.querySelector('#edit_post_btn');
    editPostButtonEl.addEventListener('click', function(){
        editPostFormEl.classList.remove("hide");
        this.classList.add("hide");
        document.querySelector(".show_post_content").classList.add("hide");
    });

    async function updatePost(event) {
        const post_content = document.querySelector('#edit_post_content').value;
        const current_post_id = document.querySelector('#current_post_id').value;

        if(post_content == ""){
            alert("Please enter the post content.");
            return;
        }

        const response = await fetch(`/api/posts/${current_post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ post_content, current_post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
    editPostFormEl.addEventListener('submit', updatePost);

}
