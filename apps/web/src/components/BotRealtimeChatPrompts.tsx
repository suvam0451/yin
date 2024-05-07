import {Box, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";

function BotRealtimeChatPrompts() {

  const questions = [
    {name: "Hey, my name is", answer: "yin"},
    {name: "But, you can call me", answer: "kirsi"},
    {name: "My personality type is", answer: "kuudere"}
  ]

  const [QuestionText, setQuestionText] = useState("Hey, my name is")
  const [AnswerText, setAnswerText] = useState("yin")
  const [WaitingTimeLeft, setWaitingTimeLeft] = useState(3000)
  const [QuestionIndex, setQuestionIndex] = useState(0)

  return <Box textAlign={"center"} mt={4} mb={4}>
    <Text className={"darkmode_text_highlight"} fontSize={"xl"} fontWeight={700} opacity={0.75}>Hey, my name
      is...</Text>
    <Text fontSize={"6xl"} fontWeight={700}
          color={"#6A4987"}
          className={"darkmode_text_highlight"}
          mt={0}
          lineHeight={1.25}
    >YIN</Text>
  </Box>
}

export default BotRealtimeChatPrompts;