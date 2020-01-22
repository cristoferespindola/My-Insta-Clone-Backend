const routes = require('express').Router()
const multer = require('multer')
const uploadConfig = require('./upload')

const userController = require('../app/controllers/usersController')
const authController = require('../app/controllers/authController')
const postsController = require('../app/controllers/postsController')
const profileController = require('../app/controllers/profileController')

const authMiddleware = require('../app/middlewares/auth')
const upload = multer(uploadConfig)

routes.get('/user', authMiddleware, userController.index.bind(null))
routes.get('/userId', authMiddleware, userController.show.bind(null))
routes.post('/user', userController.save.bind(null))
routes.put('/userupdate', authMiddleware, userController.update.bind(null))

routes.post('/auth', authController.authenticate.bind(null))

routes.get('/posts', authMiddleware, postsController.index.bind(null))
routes.post('/deletepost/:id', authMiddleware, postsController.remove.bind(null))
routes.post(
    '/posts',
    authMiddleware,
    upload.single('photo'),
    postsController.store.bind(null)
)


routes.get('/profile', authMiddleware, profileController.index.bind(null))

module.exports = routes
