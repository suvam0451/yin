"use client";

import dynamic from 'next/dynamic'
import React, {useRef} from "react";
import ImageGallery from "../../components/ImageGallery";
import CommonBanner from "../../components/banners/Common";
import ProjectLandingPageContainer from "../../container/ProjectLandingPageContainer";
import WithYinAuthContext from "../../state/auth";
import DashboardHeaderBar from "../../components/dashboard/HeaderBar";
import YinDashboard from "../../components/banners/YinDashboard";

function DashboardPage() {
  const featuresSectionRef = useRef<HTMLDivElement>();

  return <main className="flex min-h-screen flex-col darkmode_0dp">
    <ProjectLandingPageContainer>
      <WithYinAuthContext>
        <CommonBanner/>
        <DashboardHeaderBar/>
        <YinDashboard/>
        <ImageGallery/>
      </WithYinAuthContext>
    </ProjectLandingPageContainer>
  </main>
}


export default dynamic(() => Promise.resolve(DashboardPage), {ssr: false});