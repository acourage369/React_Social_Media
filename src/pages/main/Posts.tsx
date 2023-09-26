import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Post as IPost } from './Main';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

interface Props {
    post: IPost,
} 

interface Like {
    likeId: string,
    userId: string,
}

const Posts = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);

    //saving the like amount in a state
    const [likes, setLikes] = useState<Like[] | null>(null);

    // Creating a postsRef collection
    const likesRef = collection(db, "likes")

    //Using querry to get the specific like
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    //getting the likkes functin
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));
    };

    //the adding likes function
    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {userId: user?.uid, postId: post.id});

            // updating the llike UI
            if (user) {
                setLikes((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    //the removing likes function
    const removeLike = async () => {
        try {
            //query to remove specific like
            const liketoDeleteQuery = query(
                likesRef, 
                where("postId", "==", post.id), 
                where("userId", "==", user?.uid));

            const likeToDeleteData = await getDocs(liketoDeleteQuery);

            const likeId = likeToDeleteData.docs[0].id;
            //getting the specific document you want to delete 
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);

            // updating the llike UI
            if (user) {
                setLikes((prev) => prev &&  prev.filter((like) => like.likeId !== likeId));
            }
        } catch (err) {
            console.log(err);
        }
    }

    //looping through the likes
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    //getting the likes only when the component is mounted not on every refresh
    useEffect(() => {
        getLikes();
    }, [])

    return (
        <div className="posts">
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
                {likes && <p>Likes: {likes?.length}</p>}
            </div>

        </div>
    );
}
 
export default Posts;