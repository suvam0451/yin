import {Box} from '@chakra-ui/react';
import styled from 'styled-components';
import YinFooter from '../components/footers/Yin';
import React from 'react';
import CommonBanner from '../components/banners/Common';


const DashboardContainerBox = styled(Box)`
    padding-top: 1rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    @media (min-width: 992px) {
        width: 992px;
    }
`;

function ProjectLandingPageContainer({children}: any) {
	return <Box
		style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
		<DashboardContainerBox>
			<Box style={{display: 'flex', alignItems: 'center', flexDirection: "column"}}>
				<CommonBanner />
			</Box>
			<Box style={{flexGrow: 1}}>
				{children}
			</Box>
			<YinFooter />
		</DashboardContainerBox>
	</Box>;
}

export default ProjectLandingPageContainer;