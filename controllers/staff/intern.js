import { Intern } from "../../models/intern.js"

export const findnotbookedintern = async(req, res) => {
    const {id}= req.params;

        const internnotbook = await Intern.find({batch:id, "seat": { $exists: false } });
        
        if (!internnotbook || internnotbook.length === 0) {
            return res.status(404).json({ message: "No interns found without a booked seat" });
        }

        return res.status(200).json(internnotbook);

}

