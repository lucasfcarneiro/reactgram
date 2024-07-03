const Photo = require("../models/Photo")
const User = require("../models/User")

const mongoose = require("mongoose")


//insert a photo, with an user related to it
const insertPhoto = async (req, res) => {

    const { title } = req.body
    const image = req.file.filename

    const reqUser = req.user
    const user = await User.findById(reqUser._id)

    //create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
        //subtitle
    });

    //If photo was created successfully, return data
    if (!newPhoto) {
        res.status(422).json({
            errors: ["Houve um problema, tente mais tarde"]
        });
        return;
    }
    res.status(200).json(newPhoto)
};

//Remove a photo from DB
const deletePhoto = async (req, res) => {

    const { id } = req.params //id da foto pela URL

    const reqUser = req.user // pegar usuario pela requisicao
    try {

        const photo = await Photo.findById(new mongoose.Types.ObjectId(id))  //pegar a foto no model

        //check if photo exists
        if (!photo) {
            res.status(404).json({ errors: ["Foto nao encontrada."] });
            return
        }

        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({ errors: ["Ocorreu um erro."] })
        }

        await Photo.findByIdAndDelete(photo._id)

        res.status(200).json({ id: photo._id, message: "Foto excluida!" })
    } catch (error) {
        res.status(404).json({ errors: ["Foto nao encontrada."] });
        return
    }
};

//Get all photos
const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({})
        .sort([["createdAt", -1]])
        .exec();

    return res.status(200).json(photos)
};

//Get user photos
const getUserPhotos = async (req, res) => {

    const { id } = req.params //pegar o id da URL

    const photos = await Photo.find({ userId: id })
        .sort([["createdAt", -1]])
        .exec()

    return res.status(200).json(photos)
};

//get photo by ID
const getPhotoById = async (req, res) => {
    const { id } = req.params;

    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    //check if photo exists
    if (!photo) {
        res.status(404).json({ errors: ["Foto nao encontrada"] })
        return
    }

    res.status(200).json(photo)
};

//update a photo
const updatePhoto = async (req, res) => {
    const { id } = req.params
    const { title } = req.body

    const reqUser = req.user

    const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

    //check if photo exists
    if (!photo) {
        res.status(404).json({ errors: ["Foto nao encontrada"] })
        return
    }

    //check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
        res.status(422).json({ errors: ["Ocorreu um erro."] })
        return
    }

    if (title) {
        photo.title = title
    }

    await photo.save()
    res.status(200).json({ photo, message: "Foto atualizada com sucesso." })
};

//Like functionality
const likePhoto = async (req, res) => {

    const { id } = req.params

    const reqUser = req.user

    const photo = await Photo.findById(id)

    //check if photo exists
    if (!photo) {
        res.status(404).json({ errors: ["Foto nao encontrada"] })
        return
    }

    //check if user already liked the photo
    if (photo.likes.includes(reqUser._id)) {
        res.status(422).json({ errors: ["Voce ja curtiu a foto."] })
        return
    }

    //put user id in likes array
    photo.likes.push(reqUser._id)
    photo.save()
    res
        .status(200)
        .json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida" })
};

//comment functionality 
const commentPhoto = async (req, res) => {
    const { id } = req.params
    const reqUser = req.user
    const {comment} = req.body

    const user = await User.findById(reqUser._id)
    const photo = await Photo.findById(id)

    //check if photo exists
    if (!photo) {
        res.status(404).json({ errors: ["Foto nao encontrada"] })
        return
    }

    //Put comment in the array of comments
    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId:user._id
    }
    photo.comments.push(userComment)
    await photo.save()

    res.status(200).json({comment: userComment, message: "O comentario foi adicionado"})
}

//Search photos by title
const searchPhotos = async (req,res) => {

    const {q} = req.query

    const photo = await Photo.find({title: new RegExp(q, "i")}).exec(); //busca pelo titulo que contenha o q em qlq lugar da string ignorando case sensitive

    res.status(200).json(photo)
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos
}
