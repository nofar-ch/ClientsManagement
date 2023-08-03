
export class ClientFormView {
    id?: string;
    fullName?: string;
    phoneNumber?: string;
    ipAddress?: string;

    constructor(data?: ClientFormView) {
        Object.assign(this, data);
    }
} 