const formEl = document.querySelector('.add-toy-form')
const toyCollectionEl = document.querySelector('#toy-collection')

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let showAddToyForm = false



// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  showAddToyForm = !showAddToyForm
  if (showAddToyForm) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// add a single toy to the page
function addToy (toy) {
	const toyDiv = document.createElement('div')
	toyDiv.className = 'card'
	toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p class='likes'>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
  `
  
  toyCollectionEl.append(toyDiv)
  
  const likeBtn = toyDiv.querySelector('.like-btn')
  const likesEl = toyDiv.querySelector('.likes')

  likeBtn.addEventListener('click', () => {
    toy.likes++
    
    updateToy(toy)
      .then(toy => likesEl.innerText = `${toy.likes} Likes`)
  })
}

// add multiple toys to the page
function addToys(toys) {
	toys.forEach(toy => addToy(toy))
}

// listen to form submission to create a new toy
function addNewToyListener () {
  formEl.addEventListener('submit', event => {
    event.preventDefault()

    // create a temporary toy for the addToy function
    const toy = {
      name: formEl.name.value,
      image: formEl.image.value,
      likes: 0
    }

    createToy(toy)
      .then(toy => addToy(toy))
    
    formEl.reset()
  })
}


// do whatever you need to do when the page loads
function init () {
  getToys()
    .then(toys => addToys(toys))
  addNewToyListener()
}

init()