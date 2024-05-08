'use client'

import {useSearchParams} from 'next/navigation'
import {Box} from "@chakra-ui/react";
import {useEffect} from "react";

function DiscordAuthPage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const search = searchParams.get('code')
    console.log(search)
    if(search && search !== "") {

    }
  }, []);

  return <Box>Redirecting you back...</Box>
}

export default DiscordAuthPage