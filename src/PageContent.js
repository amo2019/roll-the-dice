import React, { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";

export default function PageContent(props) {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = {
    backgroundColor: isDarkMode ? "#9e9e9e" : "#78909c",
    minHeight: "100vh",
    width: "100vw",
  };
  return <div style={styles}>{props.children}</div>;
}
