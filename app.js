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


overlayButton.addEventListener('click',()=>{
    overlay.style.display='none';
    if(overlay.className==='win' || overlay.className==='lose'){
        retry();
    }
});

function getRandomPhraseAsArray(arr){
    let phrase= arr[Math.floor(Math.random()*arr.length)];
    return phrase.split('');
}

function addPhraseToDisplay(arr){
    function createAndAppendLi(character){
        const li=document.createElement('li');
        li.textContent=character;
        if((/[a-zA-Z]/).test(character)){
            li.className='letter';
        }else if(character===' '){
            li.className='space';
        }
        phrase.appendChild(li);
    }
    for(let i=0; i<arr.length; i++){
       createAndAppendLi(arr[i]); 
    }
}

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

function retry(){
    missed=0;
    const keyboardButtons=document.querySelectorAll("#qwerty button");
    for(let i=0; i<keyboardButtons.length; i++){
        keyboardButtons[i].disabled=false;
        keyboardButtons[i].className='';
    }
    const tries=document.querySelectorAll('.tries img');
    for(let j=0;j<tries.length;j++){
        tries[j].src="images/liveHeart.png";
    }
    phrase.innerHTML="";
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
}

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

qwerty.addEventListener('click',(e)=>{
    if(e.target.tagName==='BUTTON'){
        e.target.className='chosen';
        e.target.disabled=true;
        const letterFound=checkLetter(e.target.textContent);
        if(letterFound===null){
            document.querySelectorAll('.tries img')[missed].src="images/lostHeart.png";
            missed+=1;
        }
    }
    checkWin();
});
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 
