import React from 'react'
import Markdown from "react-markdown";
import remarkUnwrapImages from "remark-unwrap-images";
import chatStyles from './Chat.module.css'
import logo from '../../assets/logo.svg'
import { Alert, Avatar, Center, Container, Grid, ScrollArea } from "@mantine/core";
import { HistoryMessage } from './HistoryMessage';

interface props {
    currentHistory: Array<HistoryMessage>,
    recordRef: React.RefObject<HTMLElement>
}

export default function ChatHistory({
    currentHistory,
    recordRef
}: props) {
    return (
        <ScrollArea type="always"
            style={{ paddingBottom: "100px" }}
        >
            {currentHistory.map((rec: HistoryMessage, idx) => {
                if (rec.message?.role == 'system') return <React.Fragment key={-1}></React.Fragment>
                if (rec.error) {
                    return (
                        <Container>
                            <Center p={"sm"}>
                                <Alert color="red" icon={false} title={rec.error.toString()}
                                    styles={{
                                        title: {
                                            marginBottom: 0,
                                        }
                                    }}
                                />
                            </Center>
                        </Container>
                    )
                }

                return (
                    <Container
                        key={idx}
                        p="md"
                        style={{
                            backgroundColor: rec.message?.role == 'assistant' ? `var(--mantine-color-default)` : `var(--mantine-color-default-hover)`
                        }}
                        ref={currentHistory.length == idx + 1 ? recordRef as  React.RefObject<HTMLDivElement> : undefined}
                    >

                        <Grid>
                            {rec.message?.role == 'assistant' &&
                                <Grid.Col span={1}>
                                    <Avatar src={logo} radius="xl">{rec.message?.role[0].toUpperCase()}</Avatar>
                                </Grid.Col>
                            }
                            <Grid.Col span="auto" className={chatStyles['chat-record-item']}>
                                <Markdown
                                    remarkPlugins={[
                                        remarkUnwrapImages
                                    ]}
                                // skipHtml
                                >{rec.message?.content}</Markdown>
                            </Grid.Col>
                            {rec.message?.role != 'assistant' &&
                                <Grid.Col span={1}>
                                    <Avatar color="blue" radius="xl">{rec.message?.role[0].toUpperCase()}</Avatar>
                                </Grid.Col>
                            }
                        </Grid>
                    </Container>
                )
            })}
        </ScrollArea>
    )
}