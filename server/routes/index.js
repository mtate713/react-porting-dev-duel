import { Router } from 'express'
import axios from 'axios'
import validate from 'express-validation'
import token from '../../token'

import validation from './validation'

import {createUserProfile} from '../lib/UserProfile'

export default () => {
  let router = Router()

  
  router.get('/health-check', (req, res) => res.send('OK'))

  router.get('/rate', (req, res) => {
    axios.get(`http://api.github.com/rate_limit`, {
      headers: {
        'Authorization': token,
      }
    }).then(({ data }) => res.json(data))
  })

  
  router.get('/user/:username', validate(validation.user), (req, res) => {
    console.log(req.params)
    axios.get(`http://api.github.com/users/` + req.params.username, {
      headers: {
        'Authorization': token
      }
    }).then(({ data }) => {
      //console.log(data)
      let userProfile = []
      userProfile.push(createUserProfile(data));
      Promise.all(userProfile)
        .then(values => {
          //console.log(values);
          res.json(values[0]);
        })
      
    })
  })

  router.get('/users/', validate(validation.users), (req, res) => {
    console.log(req.query)
    let userListRequest = [];
    for (let user of req.query.username) {
      let requestLink = `http://api.github.com/users/` + user;
      console.log(requestLink)
      userListRequest.push(axios.get(requestLink,  { headers: { 'Authorization': token }}))
    }
    Promise.all(userListRequest)
      .then(values => {
        //console.log(values)
        let userProfileList = []
        for(let item of values) {
          userProfileList.push(createUserProfile(item.data))
        }
        Promise.all(userProfileList)
          .then (result => {
           // console.log(result)
            res.json(result)
          })
      })
  })

  return router
}
