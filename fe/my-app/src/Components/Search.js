import axios from "axios";
import {useContext, useState} from "react";
import {DataContext} from "../DataContextProvider";

function Search() {
    const [search, setSearch] = useState('');
    const {filter, setFilter, setData} = useContext(DataContext);

    async function handelSearch(page) {
        setFilter({loading: 1, ...filter})
        let {data: {rows}, data: {count}} = await axios.get("http://localhost:4000/search", {
                params:
                    {
                        ...filter, search, page
                    }
            }
        )
        setData(rows)
        setFilter({...filter, loading: 0, count, pages: parseInt(parseInt(filter.count) / parseInt(filter.perPage))})
    }

    return (
        <div className="bg-gray-100 flex flex-col justify-center">
            <div className="relative p-12 w-full sm:max-w-2xl sm:mx-auto">
                <div className="overflow-hidden z-0 rounded-full relative p-3">
                    <form role="form" className="relative flex z-50 bg-white rounded-full">
                        <input type="text" placeholder="enter your search here"
                               className="rounded-full flex-1 px-6 py-4 text-gray-700 focus:outline-none"
                               onChange={e => setSearch(e.target.value)}
                               value={search}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                handelSearch()
                            }}
                            className="bg-indigo-500 text-white rounded-full font-semibold px-8 py-4 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none">
                            Search
                        </button>
                    </form>
                    <div className="glow glow-1 z-10 bg-pink-400 absolute"></div>
                    <div className="glow glow-2 z-20 bg-purple-400 absolute"></div>
                    <div className="glow glow-3 z-30 bg-yellow-400 absolute"></div>
                    <div className="glow glow-4 z-40 bg-blue-400 absolute"></div>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
                     aria-label="Pagination">
                    <span
                        onClick={() => handelSearch(filter.page - 1)}
                        className="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300">
                            <span className="sr-only">Previous Page</span>
                            <svg className="block w-4 h-4 fill-current" viewBox="0 0 256 512" aria-hidden="true"
                                 role="presentation">
                            <path
                                d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
                            </svg>
                    </span>
                    {
                        Array.from(Array(filter.pages).keys()).map((pageNumber) => (
                            <span
                                key={pageNumber + 1}
                                onClick={() => handelSearch(pageNumber + 1)}
                                className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300">
                                {pageNumber + 1}
                            </span>
                        ))
                    }
                    <span
                        className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                        onClick={() => handelSearch(filter.page + 1)}>
                        <span className="sr-only">Next Page</span>
                        <svg className="block w-4 h-4 fill-current" viewBox="0 0 256 512" aria-hidden="true"
                             role="presentation">
                        <path
                            d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
                        </svg>
                    </span>
                </nav>
            </div>
        </div>
    )
}

export default Search;