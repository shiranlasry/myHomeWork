// categoriesApi.ts
export const addCategory = async (category:string ) => {
    try {
        const response = await fetch("/API/categories/addcategory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ CategoryName : category }) // Ensure correct property name
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        throw err; // Rethrow the error to handle it appropriately on the client side
    }
};
