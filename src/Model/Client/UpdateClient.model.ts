
class UpdateClient {
    id?: string;
    fullName?: string;
    phoneNumber?: string;
    IpAddress?: string;

    constructor(data: UpdateClient) {
        Object.assign(this, data)
    }
} 