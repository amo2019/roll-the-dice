import React from "react";
import RollDice from "./RollDice";
import Navbar from "./Navbar";
import PageContent from "./PageContent";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
       <PageContent>
    <div className="App">
        
            <Navbar />
            <RollDice />
       
     </div>
     </PageContent>
    </ThemeProvider>
  );
}
