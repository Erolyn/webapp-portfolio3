import type { PropsWithChildren } from "react";
import React, { useEffect, useState } from "react";
import { PageContextType, usePageContext } from "../contexts/PageContext";
import Footer from "./Footer";
import Header from "./Header";


export default function Layout(props: PropsWithChildren<{}>) {
    const { children } = props;

    const {activePage, setActivePage} = usePageContext() as PageContextType;
    const [isDarkMode, setIsDarkMode] = useState(() => {
      // Initialize state from localStorage
      const savedMode = localStorage.getItem("darkMode");
      return savedMode === "true";
    });
  
    // Toggle Dark Mode
    const toggleDarkMode = () => {
      setIsDarkMode((prevMode) => !prevMode);
    };
  
    // Apply or remove the 'dark-mode' class to the body element
    useEffect(() => {
      document.body.classList.toggle("dark-mode", isDarkMode);
  
      // Update localStorage whenever the dark mode state changes
      localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    }, [isDarkMode]);


      // Page Anchor Click Handler
  function PageAnchorClickedHandler(page: string) {
    setActivePage(page);
  }

    return (
        <div id="main-container">
                <Header onPageAnchorClicked={PageAnchorClickedHandler} />
            <main>
                {children}
            </main>
             <Footer onToggleDarkMode={toggleDarkMode} />
        </div>
    );
}