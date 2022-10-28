class App {

    constructor() {
      console.log('Initialized');
    }
  
  }
  
new App();
  
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {

    event.preventDefault();
    console.log('Submitted Successfully');


});