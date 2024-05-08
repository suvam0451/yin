"use client";

import dynamic from 'next/dynamic'
import React, {useRef, useState} from "react";
import {Box, Button, Text} from "@chakra-ui/react";
import ImageGallery from "../../components/ImageGallery";
import CommonBanner from "../../components/banners/Common";
import ProjectLandingPageContainer from "../../container/ProjectLandingPageContainer";

function DashboardPage() {
  const featuresSectionRef = useRef<HTMLDivElement>();
  const [SelectedTab, setSelectedTab] = useState(0)

  const tabs = [
    {
      label: "Image Gallery",
    },
    {
      label: "Persona Settings",
    },
    {
      label: "Persona Editor"
    },
    {
      label: "Account Settings"
    }
  ]
  return <main className="flex min-h-screen flex-col darkmode_0dp">
    <ProjectLandingPageContainer>
      <CommonBanner/>
      <Box display={"flex"} flexDirection={"row"} mt={8}>
        {tabs.map((o, i) => <Box key={i} position={"relative"} onClick={() => {
          setSelectedTab(i)
        }}>
          {SelectedTab === i &&
              <Box
                  position={"absolute"}
                  style={{height: "2px", width: "100%"}}
                  backgroundColor={"purple"}>
              </Box>}
          <Box p={2}>
            <Text style={{
              color: SelectedTab === i ? "#fff" : "#ffffff60"
            }}>{o.label}</Text>
          </Box>
        </Box>)}
      </Box>

      <ImageGallery/>
    </ProjectLandingPageContainer>
  </main>
}


export default dynamic(() => Promise.resolve(DashboardPage), {ssr: false});