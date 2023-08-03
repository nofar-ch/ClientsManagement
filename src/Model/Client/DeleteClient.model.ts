
class DeleteClient {
    public id!: string;

    constructor(data: UpdateClient) {
        Object.assign(this, data)
    }
} 