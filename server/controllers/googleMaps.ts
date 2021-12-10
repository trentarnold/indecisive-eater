const axios = require('axios');
import {Request, Response } from 'express';
require('dotenv').config();
exports.getLocalRestaurants = (req:Request, res:Response) => {
  const lat = req.params.lat;
  const lng = req.params.lng;
  const dining = req.params.dining;
  const distance = req.params.distance;
  const price = changePrice(req.params.price);
  const url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
  const location = `location=${lat},${lng}`;
  const radius = `&radius=${distance}`;
  const type = dining === 'restaurant' || dining === 'food' ? `&keyword=${dining}` : `&type=${dining}`;
  const opennow  = '&opennow=true'
  
  const key = `&key=${process.env.API_KEY}`;
  const restaurantSearchUrl = url + location + radius + price + opennow + type + key;
  var config = {
    method: 'get',
    url: restaurantSearchUrl,
    headers: { }
  };
  axios(config)
  .then((response:any) => {
  console.log(response.data)
  res.send(response.data);
})
}

exports.getDetails = (req:Request, res:Response) => {
  const id = req.params.restaurantId;
  
  const key = process.env.API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=types,reviews,website,vicinity,formatted_phone_number,photos,opening_hours&place_id=${id}&key=${key}`
  var config = {
    method: 'get',
    url: url,
    headers: { }
  };
  axios(config)
  .then((response:any) => {
  console.log(response.data)
  res.send(response.data);
})
}
exports.getLocation = async(req:Request, res:Response) => {
  let street = req.params.street;
  let city = req.params.city;
  let state = req.params.state;
  const apiKey = process.env.API_KEY;
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  street = street.trim().split(' ').join('+')
  city = '+' + city.trim().split(' ').join('+')
  state = '+' + state.toUpperCase()
  const searchUrl = url + street + ',' + city + ',' + state + '&key=' + apiKey;
  const config = {
    method: 'get',
    url: searchUrl,
    headers: { }
  };
  axios(config)
  .then((response:any) => {
  console.log(response.data)
  res.send(response.data);
})
}


exports.getRestaurantByName = async(req:Request, res:Response) => {
  const lat = req.params.lat;
  const lng = req.params.lng;
  const title = req.params.title;
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address,name,photos,place_id,rating,user_ratings_total,price_level&input=${title}&inputtype=textquery&locationbias=circle@${lat},${lng}&key=${process.env.API_KEY}`
  const config = {
    method: 'get',
    url: url,
    headers: { }
  };
  axios(config)
  .then((response:any) => {
  res.send(response.data);
})
}

function changePrice(price:String):string {
  if(price === 'low') {
    return '&minprice=0&maxprice=1'
  }else if (price === 'low-medium') {
    return '&minprice=1&maxprice=2'
  }else if (price === 'medium') {
    return '&minprice=2&maxprice=3'
  }else if (price === 'high') {
    return '&minprice=3&maxprice=4'
  }else return ''
}
