const express=require("express");
const router=express.Router();

const userModel=require("../model/userModel");
const adminModel=require("../model/adminModel");

 router.use(express.urlencoded({extended:false}));
 router.use(express.json());

//  user signup
 router.post("/signup", async (req,res)=>{
    const userData= req.body;
    const data= await userModel(userData).save();
    res.json({message:"saved succesfully"});

 })

 //add admin credential
router.post("/admin", async (req,res)=>{
    const userData= req.body;
    const data= await adminModel(userData).save();
    res.json({message:"saved succesfully"});

 })

// user  and admin login
router.post("/login",async (req,res)=>{
    const email=req.body.email;
    const password=req. body.password;
    console.log(email);
    console.log(password);
    const user= await userModel.findOne({email:email});
    try {
        
        if(user){
             try {
                console.log("first")
                if(user.password==password){
                
                   console.log(user)
                    res.json({message:"login successfull"});
                }
                else{
                    res.json({message:"login fails"});
                }
            } 
            catch (error) {
            res.json("error");
            }
        }
        else{
            console.log(email);
            const admin= await adminModel.findOne({email:email});
            console.log(admin)
            if(admin){
                try {
                    if(admin.password==password){
                         console.log(admin)
                         res.json({message:"admin successfull"});
                    }
                     else{
                        res.json({message:"password doesn't match"}); 
                    }
                } 
                catch (error) {
                    res.json("error");
                }
           }
           else{
            res.json({message:"no such user found"}); 
           }
        }
    } 
    catch (error) {
        res.json({message:"no such user"});
    }
   
})

router.post('/user', async (req, res) => {
    try {
        console.log(req.body);
        let item = req.body;
        console.log(req.body.email);
        let email = req.body.email;
        
        // Ensure you await the findOne operation
        let existingUser = await UserDATA.findOne({ email: email });

        // Check if the existingUser is found
        if (existingUser) {
            res.json({ message: "User Already exists, Please try with another email Id" });
        } else {
            console.log('saved');
            const user = new UserDATA(item); // Note: Ensure you use `new` to create a new instance
            await user.save();  
            res.json({ message: "Registered Successfully" });
        }
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router

