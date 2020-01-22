require('dotenv').config()
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const s3 = new aws.S3({
	accessKeyId: 'YOUR ACESS KEY',
	secretAccessKey: 'YOUR SECRET KEY',
	Bucket: 'YOUR BUCKET NAME'
});

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, '..', '..', 'uploads'))
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) callback(err)
                file.key = `${hash.toString('hex')}-${file.originalname}`
                callback(null, file.key)
            })
        }
    }),
    s3: multerS3({
        s3: s3,
        bucket: 'YOUR BUCKET NAME',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    callback(err)
                }
                const fileName = `${hash.toString('hex')}-${file.originalname}`
                callback(null, fileName)
            })
        }
    })
}

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'uploads'),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Invalid file type.'))
        }
    }
}
