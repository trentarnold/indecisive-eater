import {Request, Response } from 'express';
const db = require('../models');

const getAll = async(req:Request, res:Response) => {
  try {
    let results = await db.Favorite.findAll();
    res.send(results);
  }catch (err) {
    console.log(err);
    res.status(500).send('Not a valid request');
  }
}

const create = async(req:Request, res:Response) => {
  try {
    const {userId, content} = req.body;
   let stuff = await db.Favorite.create({
      userId,
      content
    })
    res.status(201).send(stuff)
  }catch (err) {
    console.log(err);
    res.status(500).send('Not a valid request');
  }

}

const getBoth = async(req:Request, res:Response) => {
  try {
  let stuff = await  db.User.findAll({
    include: [db.Favorite]  
  }).then((result:any) => res.send(result))
  

  }catch (err) {
    console.log(err)
    res.send({ld: 'asdlfkjalksjdf'});
  }
}


module.exports = {getAll, create, getBoth}