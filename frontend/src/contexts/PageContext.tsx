import React, { createContext, Dispatch, ReactNode, useContext, useState } from "react";

export type PageContextType = {
	activePage: string;
	setActivePage: Dispatch<React.SetStateAction<string>>;
};
const PageContext = createContext<PageContextType | {}>({});
export const PageContextProvider = ({ children, value }: { children: ReactNode; value: PageContextType }) => {
	const [activePage, setActivePage] = useState("projects");
	return <PageContext.Provider value={{ activePage, setActivePage }}>{children}</PageContext.Provider>;
};
export const usePageContext = () => useContext(PageContext);