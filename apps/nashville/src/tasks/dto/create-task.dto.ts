export class CreateTaskDto {
    parentId?: string | null = null;
    title: string;
    description: string;
}
