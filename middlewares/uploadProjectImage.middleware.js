import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/tmp')
    }, 
    filename: function (req, file, cb){
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    } else {
        cb(new Error('El archivo debe ser una imagen'), false)
    }
}

const uploadProjectImage = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

export default uploadProjectImage