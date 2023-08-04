
class UpdateClient {
    id?: string;
    fullName?: string;
    phoneNumber?: string;
    ipAddress?: string;

    constructor(data: UpdateClient) {
        Object.assign(this, data)
    }
} 