export interface DataType {
    data: {
        name: string
        versions: number
        url: string
        feedback: string
        updated_at: string
        type: {
            id: number
            name: string
        }
    }
    message: string
    code: number
}
