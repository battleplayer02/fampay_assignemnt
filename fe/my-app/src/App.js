import './App.css';
import Search from "./Components/Search";
import {useContext, useState} from "react";
import Card from "./Components/Card";
import {DataContext} from "./DataContextProvider";


function App() {
    const {data, filter: {loading}} = useContext(DataContext);
    return (
        <div>
            <section className="bg-blue-400 text-center font-bold p-5">YOUTUBE VIDEO SERCH</section>
            <Search/>
            <div style={{
                display: "grid",
                placeContent: "center",
                gridTemplateColumns: "repeat(4,460px)"
            }}>
                {
                    loading == 1 ? <div style={{margin: "10px"}}>Loading...!</div> :
                        data.length == 0 ? "No Video Found" : data.map(video => <Card key={video.id} video={video}/>)
                }
            </div>
        </div>
    );
}

export default App;
