// var express = require("express");
// import React from 'react'
// const bodyParser = require("body-parser");
// var user = require("../models/User")
// // const authenticate = require("../authenticate");
// var favrouter = express.Router();
// var Fav = require("../models/favorites");
// favrouter.use(bodyParser.json());
// favrouter
//   .route("/")
//   .get(authenticate.verifyUser, (req, res, next) => {
//     Fav.findOne({ user: req.user._id })
//       .populate("user")
//       .populate("music")
//       .exec((err, favourites) => {
//         if (err) return next(err);
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json(favourites);
//       });
//   })
//   .post(authenticate.verifyUser, (req, res, next) => {
//     Fav.findOne({ user: req.user._id }, (err, favorite) => {
//       if (err) return next(err);
//       if (!favorite) {
//         Fav.create({ user: req.user._id })
//           .then((favorite) => {
//             for (i = 0; i < req.body.length; i++)
//               if (favorite.music.indexOf(req.body[i]._id))
//                 favorite.music.unshift(req.body[i]);
//             favorite
//               .save()
//               .then((favorite) => {
//                 Fav.findById(favorite._id)
//                   .populate("user")
//                   .populate("music")
//                   .then((favorite) => {
//                     console.log("Favourite created!");
//                     res.statusCode = 200;
//                     res.setHeader("Content-Type", "application/json");
//                     res.json(favorite);
//                   });
//               })
//               .catch((err) => {
//                 return next(err);
//               });
//           })
//           .catch((err) => {
//             return next(err);
//           });
//       } else {
//         for (i = 0; i < req.body.length; i++)
//           if (favorite.music.indexOf(req.body[i]._id))
//             favorite.music.unshift(req.body[i]);
//         favorite
//           .save()
//           .then((favorite) => {
//             Fav.findById(favorite._id)
//               .populate("user")
//               .populate("music")
//               .then((favorite) => {
//                 console.log("Favourite created!");
//                 res.statusCode = 200;
//                 res.setHeader("Content-Type", "application/json");
//                 res.json(favorite);
//               });
//           })
//           .catch((err) => {
//             return next(err);
//           });
//       }
//     });
//   })
//   .put(authenticate.verifyUser, (req, res) => {
//     res.statusCode = 403;
//     res.setHeader("Content-Type", "text/plain");
//     res.end("PUT opration not supported on /favorites");
//   })
//   .delete(authenticate.verifyUser, (req, res) => {
//     Fav.findOneAndRemove({ user: req.user._id }, (err, resp) => {
//       if (err) return next(err);
//       res.statusCode = 200;
//       res.setHeader("Content-Type", "application/json");
//       res.json(resp);
//     });
//   });

// favrouter
//   .route("/:dishId")
//   .get(authenticate.verifyUser, (req, res) => {
//     Fav.findOne({ user: req.user._id })
//       .then(
//         (favourite) => {
//           if (!favourite) {
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             return res.json({ exists: false, favourites: favourite });
//           } else {
//             if (favourite.music.indexOf(req.params.musicId) < 0) {
//               res.statusCode = 200;
//               res.setHeader("Content-Type", "application/json");
//               return res.json({ exists: false, favourites: favourite });
//             } else {
//               res.statusCode = 200;
//               res.setHeader("Content-Type", "application/json");
//               return res.json({ exists: true, favourites: favourite });
//             }
//           }
//         },
//         (err) => next(err)
//       )
//       .catch((err) => next(err));
//     // res.statusCode = 403;
//     // res.setHeader("Content-Type", "text/plain");
//     // res.end("GET opration not supported on /favorites/" + req.params.dishId);
//   })
//   .post(authenticate.verifyUser, (req, res, next) => {
//     Fav.findOne({ user: req.user._id }, (err, favorite) => {
//       if (err) return next(err);
//       if (!favorite) {
//         Fav.create({ user: req.user._id })
//           .then((favorite) => {
//             favorite.dishes.unshift(req.params.musicId);
//             favorite
//               .save()
//               .then((favorite) => {
//                 Fav.findById(favorite._id)
//                   .populate("user")
//                   .populate("music")
//                   .then((favorite) => {
//                     res.statusCode = 200;
//                     res.setHeader("Content-Type", "application/json");
//                     res.json(favorite);
//                   });
//               })
//               .catch((err) => {
//                 return next(err);
//               });
//           })
//           .catch((err) => {
//             return next(err);
//           });
//       } else {
//         if (favorite.music.indexOf(req.params.musicId) < 0) {
//           console.log("after else enter");
//           favorite.music.unshift(req.params.muicId);
//           favorite
//             .save()
//             .then((favorite) => {
//               Fav.findById(favorite._id)
//                 .populate("user")
//                 .populate("music")
//                 .then((favorite) => {
//                   res.statusCode = 200;
//                   res.setHeader("Content-Type", "application/json");
//                   res.json(favorite);
//                 });
//             })
//             .catch((err) => {
//               return next(err);
//             });
//         } else {
//           (res.statusCode = 403), res.setHeader("Content-Type", "text/plain");
//           res.end("Music " + req.params.music + " already exist");
//         }
//       }
//     });
//   })
//   .put(authenticate.verifyUser, (req, res, next) => {
//     (res.statusCode = 403), res.setHeader("Content-Type", "text/plain");
//     res.end("PUT opration not supported on /favorites/" + req.params.musicId);
//   })
//   //taytal 139
//   .delete(authenticate.verifyUser, (req, res, next) => {
//     Fav.findOne({ user: req.user._id }, (err, favorite) => {
//       if (err) return next(err);
//       var index = favorite.dishes.indexOf(req.params.musicId);
//       if (index >= 0) {
//         favorite.music.splice(index, 1);
//         favorite
//           .save()
//           .then((favorite) => {
//             Fav.findById(favorite._id)
//               .populate("user")
//               .populate("music")
//               .then((favorite) => {
//                 console.log("Favourite Music deleted!");
//                 res.statusCode = 200;
//                 res.setHeader("Content-Type", "application/json");
//                 res.json(favorite);
//               });
//           })
//           .catch((err) => {
//             return next(err);
//           });
//       } else {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "text/plain");
//         res.json("Music " + req.params.musicId + " not in your favourite");
//       }
//     });
//   });
// module.exports = favrouter;

