import {Box} from "@chakra-ui/react";
import styled from 'styled-components';


const DashboardContainerBox = styled(Box)`
    padding-top: 1rem;
    @media (min-width: 992px) {
        width: 992px;
    }
`

function ProjectLandingPageContainer({children}: any) {
  return <Box style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
    <DashboardContainerBox>
      {children}
    </DashboardContainerBox>
  </Box>
}

export default ProjectLandingPageContainer