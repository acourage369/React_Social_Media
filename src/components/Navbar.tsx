import { Link } from 'react-router-dom';
//can also be used set user details on secreen but does not update when new user logs in.
import { auth } from '../config/firebase';
//updates the currently logged in user with his detials
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const [user] = useAuthState(auth);
    //Log out function
    const logUserOut = async () => {
        await signOut(auth);
    };
    return (
        <div className="navbar">
            <div className="links">
                <Link to='/'>Main</Link>
                {!user ? (<Link to='/login'>Login</Link>) :
                (<Link to='/createpost'>Create Post</Link>)}
            </div>
            
            <div className="current-user">
                {/* this checks that if there is no user, then it should not display anything */}
                {user && (
                    <>
                        <p>{user?.displayName}</p>
                        <img src={user?.photoURL || ""} width="30" height="30" />
                        <button onClick={logUserOut}>Log Out</button>
                    </>
                )}
            </div>
        </div>
    );
}
 
export default Navbar;