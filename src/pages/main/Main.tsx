import { getDocs, collection } from "firebase/firestore";
import { db } from '../../config/firebase';
import { useState, useEffect } from "react";
import Posts from "./Posts";

//specifying the varible type with interface
export interface Post {
    id: string,
    userId: string,
    title: string,
    username: string,
    description: string,
}

const Main = () => {
    const [postList, setPostList] = useState<Post[] | null>(null);
    //db file fron firestore
    const postsRef = collection(db, "posts");
    
    //fetching data from the db file
    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);
    }

    //Get the posts once the the component is mounted 
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="main">
            {postList?.map((post) => {
                return <Posts post={post} />
            })}
        </div>
    );
}
 
export default Main;