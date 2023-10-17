import OpenAI from "openai";
import { useContext, useRef, useState } from "react";
import ConfigContext, { ConfigData } from "../../modules/Config";
import { Box, Button, Container, Grid, ScrollArea, TextInput } from "@mantine/core";

export default function Chat() {
    const inputRef = useRef() 

    const config: ConfigData = useContext(ConfigContext)
    const openai = new OpenAI({
        apiKey: config.apps.OpenAIDirect.accessKey,
        dangerouslyAllowBrowser: true
    })

    const [currentHistory, setCurrentHistory] = useState([])

    async function generate (request:string) {
        let messages = [...currentHistory]
        messages = messages.concat([{'role':'user', "content": request}])
        const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
        });
        console.warn(response)
        messages = messages.concat([{'role':'assistant', "content": response.choices[0].message.content}])
        setCurrentHistory(messages)
    }

    return (
        <>
            <ScrollArea type="always"  
                style={{  paddingBottom: "100px"}}
            >
            {currentHistory.map((rec, idx) => {
                return (
                    <Container key={idx} p="md"
                    style={rec.role == 'assistant' ? {
                        backgroundColor: `var(--mantine-color-default)`
                    } : {}}
                    >
                        <Box ta={rec.role == 'assistant'?'left':'right'} w={"100%"}>{rec.role}</Box>
                        <Box>

                        {rec.content}
                        </Box>
                    </Container>
                )
            })}
            </ScrollArea>
            <Container p="sm" style={{
                position: "fixed",
                bottom: "0",
                width: "100%",
                backgroundColor: 'var(--mantine-color-body)'
            }}>
                <Grid>
                    <Grid.Col span="auto"><TextInput placeholder="type message" ref={inputRef}></TextInput></Grid.Col>
                    <Grid.Col span="2"><Button w="100%" onClick={()=>{
                        generate(inputRef.current?.value)
                    }}>Send</Button></Grid.Col>
                </Grid>
            </Container>
        </>
    )
}