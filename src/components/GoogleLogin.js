import { GoogleLogin } from 'react-google-login';
const clientId = "136010808221-qcqe91l44c3i8060ib6novlgnmjkc8ot.apps.googleusercontent.com";

function LoginGoogle(){
    const onSuccess =(res)=>{
        console.log(res.profileObj);
    }
    const onFailure =(res)=>{
        console.log(res);
    }
    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />
        </div>
    )
}
export default LoginGoogle;