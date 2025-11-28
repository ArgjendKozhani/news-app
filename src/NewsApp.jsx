
import { useState , useEffect } from "react";
import Navbar from "./Navbar.jsx";
import "./NewsApp.css"

function NewsApp(){
const [category, setCategory] = useState("home")
const [data, setData] = useState(null)


useEffect(()=>{
async function showNews() {
    const apiKey = "eb20917cfecc49e7b911cafda7310aac";
   
   
   const url =
   category === "home"
    ? `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;


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
  <h1><span>Breaking News</span> | Home of News ! We bring The latest 
  news in every category in one place</h1>
   
    <div className="container">
        <div className="cards-container">
      {data?.articles?.map((article , index)=>(
        <div key={index} className="card-body">
            <img src={article.urlToImage} alt="Image isnt avalible" />
<h3 className="card-author">{article.author ? article.author : "No Author"}</h3>
<h4 className="card-title">{article.title.slice(0,56)}...</h4>
<p className="card-content">{article.content ? article.content.slice(0,150) + "..." : "No content avalible for this news"}</p>
<hr className="purple" />
        </div>
      ))}
     
        </div>

    </div>
  
    </>
)
}

export default NewsApp