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


 
 //get functionality
 fetch('http://localhost:3001/api/users')
 .then(data => data.json())
 .then(data => {
     for(let i = 0;i<data.length;i++) {
         let curr = data[i]
        
         let card = document.createElement('span')
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


    //post functionality
    post.addEventListener('click',()=>{
      
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
        fetch('http://localhost:3001/api/users',options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
           
            let postCard = document.createElement('span')
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
        
    })
    
    
    
    
    // editButton.addEventListener('click',()=>{
        
    // })


function createButtons (id) {
    let i =0;
    while(i<1){
        editButton = document.createElement('button')
        deleteButton = document.createElement('button')
        deleteButton.setAttribute('userid',id)
        editButton.setAttribute('edit-user-id',id)
        editButton.innerText = 'Edit' 
         editForm = document.createElement('form')
        editForm.style.display = 'none'
         editMessage = document.createElement('input')
         editUserName = document.createElement('input')
         editSubject = document.createElement('input')
        deleteButton.innerText = 'Delete'
        editForm.append(editMessage)
        editForm.append(editUserName)
        editForm.append(editSubject)
        i++;
    }



    //delete functionality
    deleteButton.addEventListener('click',(e)=>{
        let userId = e.target.getAttribute('userid')
        // console.log(userId)
        // console.log(this.getAttribute('userid'))
        let deleteOptions = {
            
            method: 'DELETE'
        }
        
        fetch(`http://localhost:3001/api/users/${userId}`,deleteOptions)
        .then(data => {
            //let deletedCard = document.getElementById('card')
            console.log(data.body)
            alert('post deleted')
            e.target.parentElement.remove()
        })
        
    })

    //edit functionality
     editButton.addEventListener('click',(e)=>{
        if(editForm.style.display === 'none') {
            editForm.style.display = 'block'
           } else {
            editForm.style.display = 'none'
           }
           let editUserName = 
       
        editUserId = e.target.getAttribute('edit-user-id')
       let editedPost = {
        name:editUserName.value, 
        subject:editSubject.value,
        message:editMessage.value,
       }
        let editOptions = {
            method:'PATCH',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedPost)
        }
        // fetch(`http://localhost:3001/api/users/${editUserId}`,editOptions) 
        // .then(res=>res.json())
        // .then(result => {
        // })
    })
    
}
