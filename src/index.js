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

function addToys (toys) {
  toys.forEach(toy => { addToy(toy) })
}

function getToys() {
	return fetch('http://localhost:3000/toys')
		.then(resp => resp.json())
  }

getToys()
  .then(toys => addToys(toys))
