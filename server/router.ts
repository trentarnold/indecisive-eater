const router = require('express').Router();
const userController = require('./controllers/userController');
const favoriteController = require('./controllers/favoriteController')
const googleController = require('./controllers/googleMaps')
// const authMiddleware = require('./middlewares/auth');



// REMOVE-START
//user controllers
router.post('/register', userController.createUser);
router.get('/get', userController.getAll);
router.post('/login', userController.loginUser);
router.get('/favoriteRestaurant/:userId', userController.getFavoriteRestaurants);
//google controllers
router.get('/localRests/:lat/:lng/:dining/:price/:distance', googleController.getLocalRestaurants);
router.get('/restaurantDetails/:restaurantId', googleController.getDetails);
router.get('/restaurantByName/:lat/:lng/:title', googleController.getRestaurantByName)

//favorite controllers
router.post('/createFavoriteRestaurant', favoriteController.createFavoriteRestaurant)
router.get('/getFavoriteRestaurantId/:title', favoriteController.getFavoriteRestaurantId)
router.delete('/removeUserFromFavorites/:userId/:favRestaurantId', favoriteController.removeUserFromFavorites)





// router.get('/getFav', favoriteController.getAll)
// router.post('/favCreate', favoriteController.create);
// router.get('/both', favoriteController.getBoth);
// router.post('/groups/create', userController.createGroup);
// router.post('/groups/addUser', userController.addUserToGroup);
// router.get('/image/:imageReference', googleController.getImage);
// router.post('/login', userController.login);
// router.post('/logout', authMiddleware, userController.logout);
// REMOVE-END

module.exports = router;