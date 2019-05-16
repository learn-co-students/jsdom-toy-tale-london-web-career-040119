const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyCollection = document.querySelector('#toy-collection');
const form = document.querySelector(".add-toy-form")
const baseUrl = 'http://localhost:3000/toys';


let showAddForm = false;

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  showAddForm = !showAddForm;
  if (showAddForm) {
    toyForm.style.display = 'block';
    // submit listener here
  } else {
    toyForm.style.display = 'none';
  }
});

function fetchToys(url) {
  return fetch(url);
}

function parseToys(response) {
  return response.json();
}

function addToy(toy) {
  const card = document.createElement('div');
  card.className = 'card';

  const html = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  `;
  card.innerHTML = html;
  const likeBtn = card.querySelector('button')
  likeBtn.addEventListener('click', e => {
    e.preventDefault();
    fetch(baseUrl +`/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({likes: ++toy.likes })
    })
  })
  toyCollection.appendChild(card);
}

function addToys(toys) {
  toys.forEach((toy) => {
    addToy(toy);
  });
}

function createToy(toyData) {
  const postConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toyData)
  };
  return fetch(baseUrl, postConfig)
  .then(resp => resp.json())
}
// OR HERE!
document.addEventListener('DOMContentLoaded', (event) => {
  fetchToys(baseUrl)
    .then(parseToys)
    .then(addToys);
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const toy = {name: form.name.value,
                image: form.image.value,
                likes: 0
    }
    createToy(toy)
      .then(toy => addToy(toy))
  })
});


