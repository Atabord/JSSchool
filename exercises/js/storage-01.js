window.addEventListener('load', function(){
    
    function displayNotes(){
        let container = document.getElementById('postIts');
        let posts =  JSON.parse(localStorage.getItem('post'));
        container.innerHTML = '';
        if (posts) {
            for(let i = 0; i < posts.length; i += 1) {
                let div = '<div class="note"><p>'+posts[i]+'</p></div>';
                container.innerHTML += div;
            }            
        }
    }
    displayNotes();

    function storeNote(data){
        let posts = localStorage.getItem('post');
        if (!posts) {
            posts = []
            localStorage.setItem('post', JSON.stringify(posts));
        } else {
            posts = JSON.parse(posts);
        }
        posts.push(data);
        localStorage.setItem('post', JSON.stringify(posts));
        displayNotes()
    }


    let boton = document.getElementById('addNote');
    boton.addEventListener('click', function(){
        let data = this.previousSibling.previousSibling.value;
        storeNote(data);
    });
})