export interface Task {
    taskId: string;
    title: string;
    taskDescription: string;
    assignee: string;
    createdAt: Date;
    updatedAt: Date;
    reportId: string;
    completed: boolean;
}

export interface Description {
    descriptionId: string;
    taskId: string;
    description: string;
    createdAt: Date; //rename in db
    userId: string; //do we need this?
}
export interface Comment {
    commentId: string;
    taskId: string;
    content: string;
    userId: string; //do we need this?
    createdAt: Date; // rename in db 
}
