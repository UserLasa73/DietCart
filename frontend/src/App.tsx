import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import MealPlans from './pages/MealPlans';
import Groceries from './pages/Groceries';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import CreateDietType from './pages/CreateDietType';
import EditDietType from './pages/EditDietType';


export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Admin" element={<AdminDashboard />} />
            <Route path="/admin/products/create" element={<CreateProduct />} />
            <Route path="/admin/products/edit/:id" element={<EditProduct />} />
            <Route path="/admin/diet-types/create" element={<CreateDietType />} />
            <Route path="/admin/diet-types/edit/:id" element={<EditDietType />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-100 p-4 text-center text-gray-600">
           {new Date().getFullYear()} DietCart - All rights reserved
        </footer>
      </div>
    </Router>

  );
}