import {Card, Text, Button, Center, Title, TextInput, Space} from '@mantine/core'
import Config from '../../modules/Config'
import { useRef } from 'react'

export default function Setup() {

    const accessKey = useRef()

    const submit = async (value: string|null) => {
        console.warn(value)
        await Config.updateKey(Config.ref.apps.OpenAIDirect.accessKey, value)
        
    }

    return (
        <Center mih={'100vh'}> 
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3}>OpenAI models</Title>
            <Text>Enter your personal OpenAI access key. </Text>
            <Text>It will be used to communicate with OpenAI service and execute your requests.</Text>
            <Space h="xl" />
            <TextInput 
                placeholder='OpenAI access key'      
                ref={accessKey}          
            />
            <Button variant="light" color="blue" fullWidth mt="md" radius="md"
                onClick={(event)=>{
                    event.preventDefault()
                    return submit(accessKey.current.value)
                }}
            >
                Save & Go
            </Button>
        </Card>
        </Center>
    )
}