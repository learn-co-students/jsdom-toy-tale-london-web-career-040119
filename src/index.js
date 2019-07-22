

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyUrl = 'http://localhost:3000/toys'
const toyUrlId = 'http://localhost:3000/toys/:id'

const toyCollectionDiv = document.getElementById('toy-collection')
const addToyForm = document.querySelector('.add-toy-form') //new toy submission
//const addToyForm = document.getElementsBoyClassName('add-toy-form')[0]


// add the toys to the page
const parseJSON = resp => resp.json()

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})



fetch(toyUrl)
  .then(parseJSON)
  .then(putToysOnPage)


function putToysOnPage(toys) {


  toys.forEach(function (toy) {
    toyCollectionDiv.innerHTML += `
      <div class="card" data-id=${toy.id}>
      
        <h2>${toy.name}</h2>
        <img style="width: 100%" src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} Likes</p>

        <button class="like-btn" type="button" >Like <3</button>

			</div>
		`
  })



}





 addToyForm.addEventListener('submit', function (event) {
   event.preventDefault();

   fetch(toyUrl, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Accept: "application/json"
     },
     body: JSON.stringify({
       "name": `${event.target.name.value}`,
       "image": `${event.target.image.value}`,
       "likes": 0
     })
   })
     .then(parseJSON)
     .then(putToysOnPage)
  })


 


  toyCollectionDiv.addEventListener('click', function (event) {
    event.preventDefault();
    
    let likeButtonIsPressed = event.target.className === "like-btn"
  
  
    if (likeButtonIsPressed) {
      let id = event.target.parentElement.dataset.id
      let like = event.target.previousElementSibling
      let likeCount = parseInt(event.target.previousElementSibling.innerText)
      like.innerText = `${++likeCount} likes`
  
      fetch( toyUrlId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "likes": likeCount
        })
  
      })
        .then(response => response.json())
        .then(console.log)
    }
  })





// function init(){
//   getToys()
//   addClicksToLikes()
// }

// STEP 2

// function getToys(){
//   // fetch and render toys
//   return fetch(toyUrl).then(res => res.json()).then(json => {
//     json.forEach(toy => {
//       makeToy(toy)
//     })
//   })
// }

// // STEP 3

// function makeToy(toy) {
//   // render a toy to the page (reusable)
//   toyCollection.innerHTML += `
//     <div class="card" >
//       <h2>${toy.name}</h2>
//       <img src="${toy.image}" class="toy-avatar">
//       <p>${toy.likes} </p>
//       <button class='like-btn' data-id="${toy.id}">Like <3</button>
//     </div>
//     `
// }

// // STEP 4

// function getToyData(e) {
//   e.preventDefault();
//   // remove alert notices
//   (document.querySelector('.alert')) ? document.querySelector('.alert').remove() : null

//   // get input object
//   let mappedInputs = mapInputs()

//   if (mappedInputs.name !== "" && mappedInputs.image !== ""){
//     createNewToy(mappedInputs)
//   } else {
//     flash['notice'] = "Sorry, fields cannot be blank!";
//     let newP = document.createElement('p')
//     newP.innerText = flash['notice']
//     newP.className = 'alert'
//     toyForm.prepend(newP)
//   }
// }

// function mapInputs() {
//   let mappedInputs = {likes: 0}
//   for (let input of inputs) {
//     mappedInputs[input.name] = input.value
//     input.value = ""
//   };
//   return mappedInputs
// }

// function createNewToy(data) {
//   // clears the flash notices
//   flash = {}
//   // POST to toys
//   return fetch(toyUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   })
//   .then(res => res.json()).then(makeToy)
// }


// // STEP 5
// function addClicksToLikes(){
//   document.addEventListener('click', (e) => {
//     // conditionally render the like number
//     if (e.target.className === "like-btn") {
//       let likeNum = e.target.previousElementSibling
//       likeNum.innerText = parseInt(likeNum.innerText) + 1
//       likeToy(e.target.dataset.id, parseInt(likeNum.innerText)).then(console.log)
//     }
//   })
// }




// function likeToy(toyId, data) {
//   // send a patch request to server increasing a toy's like count
//   return fetch(toyUrl + `/${toyId}`, {
//     method: 'PATCH',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({likes: data})
//   }).then(res => res.json())
// }
