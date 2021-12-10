import {Request, Response } from 'express';
import { request } from 'http';
const db = require('../models');


const createFavoriteRestaurant = async(req:Request, res:Response) => {
  const { title, userId } = req.body;
  try {
    const restaurant = await db.FavoriteRestaurants.findOne({ where: { title }})
    if (restaurant) {
      //already a restaurant, just add it to userFavoriteRests
      const results = await db.UserFavoriteRestaurant.create({
        userId,
        favRestaurantId:restaurant.id,
      });
      res.status(201).send(results)
      return;
    }
    //not a restaurant create it in favorites and then userfavorites
   const {id} = await db.FavoriteRestaurants.create({
      title,
    });
    const results = await db.UserFavoriteRestaurant.create({
      userId,
      favRestaurantId:id,
    });
    res.status(201).send(results)
  } catch (e) {
    return res.status(500).send(`Failed: ${e}`);
  }
}
const getFavoriteRestaurantId = async(req:Request, res:Response) => {
  const {title} = req.params;
  try {
    const result = await db.FavoriteRestaurants.findOne({ where: { title }});
    res.send({id: result.dataValues.id});
  }catch (err) {
    console.log(err)
    res.status(400).send({err})
  }
}

const removeUserFromFavorites = async(req:Request, res:Response) => {
 const {userId, favRestaurantId} = req.params;
 try {
    const results = db.UserFavoriteRestaurant.destroy({
      where: {favRestaurantId, userId}
    });
    res.status(200).send({content: 'Destroyed', results})
 }catch (err) {
   console.log(err)
   res.status(404).send({err})
 }
}




module.exports = { createFavoriteRestaurant, getFavoriteRestaurantId, removeUserFromFavorites}