let mainContainer = document.getElementById('main-container')
let post = document.getElementById('button')
let userName = document.getElementById('uname')
 let postSubject = document.getElementById('subject')
 let postMessage = document.getElementById('input-box')


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
            card.append(subjectHeader)
            card.append(userAndPost)
            mainContainer.append(card)
        }
    })

    post.addEventListener('click',()=>{
        let newPost = {
            name: userName.value,
            subject: postSubject.value,
            post: postMessage.value
        }
        console.log(newPost.name,newPost.subject,newPost.post)
    let options = {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        }
        fetch('http://localhost:3001/api/users')
        .then(data => {
            let postCard = document.createElement('span')
            let newSubject = document.createElement('h1')
            let newMessage = document.createElement('p')
            newSubject.textContent = newPost.subject
            newMessage.textContent = `@${newPost.name}: ${newPost.post}`

            postCard.append(newSubject,newMessage)
            mainContainer.append(postCard)
        })

        })






