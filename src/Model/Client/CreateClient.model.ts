
class CreateClient {
    id!: string;
    fullName!: string;
    phoneNumber!: string;
    IpAddress!: string;

    constructor(data: CreateClient) {
        Object.assign(this, data)
    }
} 