export class Task {
    id: string;
    parentId?: string | null = null;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
