import { Response } from 'node-fetch'

const tips = {
    200: 'Congratulations on actually sending valid data to the API >3. The API returned a 200 OK!!!!!!',
    400: 'The data you are sending is either invalid, not found or shadow-ratelimited!',
    401: 'Woah, The Token you Provided is Invalid. Please provide a valid Infinity API Token!',
    403: 'You do not have access to this Endpoint, Your token may also be invalid! Check that you are providing a valid Infinity API Token!',
    408: 'The API is undergoing maintenence',
    500: 'Something went wrong here! Please open a ticket on our support server ASAP!',
    502: 'God help us, our VPS is DOWN DOWN DOWN!',
    522: 'Woah, The Connection between your Bot and our API has Timed out! If this issue continues please open a ticket on our support server ASAP'
}

export default class infinityError extends Error {
    public response?: Response

    constructor(status: number, message: string, response: Response) {
        if (status in tips) {
            super(`${status} ${message} (${tips[status as keyof typeof tips]})`)
        } else {
            super(`${status} ${message}`)
        }

        this.response = response
    }
}
