import Header from "../components/Header"
import Signup from "../components/SignupComponent"
export default function LoginPage(){
    return(
        <>
             <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <Signup/>
        </>
    )
}