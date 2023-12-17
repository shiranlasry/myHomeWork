//users api cilent side

export const singUp = async (user: User) => {
    try {
        
        const response = await fetch("API/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const logIn = async (email: string , password:string) => {
    try {
        const response = await fetch("API/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email,password}),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }

}