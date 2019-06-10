// document.addEventListener('DOMContentLoaded')

const toysURL = 'http://localhost:3000/toys'

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const addToyBtn = document.querySelector('#submit')
const newToyForm = document.querySelector('.add-toy-form')
const nameInput = document.querySelector('#name-input')
const imageInput = document.querySelector('#image-input')

let addToy = false

function getToys(){
  return fetch(toysURL)
  .then(resp => resp.json())
  .then(json => renderToys(json))
}

function renderToy(toy){
  const card = document.createElement('div')
  card.setAttribute('class', 'card')
  
  const nameTag = document.createElement('h2')
  nameTag.innerHTML = toy.name
  
  const imageTag = document.createElement('img')
  imageTag.width = '250'
  imageTag.height = '200'
  imageTag.src = toy.image

  const likesTag = document.createElement('p')
  likesTag.innerHTML = toy.likes

  const likeBtn = document.createElement('button')
  likeBtn.setAttribute('class', 'like-btn')
  likeBtn.innerHTML = 'Like'

  likeBtn.addEventListener('click', () => {
    debugger
    toy.likes++
    likesTag.innerHTML = toy.likes
    incrementLikes(toy)
  })

  card.append(nameTag)
  card.append(likesTag)
  card.append(imageTag)
  card.append(likeBtn)
  toyCollection.append(card)
}

function incrementLikes(toy){
  return fetch(`${toysURL}/${toy.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      likes: toy.likes
    })
  })
  .then(resp => resp.json())
}

function renderToys(toys){
  toys.forEach(toy => {
    renderToy(toy)
  })
}

function addNewToy(toyItem){

  return fetch(toysURL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(toyItem)
  })
  .then(resp => resp.json())
}

newToyForm.addEventListener('submit', e => {
  e.preventDefault()

  let toyItem = {
    name: nameInput.value,
    image: imageInput.value,
    likes: 0
  }

  addNewToy(toyItem)
  .then(renderToy)
})

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



getToys()

