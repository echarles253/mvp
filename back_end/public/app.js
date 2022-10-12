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


 
 //get functionality
 function getData (){
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

 }
    getData();

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
           // console.log(data)
           
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
        mainContainer.innerHTML = ''
       getData()
    })
    
    
    
    
    // editButton.addEventListener('click',()=>{
        
    // })


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
        
        editForm.append(editMessage)
        editForm.append(editUserName)
        editForm.append(editSubject)
        submit = document.createElement('button')
        submit.setAttribute('edit-user-id',id)
        submit.innerText = 'submit'
        editForm.setAttribute('unique',id)
        editForm.append(submit)
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
            fetch(`http://localhost:3001/api/users/${editUserId}`,editOptions) 
            .then(result => {
                console.log(editedPost.message)
                //console.log(result)
                })
                
                mainContainer.innerHTML = ''
                getData();
            })
    }