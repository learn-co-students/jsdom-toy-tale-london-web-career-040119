const addBtn = document.querySelector("#new-toy-btn")
const toyForm = document.querySelector(".container")
const formEl = document.querySelector(".add-toy-form")
let addToy = false

const toysUrl = "http://localhost:3000/toys"

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = "block"
    // submit listener here
  } else {
    toyForm.style.display = "none"
  }
})

function renderToy(toy) {
  divEl = document.getElementById("toy-collection")
  newDiv = document.createElement("div")
  newDiv.className = "card"
  divEl.appendChild(newDiv)

  newDiv.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p class="likes">${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `
  const likeBtn = newDiv.querySelector(".like-btn")
  const likesEl = newDiv.querySelector(".likes")

  likeBtn.addEventListener("click", () => {
    toy.likes++
    updateToy(toy).then(toy => (likesEl.innerText = `${toy.likes} Likes`))
  })
}

function renderToys(toys) {
  toys.forEach(toy => renderToy(toy))
}

function addNewToyListener() {
  formEl.addEventListener("submit", function(event) {
    event.preventDefault()

    const toy = {
      name: formEl.name.value,
      image: formEl.image.value,
      likes: 0
    }
    createToy(toy)
      .then(toy => renderToy(toy))
      .catch(error => console.error(error))

    formEl.reset()
  })
}

function getToys() {
  return fetch(toysUrl)
    .then(resp => resp.json())
    .then(json => renderToys(json))
}

function createToy(toy) {
  return fetch(toysUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

function updateToy(toy) {
  return fetch(toysUrl + `/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

function init() {
  getToys()
  addNewToyListener()
}

init()
