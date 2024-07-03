import { api, requestConfig } from '../utils/config'

//publish an user photo
const publishPhoto = async (data, token) => {

    const config = requestConfig("POST", data, token, true)

    try {
        const res = await fetch(api + "/photos", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    }
}

//Get user photo
const getUserPhotos = async (userId, token) => {
    const config = requestConfig("GET", null, token)

    try {

        const res = await fetch(api + "/photos/user/" + userId, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    }
}

//Delete a photo
const deletePhoto = async (photoId, token) => {
    const config = requestConfig("DELETE", null, token)

    try {

        const res = await fetch(api + "/photos/" + photoId, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    }
}

//Update a photo
const updatePhoto = async (data, photoId, token) => {
    const config = requestConfig("PUT", data, token)
    try {
        const res = await fetch(api + "/photos/" + photoId, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res
    } catch (error) {
        console.log(error)
    }
}

//Get a photo by id
const getPhoto = async (id, token) => {
    const config = requestConfig("GET", null, token) //parametro e na URL

    try {
        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res
    } catch (error) {
        console.log(error)
    }
}

//like a photo
const like = async (id, token) => {

    const config = requestConfig("PUT", null, token)

    try {

        const res = await fetch(api + "/photos/like/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res
    } catch (error) {
        console.log(error)
    }
}

//add comment to a photo
const comment = async (data, id, token) => {
    const config = requestConfig("PUT", data, token)

    try {
        const res = await fetch(api + "/photos/comment/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

            return res
    } catch (error) {
        console.log(error)
    }
}

//Get all photos
const getPhotos = async(token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "/photos", config)
            .then((res) => res.json())
            .catch((err) => err);

            return res
    } catch (error) {
        console.log(error)
    }
}

//Search photo by title IMPLEMENTAR DEPOIS POR AUTOR
const searchPhotos = async (query, token) => {

    const config = requestConfig("GET", null, token)
    try {
        const res = await fetch(api + "/photos/search?q=" + query, config)
            .then((res) => res.json())
            .catch((err) => err);

            return res
    } catch (error) {
        console.log(error)
    }
}

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    comment,
    getPhotos, 
    searchPhotos
};

export default photoService; 
