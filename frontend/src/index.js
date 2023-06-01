import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";

import Home from "./pages/Home";
import Menu from './pages/Menu';
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from './pages/Login';
import Product from './pages/Product';
import Signup from './pages/Signup';
import Card from './pages/Card';
import Success from './pages/Success';




import {store} from './redux/store'
import { Provider } from 'react-redux'
import Cancel from './pages/Cancel';


const router=createBrowserRouter(
    createRoutesFromElements(
       <Route  path='/' element={<App/>}  >

         <Route  index element={ <Home/> }  />
         {/* <Route     path='/menu'  element={ <Menu/> } /> */}
         <Route   path='menu/:filterby'  element={<Menu/>}  />
         <Route   path='/about' element={ <About/> } />
         <Route  path='/contact' element={ <Contact/> } />
         <Route  path='/login'  element={<Login/>}  />
         <Route   path="/product" element={<Product/>} />
         <Route   path="/signup" element={<Signup/>} />
         <Route  path='/card' element={<Card/>}  />
         <Route   path='/success' element={<Success/>}  />
         <Route   path='/cancel' element={<Cancel/>}   />


       </Route>
       
       
          
       
       
       
       
       
    )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
       
  <Provider  store={store}  >
    <RouterProvider  router={router}   />
  </Provider>



);


