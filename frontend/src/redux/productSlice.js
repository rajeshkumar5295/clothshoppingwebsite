import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState={
    productList:[],
    cartItem:[]
}
    

export const productSlice=createSlice({
     name:"product",
     initialState,
     reducers:{
         setDataProduct:(state,action)=>{
            console.log(action)
            state.productList=[...action.payload]
         },

         addCartItem:(state,action)=>{
               console.log(action)
               
               const check=state.cartItem.some((el)=>el._id===action.payload._id);
               console.log(check)
                if(check){
                         toast("Already Item in Cart");
                } else{
                   
                    const total=action.payload.price;
                    state.cartItem=[...state.cartItem,{...action.payload,qty:1,total:total}]
                    toast("Item Add successflly")
                }
  },

         deleteCartItem:(state,action)=>{
                  console.log(action.payload)

                  toast("one Item Deleted")
                  const index=state.cartItem.findIndex((el)=>el._id===action.payload)
                  state.cartItem.splice(index,1)
                  console.log(index) 

         },
         increaseQty:(state,action)=>{
              console.log(action);
              const index=state.cartItem.findIndex((el)=>el._id===action.payload)
              console.log(index)
              let qty=state.cartItem[index].qty
              const qtyInc=++qty
              state.cartItem[index].qty=qtyInc;

              const price=state.cartItem[index].price
              const total=price*qtyInc;

              state.cartItem[index].total=total ; 


             
         },
         decreaseQty:(state,action)=>{ 

            console.log(action);
            const index=state.cartItem.findIndex((el)=>el._id===action.payload)
            // console.log(index)
            let qty=state.cartItem[index].qty
            if(qty>1){
                const qtyDec=--qty
                state.cartItem[index].qty=qtyDec;

                const price=state.cartItem[index].price
                const total=price*qtyDec;
  
                state.cartItem[index].total=total ; 
            }
           
            
         }

     }
})

export const {setDataProduct,addCartItem,deleteCartItem ,increaseQty,decreaseQty }=productSlice.actions
export default productSlice.reducer