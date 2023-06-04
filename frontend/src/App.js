import React, { useEffect } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
 
 import toast,{Toaster} from "react-hot-toast";
 import { setDataProduct } from "./redux/productSlice";
import { useDispatch, useSelector } from "react-redux";



function App() {


        //  console.log("hi")
        //  console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

           const dispatch=useDispatch();

           
              
             //getting data from server 
            useEffect(()=>{
                    (  
                       async ()=>{
                               const res=  await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
                               const resData=await res.json();
                               console.log(resData);
                             dispatch(setDataProduct(resData));
                        }
                      )()
              },[])

            const productData=useSelector((state)=>state.product);
            console.log(productData);
  return (
            <>    
                 <Toaster/>
                
                  <div>
           <Header/>

           <main className="pt-1  bg-slate-100  min-h-screen "  >
                 <Outlet></Outlet>

           </main>
      
    </div>
            </>
  
  );
}

export default App;
