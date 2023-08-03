
export class ClientFormView {
    id!: string;
    fullName!: string;
    phoneNumber!: string;
    ipAddress!: string;

    constructor(data?: ClientDto) {
        Object.assign(this, data);
    }
} 