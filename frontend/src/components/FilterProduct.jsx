import React from 'react';
import {CiForkAndKnife} from "react-icons/ci";
import {BsFillBasket2Fill} from "react-icons/bs"


const FilterProduct = ({category ,onClick, isActive  }) => {
  return (
    
         <div onClick={onClick} >
           <div className= {`text-3xl p-3 rounded-full ${ isActive ? "bg-red-500":"bg-slate-500 " } `}   > 
              <BsFillBasket2Fill/>
         
           </div> 
          <p className='text-center font-medium my-1 capitalize '> {category} </p>
              
         </div>
           

          //  https://buy.stripe.com/test_9AQ3dndTM9Rjb1CdQQ

  )
}

export default FilterProduct