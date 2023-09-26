import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        navigate('/');
    };

    return (
        <div className="login">
            <h1>login Page</h1>
            <p>Sign In With Google</p>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
    );
}
 
export default Login;