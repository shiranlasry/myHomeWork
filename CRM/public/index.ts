async function handleLogIn(event) {
    try {
        event.preventDefault();
        
        const email = event.target.email.value;
        const password = event.target.password.value;
        const user = { email, password };
        if (!user.email || !user.password)
            throw new Error("missing some details");
        const response = await fetch("API/user/log-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
     
        const data = await response.json();


        // if data is not ok
        if (!data.ok) {
            alert(data.error);
            throw new Error(data.error);
        }
      
        // go to home page   with user cookie
        window.location.href = `CRM_homePage.html`;

    } catch (error) {
        console.error(error);

    }

}