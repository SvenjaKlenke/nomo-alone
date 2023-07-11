export type TaskModel = {
    id: string,
    creator: string | undefined,
    category: string,
    name: string,
    createDate: string,
    deadline: string,
    amoundOfPeople: number,
    text: string,
    assigneeName: string[]
}

