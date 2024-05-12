'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import HomeModule from '../../components/dashboard-modules/HomeModule';
import ProjectLandingPageContainer
	from '../../container/ProjectLandingPageContainer';
import WithYinAuthContext from '../../state/authContext';
import DashboardHeaderBar from '../../components/dashboard/HeaderBar';
import YinDashboard from '../../components/banners/YinDashboard';
import PersonaModule from '../../components/dashboard-modules/PersonaModule';
import SettingsModule from '../../components/dashboard-modules/SettingsModule';
import ProviderContainer from '../../container/ProviderContainer';

function DashboardPage() {
	return <main className="flex min-h-screen flex-col darkmode_0dp">
		<ProviderContainer>
			<ProjectLandingPageContainer>
				<WithYinAuthContext>
					<DashboardHeaderBar />
					<YinDashboard />
					<HomeModule />
					<PersonaModule />
					<SettingsModule />
				</WithYinAuthContext>
			</ProjectLandingPageContainer>
		</ProviderContainer>
	</main>;
}


export default dynamic(() => Promise.resolve(DashboardPage), {ssr: false});