//the menu nav bar
let navbar = document.querySelector('.header .navbar');
let menuBtn = document.querySelector('#menu-btn');
let closeBtn = document.querySelector('#close-navbar');

menuBtn.onclick = () =>{
   navbar.classList.add('active');
};

closeBtn.onclick = () =>{
    navbar.classList.remove('active');
 };

window.onscroll = () =>{
   navbar.classList.remove('active');
};
//the menu nav bar

//Styling the book a visit 

// Fetch Pricing Data
function fetchPricingData() {
   return new Promise((resolve, reject) => {
     // Simulating an asynchronous API call
     setTimeout(() => {
       // Resolve with the pricing data
       resolve(pricingData.pricing);
     }, 1000); // Simulating 1 second delay
   });
 }
 
 // Display Pricing Details
 // Fetch the pricing data from the JSON file
fetch('pricing.json')
.then(response => response.json())
.then(data => {
  const pricingContainer = document.getElementById('pricing');
  const pricingData = data.prices;

  // Loop through the pricing data and create HTML elements for each item
  pricingData.forEach(item => {
    const box = document.createElement('div');
    box.classList.add('box');

    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = item.title;

    const price = document.createElement('div');
    price.classList.add('price');

    const currency = document.createElement('span');
    currency.classList.add('currency');
    currency.textContent = 'ksh';

    const amount = document.createElement('span');
    amount.classList.add('amount');
    amount.textContent = item.price;

    price.appendChild(currency);
    price.appendChild(amount);

    const features = document.createElement('ul');
    item.features.forEach(feature => {
      const listItem = document.createElement('li');
      const icon = document.createElement('i');
      icon.classList.add('fas', 'fa-check');
      listItem.appendChild(icon);
      listItem.appendChild(document.createTextNode(feature));
      features.appendChild(listItem);
    });

    const image = document.createElement('img');
    image.src = item.image;
    image.alt = item.title;

    const button = document.createElement('button');
    button.textContent = 'book a visit';

    const link = document.createElement('a');
    link.href = '#';
    link.appendChild(button);

    box.appendChild(title);
    box.appendChild(price);
    box.appendChild(features);
    box.appendChild(link);

    pricingContainer.appendChild(box);
  });
})
.catch(error => console.log(error));
