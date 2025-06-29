import Lottie from "lottie-react";
import loignLottie from '../../assets/lottie/login.json';
import { useContext } from "react";
import AuthContecxt from "../../context/AuthContext";
import SocialLogin from "../../shared/SocialLogin";
import { useLocation, useNavigate } from "react-router-dom";


const SignIn = () => {

    const {signInUser} = useContext(AuthContecxt);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/';

    const handleSignIN = e =>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signInUser(email, password)
    .then((result) =>{
        console.log(result.user);
        navigate(from);
    })
    .catch(error => console.log(error.message));
    
  }

  
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={loignLottie}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl font-bold ml-8 mt-4">Sign In now!</h1>
          <form onSubmit={handleSignIN} className="card-body">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Sign In</button>
          </form>
        <SocialLogin></SocialLogin>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
