import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../components/CartProduct';
import emptycart from "../assest/emptycart.avif";

import {toast} from "react-hot-toast";
import  { loadStripe } from "@stripe/stripe-js";
import {useNavigate} from "react-router-dom";

// require('dotenv').config();


const Card = () => {
       
     const productCartItem=useSelector((state)=>state.product.cartItem) 
     console.log(productCartItem);  
       
         
     const user=useSelector(state=>state.user);
     console.log(user);

       const navigate=useNavigate()
       


     const totalPrice=productCartItem.reduce((acc,curr)=>acc + parseInt(curr.total) ,0)
    const totalQty=productCartItem.reduce((acc,curr)=>acc + parseInt(curr.qty) ,0)

       

      const handlePayment=  async()=>{
            
           if(user.email){
            console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

            const stripePromise=await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);   
                         
               const res=await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/checkoutpayment`,{
                method:"POST",
                headers:{
                 "content-type":"application/json"
                 },
                 body:JSON.stringify(productCartItem)  
   
               } )
                  
               if(res.statusCode===500) return;
               const data =await res.json();
  
               toast("Redirect to payment gateway...!");  
                stripePromise.redirectToCheckout({sessionId:data})  
  
           }  
           else{      
                    toast("you first have to login");
                       setTimeout(()=>{
                        navigate("/login");
                       },1000)
           }
      
               
             }

  return ( 
      
      <>   
          
    <div className='p-2 md:p-4 ' >   
        <h2 className='text-lg md:text-2xl  font-bold text-slate-600' >
            Your Cart Items
        </h2>
          
        {  productCartItem[0] ?
            <div  className=' my-4  flex gap-4  '>
                      {/* display cart items  */}
                           <div className=' w-full max-w-3xl '> 
                                {
                                  productCartItem.map((el,index)=>{
                                    return(
                                      <CartProduct    
                                         key={el._id}
                                         id={el._id}
                                         name={el.name}
                                         image={el.image}
                                         category={el.category}
                                         qty={el.qty}
                                         total={el.total}
                                         price={el.price}
                                      />
                                         )
                                  })
                                }
                              </div>
                  

                          {/* total cart tem  */}
                          <div className=' w-full max-w-md ml-auto '>  
                            <h2 className=' text-white p-2 text-lg bg-slate-300 rounded-md ' >  Summay </h2>

                              <div className='flex w-full py-2 text-lg border-b'  > 
                                 <p> Total Qty :     </p> 
                                  <p  className=' ml-auto w-32 font-bold ' > {totalQty} </p>
                              </div>
                              <div   className='flex w-full py-2 text-lg border-b' > 
                                 <p> Total Price : </p> 
                                  <p className=' ml-auto w-32 font-bold ' >  <span className='text-red-500' > ₹</span>{totalPrice}  </p>
                              </div>

                              <button  className='bg-red-500 w-full py-1 text-lg font-bold text-white  rounded-md '  onClick={handlePayment}   > Payment </button>
                          </div>
            </div>
            :   
            <>   
                <div className='  flex  w-full  justify-center items-center  ' >  
                  <img src={emptycart} alt=""  className='w-full max-w-sm'  />
                </div>
            </>
              }
    </div>
  
    </>
  )
}

export default Card