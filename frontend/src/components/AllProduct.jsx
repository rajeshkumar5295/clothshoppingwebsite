import React from 'react';
import FilterProduct from './FilterProduct';
import CardFeatures from './CardFeatures';
  import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

const AllProduct = ({heading , loading}) => {

    const productData=useSelector((state)=>state.product.productList)


    const categoryList=[ ...new Set(productData.map(el=>el.category))]
    console.log(categoryList);
      
    const [filterby,setFilterBy]=useState("");
    const [dataFilter,setDataFilter]=useState(productData)
     
    useEffect(()=>{
         setDataFilter(productData);
    } ,[productData] )



   
    const handleFilterProduct =(category)=>{
      setFilterBy(category)
      const filter=productData.filter(el=>el.category.toLowerCase()===category.toLowerCase())
      setDataFilter(()=>{
        return [
          ...filter
        ]
      })
    }
     
    
    const loadingArrayFeature=new Array(10).fill(null);

  return (
   
    <div  className='my-5'  >
    <h2 className='font-bold text-2xl text-slate-800 underline mb-4 '  > {heading}  </h2>
       
        <div className='flex gap-4  justify-center  overflow-scroll  scrollbar-none  cursor-pointer my-4 ' >

          {
         categoryList[0] ? (  categoryList.map(el => {
          return ( 
            <FilterProduct 

             category={el}  
              onClick={ ()=> handleFilterProduct(el) }  
               key={el} 
               isActive={el===filterby}
               
               />
          )
         }) ) :  (
            <div  className='min-h-[150px]  flex  justify-center items-center   '  >  
                <p> {loading} </p>
               </div>
         )
             
          }

       </div>  
        
        {/* displaying product  */}
           
           <div className=' flex flex-wrap justify-center  gap-3  ' > 
                 { dataFilter[0] ?
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
                    }) : 
                    loadingArrayFeature.map((el ,index)=> (<CardFeatures 
                      loading="Loading..."   key={index+"allproduct"} />  )) }
                 
            </div>

    </div>
  )
}

export default AllProduct