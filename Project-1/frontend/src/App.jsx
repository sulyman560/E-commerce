import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navber from "./components/Navber"
import AllProducts from "./pages/AllProducts"
import ProductCategory from "./pages/ProductCategory"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import AddAddress from "./pages/AddAddress"
import MyOrder from "./pages/MyOrder"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Footer from "./components/Footer"
import Loading from "./pages/seller/Loading"
import Login from "./components/Login"
import { useAppContext } from "./context/AppContext"


function App() {

  const {showUserLogin , isSeller} = useAppContext()

  return (
    <>
      <div className="text-default min-h-screen text-gray-700 bg-white">
        <Navber />

        {
          showUserLogin ? <Login /> : null
        }
        
        <div className="px-6 md:px-16 lg:px-24 xl:px-32">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/products/:category/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/my-orders" element={<MyOrder />} />
            <Route path="/loading" element={<Loading />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
