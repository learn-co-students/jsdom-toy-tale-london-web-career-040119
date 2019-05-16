const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const showToys = document.querySelector('#toy-collection')

// let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!

//find form
const formEl = document.querySelector(".add-toy-form")

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
   const newLikes = toy.likes ++
   likeElement.innerText = `${newLikes} Likes`
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
    body: JSON.stringify(toy.likes)
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
const toy = {
  name: formEl.name.value,
  image: formEl.image.value,
  likes: 0
  
  createToy(toy)
	    .then(toy => addBook(toy))
}

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
