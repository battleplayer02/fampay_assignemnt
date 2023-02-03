import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";


export const DataContext = createContext();

function DataContextProvider({children}) {
    useEffect(async () => {
        setFilter({...filter, loading: 1})
        let {data} = await axios.get("http://localhost:4000", {
            params: filter
        })
        setData(data);
        setFilter({...filter, loading: 0})
    }, [])
    const [filter, setFilter] = useState({
        perPage: 10,
        page: 1,
    })
    const [data, setData] = useState([])
    return (
        <DataContext.Provider value={{filter, setFilter, data, setData}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider