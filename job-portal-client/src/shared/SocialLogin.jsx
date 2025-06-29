import React, { useContext } from 'react';
import AuthContecxt from '../context/AuthContext';

const SocialLogin = () => {
    const {signInWithGoogle} = useContext(AuthContecxt);


    const handleGoogelSignIn = () =>{
        signInWithGoogle()
        .then((result) => console.log(result.user))
        .catch(err => console.error(err.message))
    }

    return (
        <div className="m-auto mb-4">
            <div className="divider">Or</div>
            <button onClick={handleGoogelSignIn} className='btn'>Google</button>
        </div>
    );
};

export default SocialLogin;