import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import {
  SignUpPage, ActivationPage, LoginPage, HomePage,
  ProductPage, BestSellingPage, EventsPage, FaqPage,
  ProductDetailsPage, ProfilePage, CreateSellerPage,
  ShopActivationPage, SellerLoginPage, ShopHomePage,
  ShopDashboardPage, ShopCreateProduct, ShopAllProducts,
  ShopCreateEvents, ShopAllEvents, ShopAllCoupouns, CheckoutPage,
  PaymentPage, OrderSuccessPage, ShopAllOrders, ShopAllRefunds,
  ShopOrderDetails, OrderDettailsPage, TrackOrderPage,
} from './Route.js';
import Store from './redux/store.js';
import { loadSeller, loadUser } from './redux/actions/user.js';
import { useSelector } from 'react-redux';
import Loader from './Loader.js';
import ProtectedRoute from './ProtectedRoute.js';
import SellerProtectedRoute from './SellerProtectedRoute.js';
import { BASE_URL } from './server.js';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const App = () => {
  const { loading: userLoading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading: sellerLoading } = useSelector((state) => state.seller);
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  const [stripeapikey, setStripeApiKey] = useState("")

  const getStripApiKey = async () => {
    try {

      const { data } = await axios.get(`${BASE_URL}/api/v1/payment/stripeapikey`);
      setStripeApiKey(data?.stripeapikey);
    } catch (error) {
      console.log("errror", error);
      window.notify(error.message, "error")

    }
  }

  useEffect(() => {
    getStripApiKey();
  }, [])


  useEffect(() => {
    const initializeApp = async () => {
      try {
        await Store.dispatch(loadUser());
        await Store.dispatch(loadSeller());
        setIsAppInitialized(true); // Indicate that initialization is done
      } catch (error) {
        console.error("Error initializing app:", error);
        setIsAppInitialized(true);
      }
    };

    initializeApp();
  }, []);

  if (userLoading || sellerLoading || !isAppInitialized) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      {/* here to write the strip logic  */}
      {
        stripeapikey && (
          <Elements stripe={loadStripe(stripeapikey)}>
            <Routes>
              <Route path='/payment' element={<PaymentPage />} />
            </Routes>
          </Elements>
        )
      }
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
        <Route path='/shop/activation/:activation_token' element={<ShopActivationPage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/product/:name' element={<ProductDetailsPage />} />
        <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated}><ProfilePage /></ProtectedRoute>} />
        <Route path='/user/order/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated}><OrderDettailsPage /></ProtectedRoute>} />
        <Route path='/user/track/order/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated}><TrackOrderPage /></ProtectedRoute>} />
        <Route path='/best-selling' element={<BestSellingPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/faq' element={<FaqPage />} />
        <Route path='/seller-create' element={<CreateSellerPage />} />
        <Route path='/seller-login' element={<SellerLoginPage />}
        />
        <Route path='/checkout' element={<ProtectedRoute isAuthenticated={isAuthenticated}><CheckoutPage /></ProtectedRoute>} />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path='/seller/:id' element={<SellerProtectedRoute><ShopHomePage /></SellerProtectedRoute>} />
        <Route path='/dashboard' element={<SellerProtectedRoute><ShopDashboardPage /></SellerProtectedRoute>} />
        <Route path='/dashboard-create-product' element={<SellerProtectedRoute><ShopCreateProduct /></SellerProtectedRoute>} />
        <Route path='/dashboard-products' element={<SellerProtectedRoute><ShopAllProducts /></SellerProtectedRoute>} />
        <Route path='/dashboard-orders' element={<SellerProtectedRoute><ShopAllOrders /></SellerProtectedRoute>} />
        <Route path='/dashboard-refunds' element={<SellerProtectedRoute><ShopAllRefunds /></SellerProtectedRoute>} />
        <Route path='/order/:id' element={<SellerProtectedRoute><ShopOrderDetails /></SellerProtectedRoute>} />
        <Route path='/dashboard-create-event' element={<SellerProtectedRoute><ShopCreateEvents /></SellerProtectedRoute>} />
        <Route path='/dashboard-events' element={<SellerProtectedRoute><ShopAllEvents /></SellerProtectedRoute>} />
        <Route path='/dashboard-coupouns' element={<SellerProtectedRoute><ShopAllCoupouns /></SellerProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
