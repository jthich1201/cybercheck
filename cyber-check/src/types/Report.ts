export interface Report {
    reportId: string;
    title: string;
    creator: string;
    created_at: Date;
    type: string;
    status: string;
    orgId: string;
    groupId: string;
    updatedAt: Date;
}

//Maybe combine report managers and members tables with roles column
//seems too repetetive

export interface ReportManagers {
    userId: string;
    reportId: string;
}

export interface ReportMembers {
    userId: string;
    reportId: string;
}