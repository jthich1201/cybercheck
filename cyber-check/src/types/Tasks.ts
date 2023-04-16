export interface Task {
    task_id: string;
    title: string;
    task_description: string;
    assignee: string;
    created_at: Date;
    updated_at: Date;
    report_id: string;
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
