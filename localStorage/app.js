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
    const formData = {

        key: form.key.value,
        value:form.value.value,

    };

    console.log({formData});
    window.localStorage.setItem('key', form.key.value);
    window.localStorage.setItem('value', form.value.value);
    readFromStorage()
    

});


function readFromStorage() {

    const key = window.localStorage.getItem('key');
    const value = window.localStorage.getItem('value');
    document.querySelector('output')
        .textContent = JSON.stringify( {key, value}, null,2);
}

readFromStorage()