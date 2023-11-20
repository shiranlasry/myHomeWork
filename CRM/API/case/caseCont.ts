import { DepartmentModel } from "../department/departmentModel";
import { InquiryModel } from "../inquiry/inquiryModel";
import { CaseModel } from "./caseModel";
import { UserModel } from "../user/userModel";

export async function createCase(req: any, res: any) {
  try {
    const { inquiry, departmentId, userId, complainantId } = req.body;

    if (!inquiry || !departmentId || !userId || !complainantId) throw new Error("missing required fields");

    // Calculate the next order number
    const lastCase = await CaseModel.findOne({}, {}, { sort: { orderNumber: -1 } });
    const nextOrderNumber = lastCase ? lastCase.orderNumber + 1 : 1000;

    const newCase = new CaseModel({ inquiry, departmentId, userId, complainantId, orderNumber: nextOrderNumber });
    const caseDB = await newCase.save();
    res.send({ ok: true, caseDB });
  } catch (error) {
    console.error(error);
  }
}

export async function getCases(req: any, res: any) {
  try {
    console.log("getCases");
    const cases = await CaseModel.find();
    if (!cases) throw new Error("cases not found");
    res.send({ ok: true, cases });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function getCasesByUserId(req: any, res: any) {
  try {
    console.log("getCasesByUserId");
    const { userId } = req.query;
    const cases = await CaseModel.find({ userId: userId });
    if (!cases) throw new Error("cases not found");
    res.send({ ok: true, cases });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function getCasesByDepartment(req: any, res: any) {
  try {

    const { departmentId } = req.query;
    const cases = await CaseModel.find({ departmentId });
    if (!cases) throw new Error("cases not found");
    res.send({ ok: true, cases });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function getCase(req: any, res: any) {
  try {
    console.log("getCase");
    const { _id } = req.query;
    const caseDB = await CaseModel.findById(_id);
    if (!caseDB) throw new Error("case not found");
    res.send({ ok: true, caseDB });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function deleteCase(req: any, res: any) {
  try {
    const { _id } = req.query;
    const caseDB = await CaseModel.findByIdAndDelete(_id);
    if (!caseDB) throw new Error("case not found");
    res.send({ ok: true });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function updateCase(req: any, res: any) {
  try {
    console.log("updateCase");
    const { inquiry, userId,  case_id } = req.body;
    if(!inquiry ||  !userId ||  !case_id)
      throw new Error("missing required fields");
      console.log("inquiry: ", inquiry);  
    // if (inquiry) CaseModel.findById(case_id, { inquiry });
    // if (userId) CaseModel.findById(case_id, { userId });
      const updatedCase= await CaseModel.findById(case_id);
      updatedCase.inquiry=inquiry;
      updatedCase.userId=userId;
      updatedCase.save();

    res.send({ ok: true ,updatedCase});
  } catch (error) {
    console.error(error);
  }
}

