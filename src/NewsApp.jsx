
import { useState , useEffect } from "react";
import Navbar from "./Navbar.jsx";
import "./NewsApp.css"

function NewsApp(){
const [category, setCategory] = useState("home")
const [data, setData] = useState(null)


useEffect(()=>{
async function showNews() {
    
   
   
 const apiKey = "2vevzK3toywZ-RfjPw_EAZEsUTlJ5rC4mVB_XY6prlTThity";
const url = category === "home"
  ? `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`
  : `https://api.currentsapi.services/v1/latest-news?category=${category}&apiKey=${apiKey}`;



    const response = await fetch(url);
    const showData = await response.json()

    setData(showData)
    console.log(showData)
   
}
 showNews()
},[category])




return(
<>
  <Navbar changeCategory={setCategory}></Navbar>
  <h1><span>Breaking News</span> | Home of News ! We bring the latest 
  news in every category in one place</h1>
   
    <div className="container">
        <div className="cards-container">
      {data?.news?.map((article , index)=>(
        <div key={index} className="card-body">
            <img src={article.image} alt="Image isnt avalible" />
<h3 className="card-author">{article.author ? article.author : "No Author"}</h3>
<h4 className="card-title">{article.title.slice(0,56)}...</h4>
<p className="card-content">{article.description ? article.description.slice(0,150) + "..." : "No content avalible for this news"}</p>
<hr className="purple" />
        </div>
      ))}
     
        </div>

    </div>
  
    </>
)
}

export default NewsApp