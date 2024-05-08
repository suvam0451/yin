import {Box, Button, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {FaDiscord, FaLock} from "react-icons/fa";
import {useYinAuthContext} from "../../state/auth";

function DashboardHeaderBar() {
  const [SelectedTab, setSelectedTab] = useState(0)
  const auth = useYinAuthContext()

  useEffect(() => {
    console.log(auth.token)
  }, [auth]);

  const hasNoToken = auth.token == null || auth.token == ""

  const tabs = [
    {
      label: "Login",
      visible: auth.token != null,
      locked: false
    },
    {
      label: "Gallery",
      visible: true,
      locked: hasNoToken
    },
    {
      label: "Personas",
      visible: true,
      locked: hasNoToken
    },
    {
      label: "Persona Editor",
      visible: true,
      locked: hasNoToken
    },
    {
      label: "Settings",
      visible: true,
      locked: hasNoToken
    }
  ]

  return <Box display={"flex"} flexDirection={"row"} mt={8} bgColor={"#232323"}>
    <Box display={"flex"} flexDirection={"row"} flexGrow={1}>
      {tabs.map((o, i) => <Box key={i}
                               position={"relative"}
                               px={2}
                               //
                               // bgColor={SelectedTab === i ? "#222" : "black"}
                               // borderTop={SelectedTab === i ? "0px" : "1px solid purple"}
                               // borderRight={SelectedTab === i ? "1px solid purple" : "0px"}
          dropShadow={"10px white"}
                               onClick={() => {
                                 setSelectedTab(i)
                               }}>
        {SelectedTab === i &&
            <Box
                position={"absolute"}
                style={{height: "2px", width: "100%"}}

                backgroundColor={"purple"}>
            </Box>}
        <Box p={2} display={"flex"} alignItems={"center"}>
          <Text style={{
            color: SelectedTab === i ? "#fff" : "#ffffff60",
            // fontSize: "1.1rem"
          }}>{o.label}

          </Text>
          {o.locked && <FaLock style={{marginLeft: "4px"}} display={"inline"} size={16} color={"#ffffff60"}/>}
        </Box>
      </Box>)}
    </Box>
    <Box style={{display: "flex"}}>
      <Button colorScheme={"purple"} size={"md"} variant={"outline"} fontWeight={800} ml={"0.5rem"}>Log In</Button>
      <Button colorScheme={"purple"} size={"md"} ml={"0.5rem"}>
        <Text ml={"4px"} color={"white"} opacity={0.6}>Sign Up</Text>
      </Button>
    </Box>
  </Box>
}

export default DashboardHeaderBar;