import {Text, Box} from '@chakra-ui/react'
import {IoMdCamera} from "react-icons/io";
import {FaWineGlass, FaExternalLinkAlt} from "react-icons/fa"
import {LegacyRef, MutableRefObject} from "react";

type YinFeaturesProps = {
  featuresSectionRef: MutableRefObject<HTMLDivElement>
}

function YinFeatures(props: YinFeaturesProps) {
  return <div style={{
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr"
  }} ref={props.featuresSectionRef}>
    <div style={{flex: 1, padding: "2rem"}}>
      <FaWineGlass color={"rgba(168,85,247, 0.6)"} size={64} style={{margin: "auto"}}/>
      <Text fontWeight={700} fontSize={"2xl"} className={"darkmode_text_normal"} textAlign={"center"} my={4}>
        Simple and Classy, Just Like Me</Text>
      <Text className={"darkmode_text_normal"}>I only have three commands. They are self-explanatory and don&apos;t get in your way.</Text>
    </div>
    <div style={{flex: 1, padding: "2rem"}}>
      <IoMdCamera color={"rgba(168,85,247, 0.6)"} size={64} style={{margin: "auto"}}/>
      <Text fontWeight={700} fontSize={"2xl"} className={"darkmode_text_normal"} textAlign={"center"} my={4}>Snap
        Wherever, Keep Forever</Text>
      <Text className={"darkmode_text_normal"}>Generated images favourited by you are saved against your discord account
        and you
        can view them in the {""}
        <Box display={"inline"} color={"rgba(168,85,247, 0.6)"}>dashboard
          <FaExternalLinkAlt display={"inline"}/>
        </Box> any given time.
      </Text>
    </div>
    <div style={{flex: 1, padding: "2rem"}}>
      <IoMdCamera color={"rgba(168,85,247, 0.6)"} size={64} style={{margin: "auto"}}/>
      <Text fontWeight={700} fontSize={"2xl"} className={"darkmode_text_normal"} textAlign={"center"} my={4}>
        Customizing Me, Customizing Us</Text>
      <Text className={"darkmode_text_normal"}>The default personality I use to reply to your questions can be changed.
      </Text>
      <Text className={"darkmode_text_normal"}>Switch chat session personas by
        tagging me with it&apos;s name in dedicated channels.</Text>
    </div>
  </div>
}

export default YinFeatures;