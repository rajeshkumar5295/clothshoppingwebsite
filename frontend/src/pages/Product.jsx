import React, { useState } from 'react';
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import { toast }  from "react-hot-toast" 
 
const Product = () => {
       
        const [data,setData]=useState({
              name:"",
              category:"",
              image:"",
              price:"",
              description:"",
        })
         
          const handleOnChange=(e)=>{
            const {name,value}=e.target
            setData((preve)=>{
              return{
                ...preve,
                [name]:value
              }
            })
             
          }


   const uploadImage= async(e)=>{
          const data = await  ImagetoBase64(e.target.files[0])
          setData((preve)=>{
            return{
              ...preve,
              image:data 
            }
          })
          // console.log(data)
   }

   const handleSubmit=async(e)=>{
    e.preventDefault();
        console.log(data);

         const {name,image,category,price}=data 
         if(name && image && category && price)
         {
             const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
             method:"POST",
             headers:{
              "content-type":"application/json"
              },
              body:JSON.stringify(data)

            } )
                  
         //data coming form server
         const fetchRes =await fetchData.json()
         console.log(fetchRes)
         toast(fetchRes.message)

          setData(()=>{
            return{
              name:"",
              category:"",
              image:"",
              price:"",
              description:"",
            }
          })




         } else{    
           toast("Enter required fields");
         }

      }
     
    
       
  return (
    <div  className='p-4 ' >      
      <form className='  m-auto w-full max-w-md shadow flex flex-col p-3   bg-white ' onSubmit={handleSubmit}   >
          <label htmlFor="name">Name</label>
          <input type="text" name='name' className='bg-slate-200 p-1  ' onChange={handleOnChange} value={data.name }      />
                    
         <label htmlFor='category'   > Category </label>

          <select name="category" id="" className='bg-slate-200 p-1 my-1 '    onChange={handleOnChange}  value={data.category}  >
            <option value="other">select category </option>
            <option value="shirt"> Shirt </option>
            <option value="T-shits" > T-Shirts </option>
            <option value="Sarees"  > Sarees </option>
            <option value="Jeans top" >Jeans top </option>
            <option value="Jeans" > Jeans </option>
             <option value="Trousers" > Trousers </option>
           {/* <option value="rice">Rice</option>
            <option value="cake">Cacke</option>
            <option value="Burger">Burger</option>
            <option value="Panner">Panner</option>
            <option value="fast food"> fast food </option> */}

          </select>
          
           
           <label htmlFor="image"> Image  
        <div className='h-40 w-full bg-slate-300   rounded flex items-center justify-center cursor-pointer ' >
                     
                     {
                      data.image? <img src={data.image} alt=""className='h-full' />:  <span  className='text-5xl'  > <BsCloudUpload/>  </span>
                     }

             
              <input type="file"  id='image' accept='image/*'   onChange={uploadImage}  className='hidden'   />
        </div>
        </label>
            
           
              <label htmlFor="price"  className='my-1' > Price  </label>
              <input type="text"  className='bg-slate-200 p-1 my-1' name="price" onChange={handleOnChange}  value={data.price}  />

              <label htmlFor="description"> Description  </label>
              <textarea name="description" id="" cols="30" rows="5" className='bg-slate-200  p-1 my-1  ' onChange={handleOnChange}  value={data.description}  ></textarea>

                <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium drop-shadow  mt-2'  >Save</button>
      </form>
        
    </div>
  )
}

export default Product