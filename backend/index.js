const express =require("express");
const app=express();

const cors=require ("cors");

require('dotenv').config();
const Stripe=require('stripe');

// const router=express.Router();
// const bodyParser=require("body-parser");


app.use(cors());
// app.use(express.json());

app.use(express.urlencoded({extended:true}))


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(router)



app.use(express.json({limit:"10mb"}));

const PORT=process.env.PORT  || 8080;




//database connectivity
const mongoose=require("mongoose");


mongoose.set('strictQuery', true);
// mongoose.set('strictQuery', false);



//  mongoose.connect("mongodb://127.0.0.1:27017/e-comme");
console.log(process.env.MONGODB_URL)
// mongoose.connect(process.env.MONGODB_URL)

mongoose.connect(process.env.MONGODB_URL).then(()=>{console.log("Connected to database")})
.catch((err)=>console.log(err))




const userSchema=new mongoose.Schema({
    firstName:String,
    lastName: String,
    email: {
        type:String,
        unique:true,
    },
    email:String,
    password: String,
    confirmPassword: String,
    image:String
  });

 const userModel=mongoose.model("users" , userSchema)




//  saving the data in database

//    app.post("/signup", async(req,resp)=>{
//        resp.send (req.body);
//     //    console.log(req.body);
//        let data=new userModel(req.body);
//        console.log(data);
//        await data.save();
//    })


app.get("/",(req,resp)=>{
    resp.send("Server is running");
})


//For SignUp 

app.post("/signup",async(req,resp)=>{
    console.log(req.body)
    const {email}=req.body
 
    userModel.findOne({email:email}, (err,result)=>{
        console.log(result)
        console.log(err)
        if(result){
          
            resp.send({message:"Email already exist" ,alert:false  });
            
        }
        else{
            const data=userModel(req.body)
            const save=data.save();
            resp.send({message:"Successfully sign Up",alert:true  })
        }
    }    )

})


//for Sign In
   app.post("/login",(req,resp)=>{
     console.log(req.body);

    const {email}=req.body
    userModel.findOne({email:email},(err,result)=>{
        if(result){
            // console.log(result)
              const dataSend={
                      _id:result._id,
                      firstName:result.firstName,
                      lastName:result.lastName,
                      email:result.email,
                      image:result.image,
              }
              console.log(dataSend)

            resp.send({message:"Login is successfully",alert:true,data:dataSend})
        }else{
            resp.send({message:"Email is not available,please sign up",alert:false});
        }
  })

})


// product section
  
      const schemaProduct=mongoose.Schema({
         name:String,
         category:String,
         image:String,
         price:String,
         description:String ,
      });
      const productModel=mongoose.model("products",schemaProduct);


//  api to  save product in database  
app.post("/uploadProduct",async(req,res)=>{
            console.log(req.body);
           const data= await productModel(req.body)
           const datasave=await data.save();
         res.send({message:"Uploaded successfully"})
})

//api to get data from database
app.get("/product",async(req,resp)=>{
      const data=await productModel.find()
        
        resp.send( JSON.stringify(data) );

        // resp.send("data is coming here from database");
} )



//    Payment Gatway
//   console.log("Hi ")

   console.log(process.env.FRONTEND_URL)
  console.log(process.env.STRIPE_SECRET_KEY)
  console.log("hi Kallu")
  const stripe =new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/checkoutpayment"  ,  async (req,res)=>{
        //   console.log(req.body);
         try{
                 const params={
                     submit_type:'pay',
                     mode:"payment",
                     payment_method_types:['card'],
                     billing_address_collection:"auto",
                     shipping_options:[{shipping_rate:"shr_1NDJVTSHH4T70qiL6ZAXaN5z"}],

                     line_items:req.body.map((item)=>{
                           return{
                                price_data:{
                                 currency:"inr",
                                 product_data:{
                                 name:item.name,
                            // images:[item.image]
                                },
                                unit_amount:item.price*100 
                                 },
                                adjustable_quantity:{
                                enabled:true,
                                  minimum:1,
                             },
                            quantity:item.qty
                            }
                         }),
                  
                //    success_url:`${process.env.FRONTEND_URL}/success `,
                //    cancel_url:`${process.env.FRONTEND_URL}/cancel`,

                    // success_url: 'http://localhost:3000/success',
                    // cancel_url: 'http://localhost:3000/cancel',

                     success_url: 'https://clothshoppingwebsite.vercel.app/success',
                    cancel_url: 'https://clothshoppingwebsite.vercel.app/cancel',

                 
                }
                      
            const session =await stripe.checkout.sessions.create(params)

    
            console.log(session);
            res.status(200).json(session.id)

             // window.setTimeout(checkFlag, 200)
             //console.log(session.id)

             }
          catch(err){
            res.status(err.statusCode||500).json(err.message) 
       }

      console.log("hi pushpa paushlkkkdfsalkjdfslkjfsdlkajdafs");

} )





app.listen(PORT,()=>console.log("server is running at port :" + PORT))








