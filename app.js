const qwerty=document.getElementById('qwerty');
const phrase=document.getElementById('phrase');
let missed=0;
const phrases=['The book was on the table',
'We camped by the brook',
'He knew it was over',
'She was lost',
'I waited for a while'];
const overlayButton=document.querySelector('#overlay .btn__reset');
const overlay= document.getElementById('overlay');
const lives=document.querySelectorAll('.tries img');

/**
 * Event listener for the button of the overlay screen. Resets the game if the screen represents the win or lose state.
 */
overlayButton.addEventListener('click',()=>{
    overlay.style.display='none';
        initialize();
});

/**
 * Randomly selects a phrase from the phrases array and breaks it into its characters
 * @param {arr} An array of strings to choose from 
 * @returns a tokenized list with the letters of the randomly chosen phrase
 */
function getRandomPhraseAsArray(arr){
    let phrase= arr[Math.floor(Math.random()*arr.length)];
    return phrase.split('');
}


/**
 * Receives an array of characters and adds it to the screen via li elements
 * @param {arr} an array of characters
 */
function addPhraseToDisplay(arr){
    /**
     * Creates a li item with the desired character and adds it to the list
     * @param {character} a character to add to the ul element 
     */
    function createAndAppendLi(character){
        const li=document.createElement('li');
        li.textContent=character;
        if((/[a-zA-Z]/).test(character)){
            li.className='letter';
        }else if(character===' '){
            li.className='space';
        }
        phrase.firstElementChild.appendChild(li);
    }
    for(let i=0; i<arr.length; i++){
       createAndAppendLi(arr[i]); 
    }
}

/**
 * Checks if a letter exists in the randomly chosen phrase
 * @param {letter} the letter to check 
 * @returns the letter if it exists or null if it does not exist in the phrase
 */
function checkLetter(letter){
    let result=null;
    const letters=document.getElementsByClassName('letter');
    for(let i=0; i<letters.length;i++){
        if (letters[i].textContent.toLowerCase()===letter){
            letters[i].classList.add('show');
            result=letter;
        }
    }
    return result;
}

/**
 * Clears the board, removes the disabled state and classes of buttons and generates a new phrase
 */
function initialize(){
    missed=0;
    const keyboardButtons=document.querySelectorAll("#qwerty button");
    for(let i=0; i<keyboardButtons.length; i++){
        keyboardButtons[i].disabled=false;
        keyboardButtons[i].className='';
    }
    for(let j=0;j<lives.length;j++){
        lives[j].src="images/liveHeart.png";
    }
    phrase.firstElementChild.innerHTML="";
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
}

/**
 * Checks if the player wins or loses the game
 */

function checkWin(){
    if (document.getElementsByClassName('show').length===document.getElementsByClassName('letter').length){
        overlay.className='win';
        overlay.firstElementChild.textContent='You win!';
        overlay.style.display='';
        overlayButton.textContent='One more round?';
    }else if(missed>=5){
        overlay.className='lose';
        overlay.firstElementChild.textContent='You lost!';
        overlay.style.display='';
        overlayButton.textContent='Try again?';
    }
}

/**
 * Event listener for the buttons of the keyboard 
 */
qwerty.addEventListener('click',(e)=>{
    if(e.target.tagName==='BUTTON'){
        e.target.className='chosen';
        e.target.disabled=true;
        const letterFound=checkLetter(e.target.textContent);
        if(letterFound===null){
            lives[missed].src="images/lostHeart.png";
            missed+=1;
        }
    }
    checkWin();
});
