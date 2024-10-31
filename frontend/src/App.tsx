import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import config from "./config";
import { PageContextProvider, PageContextType, usePageContext } from "./contexts/PageContext";
import Experiences from "./features/intro/components/Experiences";
import ProjectsPage from "./features/projects/pages/ProjectsPage";
import { ExperienceProps } from "./types";


function App() {
  const [experiences, setExperiences] = useState<ExperienceProps[]>([]);
  

  // Fetch Experiences
  async function fetchExperienceData() {
    try {
      const res = await fetch(
        `${config.apiAddress}:${config.apiPort}/experiences`
      );
      const data: ExperienceProps[] = await res.json();
      setExperiences(data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  }

  // Fetch experiences on mount
  useEffect(() => {
    fetchExperienceData();
  }, []);
  return (
    <PageContextProvider value={usePageContext() as PageContextType}>
    <Layout>
          <>
            <h1>EXPERIENCES</h1>
            <Experiences experiences={experiences} />
            <ProjectsPage/>
          </>
        
    </Layout>
    </PageContextProvider>
  );
}

export default App;