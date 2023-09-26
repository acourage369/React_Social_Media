import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from '../../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

//determining the type of variables with interface
interface CreateFormData {
    title: string;
    description: string;
}

const CreateForm = () => {
    //grabbing the user details
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    //creating the yup schema
    const schema = yup.object().shape({
        title: yup.string().required("Yoo dude add a title!"),
        description: yup.string().required("For real! add a description"),
    });

    //merging the form and yup with the yuResolver
    const {register, handleSubmit, formState: { errors }} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    // Creating a postsRef collection
    const postsRef = collection(db, "posts")

    //the submit function
    const onCreateForm = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            //getting everything from the data or spread operator
            ...data,
            // title: data.title,
            // description: data.description,
            username: user?.displayName,
            userId: user?.uid,
        })

         // Show an alert message
        alert("Post submitted successfully!");

        //Navigating to the home page immediately after submission
        navigate('/');
    }

    return (
        <div className="create-form">
            <form action="" onSubmit={handleSubmit(onCreateForm)}>
                <input type="text" placeholder="Title..." {...register("title")} />
                <p style={{color: "red"}}>{errors.title?.message}</p>
                <textarea placeholder="Description..." {...register("description")} />
                <p style={{color: "red"}}>{errors.description?.message}</p>
                <input type="submit" className="submit-form-button"/>
            </form>
        </div>
    );
}
 
export default CreateForm;