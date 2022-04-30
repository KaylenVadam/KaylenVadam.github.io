document.addEventListener('DOMContentLoaded', () => {

//card options
const cardArray = [
    {
        name: 'Forest_Spirit',
        img: 'Memory_Game_Images/Forest_Spirit.jpg'
    },
    {
        name: 'Forest_Spirit',
        img: 'Memory_Game_Images/Forest_Spirit.jpg'
    },
    {
        name: 'Hydra',
        img: 'Memory_Game_Images/Hydra.jpg'
    },
    {
        name: 'Hydra',
        img: 'Memory_Game_Images/Hydra.jpg'
    },
    {
        name: 'Dragon',
        img: 'Memory_Game_Images/Dragon.jpg'
    },
    {
        name: 'Dragon',
        img: 'Memory_Game_Images/Dragon.jpg'
    },
    {
        name: 'Cerberus',
        img: 'Memory_Game_Images/Cerberus.jpg'
    },
    {
        name: 'Cerberus',
        img: 'Memory_Game_Images/Cerberus.jpg'
    },
    {
        name: 'Pegasus',
        img: 'Memory_Game_Images/Pegasus.jpg'
    },
    {
        name: 'Pegasus',
        img: 'Memory_Game_Images/Pegasus.jpg'
    },
    {
        name: 'Jackalope',
        img: 'Memory_Game_Images/Jackalope.jpg'
    },
    {
        name: 'Jackalope',
        img: 'Memory_Game_Images/Jackalope.jpg'
    },
]

cardArray.sort(() => 0.5 - Math.random())

const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenId = []
let cardsWon = []
//create your board
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'Memory_Game_Images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipcard)
        grid.appendChild(card)
    }
}


//check for match
function checkForMatch() {
    let cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if (cardsChosen[0] === cardsChosen[1]) {
        alert('You Found A Match')
        cards[optionOneId].setAttribute('src', 'Memory_Game_Images/white.jpg')
        cards[optionTwoId].setAttribute('src', 'Memory_Game_Images/white.jpg')
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'Memory_Game_Images/blank.png')
        cards[optionTwoId].setAttribute('src', 'Memory_Game_Images/blank.png')
        alert('Sorry, try again')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations! You found them all!'
    }
}

//flip card
function flipcard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}
createBoard()
})