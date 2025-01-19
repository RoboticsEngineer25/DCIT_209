import './App.css'
import ResetPassword from "./components/ResetPassword.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "../SignUp.jsx";
import HomePage from "./components/Homepage.jsx";
import {Route, Routes} from "react-router";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/home" element={<HomePage/>}/>

            </Routes>

        </>
    )
}

export default App
