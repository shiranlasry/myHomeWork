
//userContext.tsx 

import { createContext, useContext, useState } from "react";


interface UserContextProps {
    children: React.ReactNode;
  }

  interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  }
  const UserContext = createContext<UserContextType | undefined>(undefined);
const UserProvider: React.FC<UserContextProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
    );
  };

  const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  };
  
  export { UserProvider, useUser };