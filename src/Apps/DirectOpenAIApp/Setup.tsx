import {Card, Text, Button, Center, Title, TextInput, Space} from '@mantine/core'

export default function Setup() {
    const submit = (value: string) => {

    }
    
    return (
        <Center mih={'100vh'}> 
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3}>OpenAI access key</Title>
            <Text>Enter your personal OpenAI access key. </Text>
            <Text>It will be used to communicate with OpenAI service and execute your requests.</Text>
            <Space h="xl" />
            <TextInput 
                placeholder='access key' 
                onChange={(event)=>submit(event.currentTarget.value)}
            />
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                Save & Go
            </Button>
        </Card>
        </Center>
    )
}