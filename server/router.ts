const router = require('express').Router();
const userController = require('./controllers/userController');
const favoriteController = require('./controllers/favoriteController')
const googleController = require('./controllers/googleMaps')
// const authMiddleware = require('./middlewares/auth');



// REMOVE-START
router.post('/register', userController.createUser);
router.get('/get', userController.getAll);
router.post('/login', userController.loginUser);
router.get('/getFav', favoriteController.getAll)
router.post('/favCreate', favoriteController.create);
router.get('/both', favoriteController.getBoth);
router.get('/localRests/:lat/:lng/:dining/:price/:distance', googleController.getLocalRestaurants);
router.get('/restaurantDetails/:restaurantId', googleController.getDetails);
router.post('/groups/create', userController.createGroup);
router.post('/groups/addUser', userController.addUserToGroup);
router.get('/groups/:groupId', userController.getGroup);
// router.get('/image/:imageReference', googleController.getImage);
// router.post('/login', userController.login);
// router.post('/logout', authMiddleware, userController.logout);
// REMOVE-END

module.exports = router;