import './Photo.css';
import { uploads } from '../../utils/config';

//components
import Message from '../../components/Message';
import { Link, useParams } from 'react-router-dom';
import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer';

//hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

//redux
import { getPhoto, like, comment } from '../../slices/photoSlice';

const Photo = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth); //pega o usuario logado
    const { photo, loading, error, message } = useSelector((state) => state.photo);

    console.log(photo);
    const resetMessage = useResetComponentMessage(dispatch);

    //comentarios
    const [commentText, setCommentText] = useState("");

    //load photo data
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    //insert a like
    const handleLike = () => {
        dispatch(like(photo._id));
        resetMessage();
    };

    //insert a comment
    const handleComment = (e) => {
        e.preventDefault();

        const commentData = {
            comment : commentText,
            id : photo._id
        }
        dispatch(comment(commentData))
        setCommentText("")
        resetMessage();
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div id="photo">
            {photo && (
                <>
                    <PhotoItem photo={photo} />
                    <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                    <div className='message-container'>
                        {error && <Message msg={error} type="error" />}
                        {message && <Message msg={message} type="success" />}
                    </div>
                    <div className='comments'>
                        <h3>Comentários: ({photo.comments ? photo.comments.length : 0}) </h3>
                        <form onSubmit={handleComment}>
                            <input
                                type="text"
                                placeholder='Insira seu comentário'
                                onChange={(e) => setCommentText(e.target.value)}
                                value={commentText || ""}
                            />
                            <input type="submit" value="Enviar" />
                        </form>
                        {photo.comments && photo.comments.length === 0 && <p>Não há comentários.</p>}
                        {photo.comments && photo.comments.map((comment) => (
                            <div className='comment' key={comment.comment}>
                                <div className='author'>
                                    {comment.userImage && (
                                        <img src={`${uploads}/users/${comment.userImage}`} alt={comment.userName} />
                                    )}
                                    <Link to={`/users/${comment.userId}`}>
                                        <p>{comment.userName}</p>
                                    </Link>
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Photo;
