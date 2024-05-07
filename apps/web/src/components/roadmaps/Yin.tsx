import {Box, Text} from '@chakra-ui/react'
import {FaCheckCircle, FaArchive, FaBookmark, FaHammer} from "react-icons/fa"

const capabilities = [
  {label: "Help Slash Command", status: "completed"},
  {label: "Answer Questions", status: "completed"},
  {label: "Image Generation", status: "completed"},
  {label: "Cloud Storage for Images", status: "completed"},
  {label: "Discord OAuth", status: "completed"},
  {label: "Web Gallery (Dashboard)", status: "planned"},
  {label: "Persona Edit (Dashboard)", status: "planned"},
  {label: "Delete Data (Dashboard)", status: "planned"},
  {label: "Chat Sessions (Discord)", status: "planned"},
]

function YinRoadmap() {
  return <div style={{
    padding: "2rem 0rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", marginTop: "2rem", marginBottom: "2rem"
  }}>
    <Text fontSize={"3xl"} fontWeight={700} className={"darkmode_text_highlight"}>What can I do?</Text>
    <Text className={"darkmode_text_normal"} fontSize={"1.25rem"} textAlign={"center"} my={4}>
      My focus is on ease of use and user convenience, over everything else.
      Here are my current and planned/considered capabilities:
    </Text>


    <Box display={"grid"} gridTemplateColumns={"1fr 1fr 1fr"} gridColumnGap={"2rem"} gridRowGap={"1rem"} marginTop={"1rem"}>
      {capabilities.map((o, i) => <Box display={"flex"} alignItems={"center"} key={i}>
        {o.status === "completed" && <FaCheckCircle color={"green"}/>}
        {o.status === "planned" && <FaBookmark color={"gray"}/>}
        {o.status === "wip" && <FaHammer color={"purple"}/> }
        <Text className={"darkmode_text_normal"} ml={"4px"}>{o.label}</Text>
      </Box>)}
    </Box>
  </div>
}

export default YinRoadmap;