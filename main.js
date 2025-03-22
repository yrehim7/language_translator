let langOption = document.querySelectorAll('select');
let fromText = document.querySelector('.fromText');
let transText = document.querySelector('.toTranslate');
let fromVoice = document.querySelector('.form');
let toVoice = document.querySelector('.to');
let cpyBtn = document.querySelector('.bx-copy');
let countValue = document.querySelector('.code_length');
let exchangLang = document.querySelector('.bx-transfer');

langOption.forEach((get, con) =>{
    for(let countryCode in language){

        let selected;
        if(con == 0 && countryCode == "en-GB"){
            selected = "selected";
        }else if(con == 1 && countryCode == "ar-SA"){
            selected = "selected";  
        }

        let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
        get.insertAdjacentHTML('beforeend', option);
    }
})

// API function //
fromText.addEventListener('input', function() {
    let content = fromText.value;
    fromContent = langOption[0].value;
    transContent = langOption[1].value;

    let translateLINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;
    
    fetch(translateLINK).then(translate => translate.json()).then(data => {
        transText.value = data.responseData.translatedText
    })
})

fromVoice.addEventListener('click', function() {
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(fromText.value);
    fromTalk.lang = langOption[0].value;
    speechSynthesis.speak(fromTalk);
})

toVoice.addEventListener('click', function() {
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(transText.value);
    fromTalk.lang = langOption[0].value;
    speechSynthesis.speak(fromTalk);
})

cpyBtn.addEventListener('click', function(){
    navigator.clipboard.writeTex(transText.value);
})

fromText.addEventListener('keyup', function() {
    countValue.innerHTML = `${fromText.value.length}/5,000`;
})

exchangLang.addEventListener('click', function(){
    fromText.value = transText.value;
    transText.value = tempText;

    let tempOpt = langOption[0].value;
    langOption[0].value = langOption[1].value;
    langOption[1].value = fromText.value;
})