const BASE_URL = 'http://localhost:3001';



const apiService = {};

apiService.login = (user) => {
  console.log('retrieving user');
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


apiService.postUser = async(user) => {
  console.log('adding user')
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

apiService.getLocation = async(street, city, state) => {
  const apiKey =`${process.env.REACT_APP_API_KEY}`;
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  street = street.trim().split(' ').join('+')
  city = '+' + city.trim().split(' ').join('+')
  state = '+' + state.toUpperCase()
  const searchUrl = url + street + ',' + city + ',' + state + '&key=' + apiKey;
  return fetch(searchUrl)
    .then(data => data.json())
    .then(data => data.results[0].geometry.location)
}

apiService.getLocalRestaurants = (lat, lng, dining, price, distance) => {
  return fetch(`http://localhost:3001/localRests/${lat}/${lng}/${dining}/${price}/${distance}`)
    .then(data => data.json())
    .then(data => {
      data.results.map(result => result.favorited = false)
      return data.results
    })
    .catch(err => console.log(err))
  }

apiService.getIndividualRestaurant = (restaurantId) => {
  console.log('fetching individual restaurant')
  return fetch(`http://localhost:3001/restaurantDetails/${restaurantId}`)
    .then(data => data.json())
    .then(data => data.result)
}

apiService.addToFavorites = (userId, title) => {
  console.log('adding to favorites');
  return fetch(`${BASE_URL}/createFavoriteRestaurant`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({userId, title}),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

apiService.getFavoriteRestaurants = async(userId, lat, lng) => {
  console.log('retrieving favorites')
  const titles = await fetch(`${BASE_URL}/favoriteRestaurant/${userId}`)
    .then(data => data.json())
    .then(data => data[0].FavoriteRestaurants)
    .then(data => data.map(d => d.title))
    .catch(err => console.log(err))
    const arrayOfRests = await Promise.all(titles.map(title=>fetch(`${BASE_URL}/restaurantByName/${lat}/${lng}/${title}`)
                                                      .then(res => res.json())))
    .then(responses => responses.map(response => {
      response.candidates[0].vicinity = formatAddress(response.candidates[0].formatted_address);
      response.candidates[0].favorited = true;
      return response.candidates[0]
    }))
    .catch(err => console.log(err));
    return arrayOfRests || [];
}
apiService.getFavoriteRestaurantTitles = async (userId) => {
  console.log('retrieving favorite titles')
  return await fetch(`${BASE_URL}/favoriteRestaurant/${userId}`)
  .then(data => data.json())
  .then(data => data[0].FavoriteRestaurants)
  .then(data => data.map(d => d.title))
  .catch(err => console.log(err))
}


apiService.updateFavoriteRestaurants = async (lat, lng, title) => {
  return fetch(`${BASE_URL}/restaurantByName/${lat}/${lng}/${title}`)
          .then(res => res.json())
          .then( res => {
          res.candidates[0].vicinity = formatAddress(res.candidates[0].formatted_address);
          res.candidates[0].favorited = true;
          return res.candidates[0]
          })
}

apiService.getFavoriteRestaurantId = async (title) => {
  return fetch(`${BASE_URL}/getFavoriteRestaurantId/${title}`)
         .then(data => data.json())
         .then(data => data)
         .catch(err => console.log(err))
}

apiService.removeUserFromFavorites = async (userId, favRestaurantId) => {
  return fetch(`${BASE_URL}/removeUserFromFavorites/${userId}/${favRestaurantId}`, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors'
  })
}
// router.get('/getFavoriteRestaurantId/:title', favoriteController.getFavoriteRestaurantId)
// router.delete('/removeUserFromFavorites/:userId/:favRestaurantId', favoriteController.removeUserFromFavorites)


const formatAddress = (address) => {
  let [street, city] = address.split(',')
  return street + city
}
export default apiService;





// apiService.getReviewProfilePicture = (url) => {
//   return fetch(`http://localhost:3001/${url}`)
//     .then(data => data)
// }
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




