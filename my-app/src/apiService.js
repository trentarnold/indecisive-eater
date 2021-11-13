const BASE_URL = 'http://localhost:3001';



const apiService = {};

// apiService.register = (user) => {

// };

apiService.login = (user) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  
};

apiService.getLocation = async(street, city, state) => {
  const apiKey = `AIzaSyAw5C1mmO1RHuWJD3Ssj1Z_PVAzLhOMIVc`
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  street = street.trim().split(' ').join('+')
  city = '+' + city.trim().split(' ').join('+')
  state = '+' + state.toUpperCase()
  const searchUrl = url + street + ',' + city + ',' + state + '&key=' + apiKey;
  return fetch(searchUrl)
    .then(data => data.json())
    .then(data => data.results[0].geometry.location)
    // .then(data => 
    //   setLocation(data.results[0].geometry.location)
    // ).then(setRandomlySelectOne(true))
}
apiService.postUser = async(user) => {
    return fetch(`${BASE_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

}
apiService.getLocalRestaurants = (lat, lng, dining, price, distance) => {
  console.log('sending for array')
  return fetch(`http://localhost:3001/localRests/${lat}/${lng}/${dining}/${price}/${distance}`)
    .then(data => data.json())
    .then(data => data.results)
  }

apiService.getIndividualRestaurant = (restaurantId) => {
  console.log('fetching individual restaurant')
  return fetch(`http://localhost:3001/restaurantDetails/${restaurantId}`)
    .then(data => data.json())
    .then(data => data.result)
}

apiService.getReviewProfilePicture = (url) => {
  return fetch(`http://localhost:3001/${url}`)
    .then(data => data)
}
// apiService.getImage = async(imageReference) => {
//   console.log('getting image')
//   const image = await fetch(`http://localhost:3001/image/${imageReference}`)
//     .then(data => data.blob())

//   const imageUrl = URL.createObjectURL(image);
//   return imageUrl;
//   // .then(myBlob => {
//   //   const objectURL = URL.createObjectURL(myBlob);
//   //   console.log(typeof objectURL)
//   //   return objectURL
//   // //   setImage(objectURL);
//   // //   imageRef.current.src = objectURL;
//   // //   setText('ready');
//   //  })
// }




export default apiService;