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

        <button class="like-btn">Like <3</button>

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