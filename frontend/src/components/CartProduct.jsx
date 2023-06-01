import React from 'react';
import {TbPlus,TbMinus} from 'react-icons/tb';
import {AiFillDelete} from "react-icons/ai"
import { decreaseQty, deleteCartItem, increaseQty } from '../redux/productSlice';
import { useDispatch } from 'react-redux';
 


const CartProduct = ({id,name,image,category,qty,total,price}) => {
         
      const dispatch=useDispatch();
              
     const handleAddCartProduct=()=>{

     }
        
  return (
    <div  className='bg-slate-200  p-2 flex gap-4 rounded border border-slate-300' >


             <div className='p-3 bg-white rounded  overflow-hidden   ' >   
               <img src={image}  className='h-28 w-40 object-cover ' alt="" />
             </div>
                           
         
                 <div className=' flex flex-col mt-2 ml-2  md:justify-between w-full'> 
                             
                                <div className='flex  justify-between items-center'>
                                     <h3 className='font-semibold text-slate-600  capitalize  text-lg   md:text-xl   ' > { name }  </h3> 
                                    <span className='cursor-pointer text-slate-700 hover:text-red-600' onClick={()=>dispatch
                                    (deleteCartItem(id))}   >   <AiFillDelete/> </span>
                                </div>
                              <p className=' text-slate-500 font-medium  text-base   ' >{category} </p>
                              <p className=' font-bold  md:text-xl  ' >    <span   className='text-red-500' >₹</span><span>{price} </span> </p>


                              <div  className='flex justify-between  '   >
                                     <div  className='flex gap-3 items-center '  >
 
                                  
                                      <button className="bg-slate-500 py-1 mt-2 rounded-md    hover:bg-red-500 p-2"   onClick={()=>dispatch
                                      (increaseQty(id))}   > <TbPlus/> </button>
     
                                          <p   className='font-semibold p-1' > {qty} </p>

                                     <button   onClick={()=>dispatch(decreaseQty(id))}    className="bg-slate-500 py-1 mt-2 rounded-md hover:bg-red-500 p-2  "> <TbMinus/>  </button>

                                     </div>

                                    <div className='flex items-center gap-2 font-bold   text-slate-700 '  >
                                      <p> Total: </p>
                                      <p>  <span className='text-red-500' > ₹</span>{total} </p>
                                    </div>

                              </div>
           
                              
                             
                          </div>
    </div>
  )
}

export default CartProduct