// const users = require('../models/users');
// var id = 1;

// module.exports = {
//     login: (req,res,next)=>{
//         if (users.find(elem=> elem.username==req.body.username && elem.password==req.body.password)) {
//             res.status(200).send({username: req.body.username, password: req.body.passwrod})
//             req.session.user.username = req.body.username
            
//         }
//         else {
//             res.status(500).send("unauthorized")
//         }
//     },
//     register: (req, res, next) => {
//         users.push({id: id, username: req.body.username, password: req.body.password})
//         id++;
//         req.session.user.username = req.body.username
//     },
//     signout: ( req, res, next ) => {
//         req.session.destroy();
//         res.status(200).send( req.session );
//       },
//     getUser: ( req, res, next ) => {
//         res.status(200).send( req.session.user );
//       }
// }


const users = require('../models/users');
let id = 1;

module.exports = {
  login: ( req, res, next ) => {
    const { session } = req;
    const { username, password } = req.body;

    const user = users.find( user => user.username === username && user.password === password );

    if ( user ) {
      session.user.username = user.username;
      res.status(200).send(session.user);
    } else {
      res.status(500).send('Unauthorized.');
    }
  },

  register: ( req, res, next ) => {
    const { session } = req;
    const { username, password } = req.body;

    users.push({ id, username, password });
    id++;

    session.user.username = username;

    res.status(200).send( session.user );
  },

  signout: ( req, res, next ) => {
    const { session } = req;
    session.destroy();
    res.status(200).send( req.session );
  },

  getUser: ( req, res, next ) => {
    const { session } = req;
    res.status(200).send( session.user );
  }
};