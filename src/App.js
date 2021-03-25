import React from "react";
import RollDice from "./RollDice";
import Navbar from "./Navbar";
import PageContent from "./PageContent";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="all-containers">
        <ThemeProvider>
          <PageContent>
            <Navbar />
            <RollDice />
          </PageContent>
        </ThemeProvider>
      </div>
    </div>
  );
}
