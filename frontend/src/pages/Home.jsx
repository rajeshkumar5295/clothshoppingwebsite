import React, { useEffect } from 'react';
import delivery from "../assest/ddd.png";
import HomeCard from '../components/HomeCard';
import { useSelector } from 'react-redux';
import CardFeatures from '../components/CardFeatures';
 
import {GrPrevious} from "react-icons/gr"
import {GrNext} from "react-icons/gr"
import { useRef } from 'react';

import FilterProduct from '../components/FilterProduct';

import { useState } from 'react';
import AllProduct from '../components/AllProduct';
const Home = () => {

          const productData=useSelector((state)=>state.product.productList)
          console.log(productData);
          const homeProductCartList=productData.slice(7,11);
          const homeProductCartListVegtables=productData.filter(el=>el.category==="vegitable",[])
          console.log(homeProductCartListVegtables)

       const loadingArray=new Array(4).fill(null);
       const loadingArrayFeature=new Array(10).fill(null);


      const slideProductRef=useRef();
     const nextProduct=()=>{
          slideProductRef.current.scrollLeft +=200
          }    
     const preveProduct=()=>{
      slideProductRef.current.scrollLeft -=200
            
     }

     const categoryList=[ ...new Set(productData.map(el=>el.category))]
     console.log(categoryList);
     
      // filter data displ
      // const [filterby,setfilterBy]=useState("");
      const [dataFilter,setDataFilter]=useState(productData)
     
      useEffect(()=>{
           setDataFilter(productData);
      } ,[productData] )



     
      const handleFilterProduct =(category)=>{
        const filter=productData.filter(el=>el.category.toLowerCase()===category.toLowerCase())
        setDataFilter(()=>{
          return [
            ...filter
          ]
        })
      }

            
  return (
    <div className='p-2 md:p-4 '  >   
            <div className='md:flex gap-5 py-2 ' >

                   {/* left part of abobe section */}
                     <div className=" md:w-1/2 ">
                           
                           <div className=' flex gap-5 bg-slate-300 w-36 px-2 items-center rounded-full ' >
                                <p className='text-sm font-medium  text-slate-900  '  >Bike Delivery </p>
                                <img src={delivery} alt="" className='h-5 rounded-full ' />
                           </div>
                         <h2 className=' text-4xl  md:text-7xl  font-bold py-3
                         ' >The Fastest  Delivery in <span     className='text-blue-900 '  >Your Home</span></h2>
                          
                          <p className='py-3 text-base ' >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex dolor aut provident at commodi eligendi laudantium facilis quasi? Quibusdam cum possimus labore impedit sapiente! Nulla quasi eligendi repellendus. Iure enim debitis ab officiis ex architecto iusto, expedita ad. Omnis consequatur mollitia quibusdam inventore obcaecati assumenda.</p>

                          <button className='font-bold bg-red-500  text-slate-200 px-4 py-2  rounded-md' >Order Now </button>
            
                     </div>


                        {/* right part of above section  */}
                     <div className='md:w-1/2  flex flex-wrap gap-4 p-4 justify-center '>
 
                      {
                        homeProductCartList[0] ? homeProductCartList.map(el=>{
                          return (
                            <HomeCard  
                              key={el._id+"hunuman"}
                              id={el._id}
                               image={el.image}
                               name={el.name}
                               price={el.price}
                               category={el.category}
                            />
                          ) 
                        }):
                        loadingArray.map((el,index) =>{
                          return(
                            <HomeCard    
                              key={index}
                              loading={"Loading..."}
                            />
                          )
                        })
                      } 
                       </div>

                  
            </div> 

                  
                {/* Bottom section of cart start here */}
             <div className='' >
                     <div  className='flex w-full items-center ' > 

                       <h2 className='font-bold text-2xl text-slate-800 underline mb-4  '  >Fresh Vegitables </h2> 
                        <div className='ml-auto flex gap-4  ' >  
                          
                           <button  onClick={preveProduct}   className='bg-slate-300 hover:bg-slate-400 text-lg  p-2 rounded' > <GrPrevious/>   </button> 
                           <button   onClick={nextProduct}  className='bg-slate-300 hover:bg-slate-400 text-lg  p-2 rounded  ' > <GrNext/> </button>
                        </div>

                     </div>
                       <div className='flex gap-5 overflow-scroll scrollbar-none  scroll-smooth transition-all '  ref={slideProductRef}     >
                            {   homeProductCartListVegtables[0]?
                              homeProductCartListVegtables.map(el=>{ 
                                return(
                                  <CardFeatures  
                                      key={el._id+"vegitable"  }
                                      name={el.name}  
                                      id={el._id}
                                      category={el.category}
                                      price={el.price}
                                      image={el.image}

                                  />
                                )
                               }) : 
                               loadingArrayFeature.map((el,index)=>(
                               <CardFeatures 
                                loading="Loading..." 
                                key={index+"caartLoading"}
                                />
                               
                                
                                )
                                 )  
                            }
                          
                           
                  </div>
             </div>

       
  {/* Your Products section start here */}

                    
                    
                  {/* <div  className='my-5'  > */}
                <h2 className='font-bold text-2xl text-slate-800 underline mb-4 '  > Your Products  </h2>
                   
                    <div className='flex gap-4  justify-center  overflow-scroll  scrollbar-none  cursor-pointer my-4 ' >

                      {
                     categoryList[0] && categoryList.map(el => {
                      return ( 
                        <FilterProduct  category={el}  onClick={ ()=> handleFilterProduct(el) }   />
                      )
                     })
                          }

                   </div>  
                    
                    {/* displaying product  */}
                       
                       <div className=' flex flex-wrap justify-center  gap-3  ' > 
                             {
                                dataFilter.map(el=>{
                                  return(
                                    <CardFeatures 
                                          key={el._id}
                                          id={el._id}
                                          image={el.image}
                                          name={el.name}
                                          price={el.price}
                                          category={el.category}  
                                    />
                                  )
                                })
                             }
                        </div>
                     {/* </div> */}
                     
                     {/* <AllProduct heading={"Your Products"}  /> */}
              
    </div>
  )
}

export default Home;  