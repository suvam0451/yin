'use client';

import YinBanner from '../components/banners/Yin';
import YinFeatures from '../components/homepage/YinFeatures';
import YinRoadmap from '../components/roadmaps/Yin';
import ProjectLandingPageContainer
	from '../container/ProjectLandingPageContainer';
import {useRef} from 'react';
import ProviderContainer from '../container/ProviderContainer';


export default function Home() {
	const featuresSectionRef = useRef<HTMLDivElement>();

	return (
		<main className="flex min-h-screen flex-col darkmode_0dp">
			<ProviderContainer>
				<ProjectLandingPageContainer>
					<YinBanner featuresSectionRef={featuresSectionRef} />
					<YinFeatures featuresSectionRef={featuresSectionRef as any} />
					<YinRoadmap />
				</ProjectLandingPageContainer>
			</ProviderContainer>
		</main>
	);
}
