import './App.css'
import ResetPassword from "./components/ResetPassword.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import HomePage from "./components/Homepage.jsx";
import {Route, Routes} from "react-router";
import Admin from './components/Admin.jsx';
import CategoryCard from "./components/Categories.jsx"
import Index from './components/Index.jsx';
import ShoppingCart from './components/cart.jsx';
import Electronics from './components/Electronics.jsx';
import Fashion from './components/Fashion.jsx';
import Product from './components/product.jsx';
import CheckoutForm from './components/checkout.jsx';
function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path='/categories' element={<CategoryCard/>}/>
                <Route path='/homepage' element={<Index/>}/>
                <Route path= "/cart" element ={<ShoppingCart/>}/>
                <Route path='/electronics' element={<Electronics/>}/>
              <Route path='/fashion' element={<Fashion/>}/>
              <Route path="/products" element ={<Product/>}/>
              <Route path="/checkout" element ={<CheckoutForm/>}/>
            </Routes>

        </>
    )
}

export default App
