import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});


export function  UserContextProvider({children}){
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false);
    useEffect( () => {
        if(!user)
        {
            axios.get('/profile').then(({data})=>{     //name, email and id avashe user nu je jwt token mathi lai ne karashe ane jo user nu token ny thoi to null return karashe
                setUser(data);
                setReady(true);
            });

        }
    }, [])
    return (
        <UserContext.Provider value={{user,setUser,ready}}>
            {children}
        </UserContext.Provider>
    )
};