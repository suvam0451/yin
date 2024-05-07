import {Box} from "@chakra-ui/react";

function ProjectLandingPageContainer({children}: any) {
  return <Box style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
    <Box maxWidth={"4xl"} style={{paddingTop: "1rem"}}>
      {children}
    </Box>

  </Box>
}

export default ProjectLandingPageContainer