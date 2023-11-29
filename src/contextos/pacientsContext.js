import { createContext, useState, useEffect } from "react";
import { urlBase, requestOptions } from "../assets/definicoes";

export const PacientsContext = createContext();

export function PacientsProvider({ children }) {

    const [pacients, setPacients] = useState([]);
    const [updatingBD, setUpdatingBD] = useState(false);
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json")


    useEffect(() => {

        const fetchData = async () => {

            const response = await fetch(urlBase, requestOptions);
            const data = await response.json();
            setPacients(data)
    
        }
        fetchData()
        console.log('useEffect foi executado')

    }, [updatingBD]);

    

    

    

    return (
        <PacientsContext.Provider value={{ pacients, setPacients, updatingBD, setUpdatingBD }}>
            {children}
        </PacientsContext.Provider>
    )

}

