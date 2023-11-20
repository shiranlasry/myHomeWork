import e from "express";
import { ComplainantModel } from "./complainantModel";

export async function addNewComplainant(req: any, res: any) {
    try {
        console.log('addNewComplainant');

        const { firstName, lastName, phoneNum, streeComplainant, houseNumComplainant, apartmentNumComplainant } = req.body;
        let street , houseNum , apartmentNum;
        if (!firstName || !lastName || !phoneNum ) throw new Error("Please complete all fields");
        if (!streeComplainant) street=""
        else street= streeComplainant
        if (!houseNumComplainant) houseNum=""
        else houseNum= houseNumComplainant
        if (!apartmentNumComplainant) apartmentNum=""
        else apartmentNum= apartmentNumComplainant
        console.log(street,houseNum,apartmentNum);
        
        const complainant = new ComplainantModel({ firstName, lastName, phoneNum, street, houseNum, apartmentNum });
        const complainantDB = await complainant.save();
        console.log(complainantDB)
        res.send({ ok: true, complainantDB });
    } catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}
export async function getComplainants(req: any, res: any) {
    try {
        const complainants = await ComplainantModel.find({});
        res.send({ ok: true, complainants });
    } catch (error) {
        res.send({ error: error.message });
    }
}

export async function getComplainantById(req: any, res: any) {
    try {
        const { _id } = req.query;
        const complainant = await ComplainantModel.findById(_id);
        if (!complainant) throw new Error("complainant not found");
        res.send({ ok: true, complainant });
    } catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}

export async function getComplainantByPhoneNum(req: any, res: any) {
    try {
        console.log('getComplainantByPhoneNum');
        const { phoneNum } = req.query;
        const complainantDB = await ComplainantModel.findOne({ phoneNum });
        if (!complainantDB)  throw new Error("complainant not found");
        // if (complainant.length === 0)  { res.send({ ok: false });}
        console.log('complainantDB ',complainantDB);
        res.send({ ok: true, complainantDB });
    } catch (error) {
        res.send({ error: error.message });
    }
}

export async function getComplainantByAddress(req: any, res: any) {
    try {
        const { street, houseNum, apartmentNum } = req.query;
        if (!street) throw new Error("missing street");
        const complainant = await ComplainantModel.find({ street: street });
        if (!complainant) throw new Error("complainant not found");
        if (houseNum) {
            complainant.filter((complainant: any) => complainant.houseNum == houseNum);
        }
        if (apartmentNum) {
            complainant.filter((complainant: any) => complainant.apartmentNum == apartmentNum);
        }
        res.send({ ok: true, complainant });
    } catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}

export async function deleteComplainant(req: any, res: any) {
    try {
        const { _id } = req.query;
        const complainant = await ComplainantModel.findByIdAndDelete(_id);
        if (!complainant) throw new Error("complainant not found");
        res.send({ ok: true, complainant });
    } catch (error) {
        console.error(error);
    }
}
// Define the updateComplainant function
export async function updateComplainant(req, res) {
    try {
      const { complainantId } = req.body; // Get the complainant ID from the request body
      const updatedFields = req.body; // The updated fields should be present in the request body
  
      // Use Mongoose to update the complainant document
      const updatedComplainant = await ComplainantModel.findByIdAndUpdate(
        complainantId,
        updatedFields,
        { new: true } // Return the updated document
      );
  
      if (!updatedComplainant) {
        return res.status(404).json({ message: 'Complainant not found' });
      }
  
      return res.json({ ok: true,  updatedComplainant });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
