const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

let toyCollection = document.querySelector("#toy-collection")
const url = 'http://localhost:3000/toys'

function getAllToys(url){
  fetch(url)
  .then(resp => resp.json())
  .then(toys => renderToys(toys))
}

const newToyForm = document.querySelector(".add-toy-form")
newToyForm.addEventListener("submit", function(){

  const name = newToyForm.name.value
  const image = newToyForm.image.value
  fetch(url, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    name: name,
    image: image,
  //"name": "Jessie",
  //"image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  //"likes": 0
  //"name": "Tester Toy Three",
  //"image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
   likes: 0

})

})
   .then(resp => resp.json())
   .then(data => renderToys(data))


})


//})


function renderToys(data){
  let toyCollection = document.querySelector("#toy-collection")

  data.forEach(function (toy) {
     const divCard = document.createElement("div")


    //fetch(image)
    //    .then(resp => resp.json())
    //    .then(obj => obj.image)
    //    .then(img => div_card.innerHTML += `<h2>${img}</h2>`)

      divCard.className = "card"
      divCard.innerHTML =
        `<h2>${toy.name}</h2>
        <img class="toy-avatar" src="${toy.image}"/>`
      //const div_container = document.createElement("div")
      //div_container.className = "container"
      //const imageWrapper = document.createElement('div')
      //imageWrapper.innerHTML = `<img src="${toy.image}">`
      //div_container.appendChild(imageWrapper)
      //div_card.appendChild(div_container)
      //div_card.innerHTML = `<img src="${toy.image}">`
      divCard.innerHTML += `<p>Likes: ${toy.likes}</p>`
      //toyCollection.append(div_container)
      let likeButton = document.createElement('button')
      likeButton.addEventListener("click", () =>
          {
            fetch(`${url}/${toy.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                likes: toy.likes+1
              })
            })
            .then(resp => resp.json())
            .then(data => {
              const p = divCard.querySelector('p')
              p.innerText = `Likes: ${data.likes}`
              //NEXT LINE IS VEEEERRRYYY IMPORTANT
              toy.likes = data.likes
            })
        }
      )
      likeButton.className = "like-btn"
      likeButton.innerHTML = 'Like <3'

      divCard.append(likeButton)
      toyCollection.append(divCard)
    })
}

getAllToys(url)


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
