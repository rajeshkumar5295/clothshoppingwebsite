import React, { useState } from "react";
import logo from "../assest/rajesh.jpg";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import {HiOutlineUserCircle} from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";


const Header = () => {
           
        const [showMenu,setShowMenu]=useState(false);
     
            const handleShowMenu=()=>{
              setShowMenu(preve => !preve)
            }
                  
         const userData=useSelector((state)=>state.user)
         console.log(userData.email);


          
         const dispatch=useDispatch();
             
        const hadleLogout =()=>{   

          dispatch(logoutRedux());
          toast("Logout successfully");
           
        }
              
                   
        console.log(process.env.REACT_APP_ADMIN_EMAIL);
        // console.log(process.env.STRIPE_SECRET_KEY);
        // console.log(process.env.REACT_APP_ADMIN_NAME);
        const cartItemNumber=useSelector((state)=>state.product.cartItem)
           
  return (
    <header className="flex  shadow-md w-full h-16 px-2 md:px-4  sticky  z-50 bg-white  ">
      {/* desktop */}

      <div className="flex items-center h-full  w-full justify-between mr-5 ">
       
        <Link to="/">
          <div className="h-16">
            <img src={logo} alt="" className="h-16" />
          </div>
        </Link>

        <div className="flex justify-between  items-center gap-4 md:gap-6  " >
          <nav className="list-none flex  gap-4 md:gap-6  text-base md:text-lg  md:flex  " >
             <Link to="/" > <li> Home  </li>  </Link>
             <Link to="/menu/646eb8d9b03dca8e5a225a55" > <li> Menu  </li>  </Link>
             <Link to="/about" > <li> About  </li>  </Link>
             <Link to="/contact" > <li> Contact  </li>  </Link>
              
          </nav>

         <Link to="/card"  >  
           <div className="text-2xl text-slate-600  relative " >
            
            <BsCartFill></BsCartFill>
              <div   className=" absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 text-sm text-center  rounded-full m-0 p-0 ">
                { cartItemNumber.length}
              </div>

          </div>
        </Link>


          <div className=" text-slate-600"  onClick={handleShowMenu}  >
                <div className=" text-3xl cursor-pointer  w-7 h-7 rounded-full overflow-hidden drop-shadow      "  >   
                
                  {    
                      userData.image?<img src={userData.image}  className="w-full h-full" />: <HiOutlineUserCircle /> 
                     
                  }
                
                
                  </div>
                {
                    showMenu && (


                      <div  className="absolute  right-2 bg-white py-2 px-2 shadow  drop-shadow-md flex flex-col  " >
                         {
                             userData.email ===process.env.REACT_APP_ADMIN_EMAIL && <Link to="/product" > <p className="whitespace-nowrap cursor-pointer "  >New Product</p></Link>
                         }
                          
                     
                        
                        {
                          userData.image? <p  className="cursor-pointer " onClick={hadleLogout}  >Logout ({userData.firstName})      </p>:<Link to="/login"> <p className="whitespace-nowrap cursor-pointer "  >Login  </p></Link>
                       
                        }
                         
                         </div>

                    )
                }
          </div>
        </div>

      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
