
let mainContainer = document.getElementById('main-container')
let post = document.getElementById('button')
let userName = document.getElementById('uname')
let postSubject = document.getElementById('subject')
let postMessage = document.getElementById('input-box')
let editMessage;
let editUserName;
let editSubject;
let editForm;
let editButton;
let deleteButton;
let submit;
let editUserLabel;
let editSubjectLabel;
let editMessageLabel;



let sfx ={
    welcome: new Howl({src:['welcome.mp3']}),
    message: new Howl({src:['instant-message-im.mp3']})

}
//get functionality
function getData (){
    let options = {
        method:'GET',
        mode: 'cors',
    }

    fetch('https://fake-aol-serverside.onrender.com/api/users',options)
    .then(data => data.json())
    .then(result => {
        for(let i = 0;i<result.length;i++) {
            
            let curr = result[i]
            
            let card = document.createElement('div')
            card.classList.add('card')
            let subjectHeader = document.createElement('h1')
            let userAndPost = document.createElement('p')
            
            subjectHeader.textContent = curr.post_subject
            userAndPost.textContent = `@${curr.users_name}:${curr.post}`
            createButtons(curr.id)
            
            card.append(subjectHeader)
            card.append(userAndPost)
            card.appendChild(editButton)
             card.appendChild(deleteButton)
             card.append(editForm)
            
             mainContainer.append(card)
            }
        })
        
    }
    getData();
    
    //post functionality
    post.addEventListener('click',()=>{
        sfx.message.play();
        let newPost = {
            name: userName.value,
            subject: postSubject.value,
            post: postMessage.value
        }
        //console.log(newPost.name,newPost.subject,newPost.post)
        let options = {
            method:'POST',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        }
        fetch('https://fake-aol-serverside.onrender.com/api/users',options)
        .then(res => res.json())
        .then(data => {
           
            
            let postCard = document.createElement('div')
            postCard.classList.add('card')
            let newSubject = document.createElement('h1')
            let newMessage = document.createElement('p')
            newSubject.textContent = newPost.subject
            newMessage.textContent = `@${newPost.name}: ${newPost.post}`
            createButtons(data.id);
            
            postCard.append(newSubject,newMessage)
            postCard.appendChild(editButton)
            postCard.appendChild(deleteButton)
            postCard.append(editForm)
            
            mainContainer.append(postCard)
        })
        mainContainer.innerHTML = ''
        getData()
    })
    
    
    
    
    
        
        
        function createButtons (id) {
    let i =0;
    while(i<1){
        editButton = document.createElement('button')
        deleteButton = document.createElement('button')
        deleteButton.setAttribute('userid',id)
        deleteButton.innerText = 'delete'
        
        editButton.innerText = 'Edit' 
        editForm = document.createElement('form')
        editForm.style.display = 'none'
        
        editMessage = document.createElement('input')
        editMessage.className = 'edit-message'
        editMessage.setAttribute('message',id)
        editUserName = document.createElement('input')
        editUserName.setAttribute('userName',id)
        editSubject = document.createElement('input')
        editSubject.setAttribute('subject',id)
        
        
        editUserLabel = document.createElement('label')//labels
        editUserLabel.innerText = 'User name:'
        editMessageLabel = document.createElement('label')
        editMessageLabel.innerText = 'Message:'
        editSubjectLabel = document.createElement('label')
        editSubjectLabel.innerText = 'Subject:'//labels
        editForm.append(editUserLabel)
        editForm.append(editUserName)
        
        submit = document.createElement('button')
        submit.setAttribute('edit-user-id',id)
        submit.innerText = 'submit'
        editForm.setAttribute('unique',id)
        editForm.append(editSubjectLabel)
        editForm.append(editSubject)
        editForm.append(editMessageLabel)
        editForm.append(editMessage)
        editForm.append(submit)
        i++;
    }
    
    
    
    //delete functionality
    deleteButton.addEventListener('click',(e)=>{
        let userId = e.target.getAttribute('userid')
        // console.log(userId)
        // console.log(this.getAttribute('userid'))
        let deleteOptions = {
            
            method: 'DELETE',
            mode:'cors'
        }
        
        fetch(`https://fake-aol-serverside.onrender.com/api/users/${userId}`,deleteOptions)
        .then(data => {
            //let deletedCard = document.getElementById('card')
            alert('post deleted')
            e.target.parentElement.remove()
        })
        mainContainer.innerHTML = ''
        getData()
    })
    
    //edit functionality
    editButton.addEventListener('click',(e)=>{
        let unique = e.target.parentElement.lastChild
        
        //console.log(unique)
        if(unique.style.display === 'none') {
            unique.style.display = 'block'
        } else {
            unique.style.display = 'none'
        }
        
        
    })
    
    submit.addEventListener('click',(e) =>{
        
        e.preventDefault()
        submit.setAttribute('edit-user-id',id)
        editUserId = e.target.getAttribute('edit-user-id')
        //console.log(editUserId)
        let editedPost = {
            name:e.target.parentElement.firstChild.value, 
            subject:e.target.parentElement.children[1].value,
            message:e.target.parentElement.children[2].value
        }
        
        let editOptions = {
            method:'PATCH',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedPost)
        }
        fetch(`https://fake-aol-serverside.onrender.com/api/users/${editUserId}`,editOptions) 
        .then(result => {
            console.log(editedPost.message)
            //console.log(result)
        })
        
        mainContainer.innerHTML = ''
        getData();
    })
}
sfx.welcome.play()