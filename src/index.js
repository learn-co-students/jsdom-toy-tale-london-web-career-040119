const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const showToys = document.querySelector('#toy-collection')
const formEl = document.querySelector(".add-toy-form")
// let showForm = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  showForm = !showForm
  if (showForm) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!

//add individual toy and update likes to DOM
function addToy(toy) {

  const div = document.createElement('div')
  div.setAttribute ("class", "card")

   div.innerHTML = `
   <h2>${toy.name}</h2>
   <img src= ${toy.image} class="toy-avatar" >
   <p class= "likes">${toy.likes} Likes </p>
   <button class="like-btn">Like <3</button>
   `
   showToys.append(div)

   const likeElement = div.querySelector(".likes")
   const likeBtn = div.querySelector('.like-btn')

   likeBtn.addEventListener('click', function (event) {
   toy.likes ++

   updateLikes(toy)
   .then (toy => likeElement.innerText = `${toy.likes} Likes`)
 })
}

//add all toys to DOM
function addToys (toys) {
  toys.forEach(toy => { addToy(toy)})
}

//update server with like count
function updateLikes (toy) {

  const url = `http://localhost:3000/toys/${toy.id}`

  const options =  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  }
  return fetch(url, options).then(resp => resp.json())
}

//get all toys to json
function getToys() {
	return fetch('http://localhost:3000/toys')
		.then(resp => resp.json())
  }

getToys()
  .then(toys => addToys(toys))

//create individual toy
formEl.addEventListener('submit', function(event) {
	event.preventDefault()

  const toy = {
    name: formEl.name.value,
    image: formEl.image.value,
    likes: 0
  }

  createToy(toy)
    .then(toy => addToy(toy))

  formEl.reset()

})

function createToy (toy) {

  const url = 'http://localhost:3000/toys'

  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(toy)
  }

  return fetch(url, options).then(resp => resp.json())
}
