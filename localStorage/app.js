class App {

    constructor() {
      console.log('Initialized');
    }
  
  }
  
new App();
  
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {

    event.preventDefault();    
    console.log({event});
    const form = event.target;
    console.log({form});
    const formData = {

        key: form.key.value,
        value: form.value.value,

    };

    console.log({formData});



        window.localStorage.setItem(form.key.value, form.value.value);
        form.reset();
        form.key.focus();
        readFromStorage();
    


});


function readFromStorage() {
      

    const key = window.localStorage.getItem(form.key.value);
    const value= window.localStorage.getItem(form.value.value);
    document.querySelector('output').innerHTML = Object.keys(window.localStorage).map(htmlTemplate).join("")
}

function htmlTemplate(key){

  const value = window.localStorage.getItem(key);
  return `
    <span>${key}</span>
    <span>${value}</span>
    <span><img src=./images/lixo.svg width="12" onclick="removeItem('${key}')"></span>
    `
}

function removeItem(key){

  if(confirm("Are you sure you want to remove this item permanently???")){
    window.localStorage.removeItem(key);
    readFromStorage();
  }


}



readFromStorage();