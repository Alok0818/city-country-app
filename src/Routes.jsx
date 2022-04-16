import { Route,Routes } from "react-router-dom"
import { AddCity } from "./Components/AddCity"
import { AddCountry } from "./Components/AddCountry"
import { HomePage } from "./Components/Home"

export const  AllRoutes=()=>{
return(
    <>
    <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/add-country" element={<AddCountry/>}></Route>
        <Route path="/add-city" element={<AddCity/>}></Route>
    </Routes>
    </>
)
}