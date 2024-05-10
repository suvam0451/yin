"use client";

import { useSearchParams } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Suspense } from "react";

function DiscordAuthPage() {
	const searchParams = useSearchParams();

	useEffect(() => {
		const search = searchParams.get("code");
		if (search && search !== "") {
		}
	}, []);

	return <Box>Redirecting you back...</Box>;
}

function DiscordAuthPageSuspenseWrapped() {
	return (
		<Suspense fallback={<Box>Loading...</Box>}>
			<DiscordAuthPage />
		</Suspense>
	);
}

export default DiscordAuthPageSuspenseWrapped;
