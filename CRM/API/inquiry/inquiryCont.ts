import { InquiryModel } from "./inquiryModel";

export async function createInquiry(req, res) {
  try {
    const { userCreatorId, title, streetCase, streetNumberCase, description, recivedDate, status, closedDate, department, priority, solution } = req.body;
   
    const inquiry = new InquiryModel({ userCreatorId, department, title, street:streetCase, streetNumber:streetNumberCase, description, recivedDate, status, closedDate, priority, solution });
    const inquiryDB = await inquiry.save();
    res.send({ ok: true, inquiryDB });
  } catch (error) {
    console.error(error);
  }
}

export async function getInquiries(req, res) {
  try {
    const inquiries = await InquiryModel.find({});
    if (!inquiries) throw new Error("No inquiries")
    res.send({ ok: true, inquiries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getInquiry(req, res) {
  try {
    const { _id } = req.query;
    const inquiry = await InquiryModel.findById(_id);
    if (!inquiry) throw new Error("Inquiry not found");
    res.send({ ok: true, inquiry });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteInquiry(req, res) {
  try {
    const { _id } = req.query;
    const inquiry = await InquiryModel.findByIdAndDelete(_id);
    if (!inquiry) throw new Error("Inquiry not found");
    res.send({ ok: true });
  } catch (error) {
    console.error(error);
  }
}

export async function updateInquiry(req, res) {
  try {
    console.log("updateInquiry");
   
    const { description, status, solution, street, streetNumber, _id } = req.body;
    const existingInquiry = await InquiryModel.findById(_id);
    if (!existingInquiry) throw new Error("Inquiry not found");
    console.log(existingInquiry);
    if ((description !== existingInquiry.description) && description) existingInquiry.description = description;
    if ((status !== existingInquiry.status) && status) existingInquiry.status = status;
    //if status is closed, set closedDate
    if (status === "closed") existingInquiry.closedDate = new Date();
    if ((solution !== existingInquiry.solution) && solution) existingInquiry.solution = solution;
    if ((street !== existingInquiry.street) && street) existingInquiry.street = street;
    if ((streetNumber !== existingInquiry.streetNumber) && streetNumber) existingInquiry.streetNumber = streetNumber;
    await existingInquiry.save();
    console.log(existingInquiry);
    res.send({ ok: true, existingInquiry });
  } catch (error) {
    console.error(error);
  }
}


