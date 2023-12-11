import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import { getUser } from "../../api/usersAPI";

interface HomePageProps {
  userId: number;
  setIsposts: (isposts: boolean) => void;
  setUserApp: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const HomePage: React.FC<HomePageProps> = ({
  userId,
  setIsposts,
  setUserApp,
}) => {
  const [user, setUser] = useState<User>();
  const getUserById = async () => {
    try {
      const user: User = await getUser(userId);
      if (!user) {
        console.log("user not found");
        return;
      }
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserById();
  }, [userId]);

  const handleShowPostsClick = () => {
    setIsposts(true);
  };
  const handleLogoutClick = () => {
    // Clear the user by setting it to null
    setUserApp(undefined);
  };

  return (
    <div className="home-page">
      <div className="heder">
        <>
          Hello {user?.username} {user?.lastName}
        </>
        <h2>Mindfulness with the environment</h2>
      </div>
      <div className="home-page-body"></div>
      <div className="footer">
        <button onClick={handleShowPostsClick}>Show My Posts</button>
        <a onClick={handleLogoutClick} className="logout">
          Log Out
        </a>
      </div>
    </div>
  );
};

export default HomePage;
function setIsposts(arg0: boolean) {
  throw new Error("Function not implemented.");
}
