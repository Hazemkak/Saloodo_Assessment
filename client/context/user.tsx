import { useState, createContext } from "react";

export const UserContext = createContext({
  user: undefined,
  setUser: undefined,
});

function UserContextProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser } as unknown as any}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
