// Variables
const cities = document.querySelectorAll('.city');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const api_key = '200679410-c42e0b3c52cf2545ae3cc72e83d61d3c';
const trailListDOM = document.querySelector('.hike-list');
const cityProfiles = [{
  name: 'saltLakeCity',
  lat: 40.758701,
  lon: -111.876183  
}, {
  name: 'seattle',
  lat: 47.6062,
  lon: -122.3321
}, {
  name: 'sanJose',
  lat: 37.3382,
  lon: -121.8863  
}, {
  name: 'atlanta',
  lat: 33.7490,
  lon: -84.3880 
}, {
  name: 'raleigh',
  lat: 35.7796,
  lon: -78.6382 
}, {
  name: 'austin',
  lat: 30.2672,
  lon: -97.7431
}];
    

// ----- Cities Carousel -----
const nextCity = () => {
  // Get element with the 'current' class.
  const current = document.querySelector('.current');
  // Remove the 'current' class from that element.
  current.classList.remove('current');
  // Check for next city.
  if(current.nextElementSibling) {
    // Add the class of 'current' to next sibling(city).
    current.nextElementSibling.classList.add('current');
  } else {
    // Add 'current' to the start(first city in node list).
    cities[0].classList.add('current');
  }
}

const prevCity = () => {
  // Get element with the 'current' class.
  const current = document.querySelector('.current');
  // Remove the 'current' class from that element.
  current.classList.remove('current');
  // Check for previous city.
  if(current.previousElementSibling) {
    // Add the class of 'current' to previous sibling(city).
    current.previousElementSibling.classList.add('current');
  } else {
    // Add 'current' to last city on node list.
    cities[cities.length - 1].classList.add('current');
  } 
}

// Button events for cities carousel
// Upon a click we will run the nextCity or prevCity functions.
next.addEventListener('click', e => {
  nextCity();
});

prev.addEventListener('click', e => {
  prevCity();
})


// ----- Display Selected City Data -----

// Create Active City 
// returns city coordinate object for user selected city
// iterate over cityProfiles and return object that has a name value that is equal to currCity.

const getCoords = (currCity) => {
  const cityCoords = cityProfiles.find(city => city.name == currCity);
  return cityCoords;
}

// My call to the API with just the one city's hiking data.
// gets hiking data
async function getHikingData({lat, lon}) {
  try {
    const url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=${api_key}`;
    const data = await (await fetch(url)).json();
    // console.log(data);
    return data.trails;
  }
  catch(error) {
    console.log(error);
  }
};

const displayHikes = (hikes) => {
  let result = '';
  hikes.forEach(hike => {
    // console.log(hike.name)
    result += `
      <li class="hike" data-id=${hike.id}>
        <img src=${hike.imgSmall}>
        <button class="hike-link">${hike.name}</button>
      </li>
      `;
  });
  trailListDOM.innerHTML = result;
};

// This is my hub where I am bringing in functions to be worked through so I  can display the hikes for each city.
const activeCity = async (e) => {
  // get the data attribute value from the event object that was created. 
  const pickedCity = e.target.dataset.city;
  console.log(pickedCity);

  // get coords
  const coords = getCoords(pickedCity);

  // get hiking data
  const hikes = await getHikingData(coords);
  console.log(hikes);
  
  // display hiking data
  displayHikes(hikes);

  // Add event listeners to the hikes
  document.querySelectorAll('.hike').forEach(hike => {
    hike.addEventListener('click', e => activateHike(e, hikes));
  });
}

// This function will display the data for the hike that is clicked on in the form of a modal.
const activateHike = async (e, hikes) => {
  // this selects the nearest element with a data attribute. This way even if they do not click on the text but just the <li> field it will respond with the data.
  const pickedHike = e.target.closest('[data-id]');
  console.log(pickedHike);
  console.log(hikes);

}


// Add event listeners to every city and if an event happens, take the event object and pass it into activeCity().
cities.forEach(city => {
  city.addEventListener('click', e => activeCity(e));
})







// ---- Display Active City -----

