import {createContext, useEffect, useState} from "react";
import axios from "axios";


export const DataContext = createContext();

function DataContextProvider({children}) {
    useEffect(function () {
        (async () => {
            setFilter({...filter, loading: 1})
            let {data: {rows}, data: {count}} = await axios.get("http://localhost:4000/search", {
                params: filter
            })
            setData(rows);
            setFilter({...filter, loading: 0, count,pages: parseInt(parseInt(count) / parseInt(filter.perPage))})
        })()
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