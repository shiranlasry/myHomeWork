import { useState } from "react";
import "./App.scss";
import HomePage from "./components/HomePage/HomePage";
import LogIn from "./components/LogIn/LogIn";
import UserPosts from "./components/UserPosts/UserPosts";

function App() {
  const [user, setUser] = useState<User>();
  const [isposts, setIsposts] = useState(false);

  return (
    <>
      <div className="main">
        {isposts && user ? (
          <UserPosts setIsposts={setIsposts} userId={user.id} />
        ) : user ? (
          <HomePage
            userId={user.id}
            setIsposts={setIsposts}
            setUserApp={setUser}
          />
        ) : (
          <LogIn username="" password="" setUser={setUser} />
        )}
      </div>
    </>
  );
}

export default App;
