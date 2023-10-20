import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export interface IHistoryMessage {
    time: Date | string
    message: ChatCompletionMessageParam | null
    error: Error | string | null
}

export class HistoryMessage implements IHistoryMessage
{
    time: Date | string
    message: ChatCompletionMessageParam | null
    error: Error | string | null

    constructor(message?: ChatCompletionMessageParam | null, error?: Error | string | null) {
        this.time = new Date()
        this.message = message ?? null
        this.error = error ?? null
    }


}