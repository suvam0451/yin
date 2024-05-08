"use client";

import YinBanner from "../components/banners/Yin";
import YinFeatures from "../components/features/Yin";
import YinRoadmap from "../components/roadmaps/Yin";
import ProjectLandingPageContainer from "../container/ProjectLandingPageContainer";
import {useRef} from "react";
import YinFooter from "../components/footers/Yin";

export default function Home() {
  const featuresSectionRef = useRef<HTMLDivElement>();

  return (
      <main className="flex min-h-screen flex-col darkmode_0dp">
        <ProjectLandingPageContainer>
          <YinBanner featuresSectionRef={featuresSectionRef}/>
          <YinFeatures featuresSectionRef={featuresSectionRef as any}/>
          <YinRoadmap/>
          <YinFooter/>
        </ProjectLandingPageContainer>
      </main>
  );
}
