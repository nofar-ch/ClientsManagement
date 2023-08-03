
class CreateClient {
    id!: string;
    fullName!: string;
    phoneNumber!: string;
    ipAddress!: string;

    constructor(data: CreateClient) {
        Object.assign(this, data)
    }
} 