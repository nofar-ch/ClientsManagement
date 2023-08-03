import { ClientFormView } from "./ClientFormView.model";

export class CreateClient {
    id!: string;
    fullName!: string;
    phoneNumber!: string;
    ipAddress!: string;

    constructor(data: ClientFormView) {
        Object.assign(this, data)
    }
} 