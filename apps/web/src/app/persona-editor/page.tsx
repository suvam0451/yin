"use client";

import dynamic from 'next/dynamic'
import React from "react";
import CommonBanner from "../../components/banners/Common";
import ProjectLandingPageContainer from "../../container/ProjectLandingPageContainer";
import WithYinAuthContext from "../../state/authContext";
import DashboardHeaderBar from "../../components/dashboard/HeaderBar";
import PersonaEditor from '../../components/PersonaEditor';

function DashboardPage() {
	return <main className="flex min-h-screen flex-col darkmode_0dp">
		<ProjectLandingPageContainer>
			<WithYinAuthContext>
				<CommonBanner/>
				<DashboardHeaderBar/>
				<PersonaEditor/>
			</WithYinAuthContext>
		</ProjectLandingPageContainer>
	</main>
}


export default dynamic(() => Promise.resolve(DashboardPage), {ssr: false});