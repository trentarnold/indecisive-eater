import {Request, Response } from 'express';
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'Most def secure';


const getAll = async(req:Request, res:Response) => {
  try {
    let results = await db.User.findAll();
    res.send(results);
  }catch (err) {
    console.log(err);
    res.status(500).send('Not a valid request');
  }
}

const createUser = async(req:Request, res:Response) => {
  try {
    const {password, email, lat, lng, groups} = req.body;
    const user = await db.User.findOne({ where: { email }})
    // const project = await Project.findOne({ where: { title: 'My Title' } });
    if (user) {
      res.status(409).send({error: '409', message: 'You are already a user'})
    }
    if (password.length < 5) {
      res.status(409).send({error: '409', message: 'Password not long enough'})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { id } = await db.User.create({
      password : hashedPassword,
      email,
      lat,
      lng,
      groups,
      include:[
        {
          model: db.groups,
          as: 'groups',
          through: db.users_groups,
        }
      ]
    })
    
    const accessToken = jwt.sign({ id }, SECRET_KEY);
      res.status(201).send( { accessToken, lat , lng  } )
  }catch(err) {
    console.log(err);
     res.status(400).send({ err , message: 'Could not create user' })
  }
}
const loginUser = async(req:Request, res:Response) => {
  try {
    const {email, password} = req.body;
    const user = await db.User.findOne({ where: { email }})
    if (!user) {
      throw new Error()
    }
    const validatedPassword = await bcrypt.compare(password, user.password);
    if (validatedPassword) {
      const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
      res.status(200).send({ accessToken, lat:user.lat, lng: user.lng });
    }else {
      throw new Error()
    }
  } catch (err) {
    res.status(401).send({err, message: "Either the username or password ain't workin"})
  }
}
const createGroup = async(req:Request, res:Response) => {
  const {groupName} = req.body;
  try {
    const gName =await db.groups.create({
      groupName,
    });
    res.send(gName)
  }catch (err) {
    console.log(err, 'error creating group')
    res.send(err)
  }
}
const addUserToGroup = async(req:Request, res:Response) => {
  const { userId, groupId} = req.body;
  try {
    const userGroup = db.users_groups.create({
      userId,
      groupId
    });
    res.send(userGroup);
  } catch (err) {
    console.log(err, 'error creating user-group');
    res.send(err)
  }
}
const getGroup = async(req:Request, res:Response) => {
  const groupId = req.params.groupId;
  try {
    const results = await db.User.findAll({
      where: { id: groupId },
      attributes: ['id'],
      include: {
        model: db.groups,
        as: 'groups',
        attributes: ['id', 'groupName'],
      },
    });
    res.send(results)
  } catch (e) {
    console.log('error creating group:', e);
    res.status(500).send(`Failed: ${e}`);
  }
}


module.exports = {createUser, getAll, loginUser, createGroup, addUserToGroup, getGroup}