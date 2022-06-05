
import Back from "./Components/Back";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Front from "./Components/Front";
import Create from "./Components/Create";

function App() {

    return (
        <BrowserRouter>
        <Routes>
        <Route index element={<Front show="all"/>} /> {/*b.show yra propsas kuri perduodam i Front.jsx*/}
        <Route path="sukurkideja" element={<Front show="sukurkideja"/>} /> {/*b.show yra propsas kuri perduodam i Front.jsx*/}
        <Route path="/create" element={<Create></Create>} /> 
        <Route path="admin" element={<Back/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}
export default App;