
import { Intern } from "../../models/intern.js"
import { Staff } from "../../models/staff.js"

export const staffunderintern = async (req,res)=>{

    const{id}=req.params
    const staff = await Staff.findById(id)
    if(!staff){
      return res.status(404).json({message:"staff not found"})
    }

    const intern = await Intern.find({batch:staff.batch}).populate("seat").populate({
      path: "batch",
      populate:{
        path:"advisor"
      }  })
     
    res.status(200).json(intern);
    
  
  }

