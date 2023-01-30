import React, { useState } from "react";
import { Utilisateur } from "../ressources/types/Utilisateur";

// Create a context for sharing data between components
const UserContext = React.createContext({
  user: new Utilisateur("", ""),
  updateUser: new Function(),
});

// Create a provider component for sharing the context value
const UserProvider = ({ children }: any) => {
  // State to store the user data
  const [user, setUser] = useState(new Utilisateur("Adrien", "BONY"));

  // Function to update the user data
  const updateUser = (updatedUser: Utilisateur) => {
    setUser(updatedUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
