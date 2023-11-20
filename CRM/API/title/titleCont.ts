import { TitleModel } from "./titleModel";

export async function createTitle(req: any, res: any) {
    try {
        const { title, department } = req.body;
        const titleDB = await TitleModel.create({ title, department });
        res.send({ ok: true, titleDB });
    } catch (error) {
        console.error(error);
    }
}

export async function getTitles(req: any, res: any) {
    try {
        const { department } = req.query;
        if (department) {
            const titles = await TitleModel.find({ department });
            if (!titles) throw new Error("No titles");
            res.send({ ok: true, titles });
            return;
        }
        const titles = await TitleModel.find();
        if (!titles) throw new Error("No titles");
        res.send({ ok: true, titles });
    } catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}

export async function getTitle(req: any, res: any) {
    try {
        const { _id } = req.query;
        const title = await TitleModel.findById(_id);
        if (!title) throw new Error("Title not found");
        res.send({ ok: true, title });
    } catch (error) {
        console.error(error);
        res.send({ error: error.message }); 
    }
}
export async function getTitleName(req: any, res: any) {
    try {
        const { _id } = req.query;
        const titleDB = await TitleModel.findById(_id);
        if (!titleDB) throw new Error("Title not found");
        const title  =  titleDB.title;
        res.send({ ok: true, title });
    } catch (error) {
        console.error(error);
        res.send({ error: error.message }); 
    }
}
export async function deleteTitle(req: any, res: any) {
    try {
        const { _id } = req.query;
        const title = await TitleModel.findByIdAndDelete(_id);
        if (!title) throw new Error("Title not found");
        res.send({ ok: true });
    } catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}

export async function updateTitle(req: any, res: any) {
    try {
        const { title, department, _id } = req.body;
        const existingTitle = await TitleModel.findById(_id);
        if (!existingTitle) throw new Error("Title not found");
        if (title !== existingTitle.title) existingTitle.title = title;
        if (department !== existingTitle.department) existingTitle.department = department;
        await existingTitle.save();
        res.send({ ok: true });
    } catch (error) {
        console.error(error);
    }
}