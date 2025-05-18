import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import MealPlans from './pages/MealPlans';
import Groceries from './pages/Groceries';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            
          </Routes>
        </main>
        
        <footer className="bg-gray-100 p-4 text-center text-gray-600">
           {new Date().getFullYear()} DietCart - All rights reserved
        </footer>
      </div>
    </Router>

  );
}