// Menu Navigation
let navbar = document.querySelector('.header .navbar');
let menuBtn = document.querySelector('#menu-btn');
let closeBtn = document.querySelector('#close-navbar');

menuBtn.onclick = () => {
  navbar.classList.add('active');
};

closeBtn.onclick = () => {
  navbar.classList.remove('active');
};

window.onscroll = () => {
  navbar.classList.remove('active');
};

// Fetch Pricing Data
function fetchPricingData() {
  return new Promise((resolve, reject) => {
    // Simulating an asynchronous API call
    setTimeout(() => {
      // Resolve with the pricing data
      resolve(pricingData.prices);
    }, 1000); // Simulating 1 second delay
  });
}

// Update Capacity
function updateCapacity(pricingData, index) {
  pricingData[index]['available-space']--;
}

// Display Pricing Details
// Fetch the pricing data from the JSON file
fetch('db.json')
  .then((response) => response.json())
  .then((data) => {
    const pricingContainer = document.getElementById('pricing');

    data.prices.forEach((item, index) => {
      const box = document.createElement('div');
      box.classList.add('box');

      const content = document.createElement('div');
      content.classList.add('content');

      const title = document.createElement('h3');
      title.textContent = item.title;
      content.appendChild(title);

      const price = document.createElement('p');
      price.textContent = `Price: Ksh ${item.price}`;
      content.appendChild(price);

      const time = document.createElement('p');
      time.textContent = `Time: ${item.time}`;
      content.appendChild(time);

      const capacity = document.createElement('p');
      capacity.textContent = `Capacity: ${item.capacity}`;
      content.appendChild(capacity);

      const availableSpace = document.createElement('p');
      availableSpace.textContent = `Available Space: ${item['available-space']}`;
      content.appendChild(availableSpace);

      const link = document.createElement('a');
      link.href = '#visit';
      link.textContent = 'Book a Visit';
      link.classList.add('btn');

      // Add event listener to update capacity
      link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior
        if (item['available-space'] > 0) {
          updateCapacity(data.prices, index);
          availableSpace.textContent = `Available Space: ${item['available-space']}`;
        }
      });

      content.appendChild(link);

      box.appendChild(content);

      pricingContainer.appendChild(box);
    });
  })
  .catch((error) => console.log(error));

// Scroll to the Pricing section when clicking on the "Book a Visit" link
const bookVisitLink = document.querySelector('.navbar a[href="#visit"]');
bookVisitLink.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default link behavior

  const pricingSection = document.getElementById('pricing');
  pricingSection.scrollIntoView({ behavior: 'smooth' });
});
