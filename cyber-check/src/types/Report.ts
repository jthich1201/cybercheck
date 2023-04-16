export interface Report {
    report_id: string;
    title: string;
    creator: string;
    created_at: Date;
    type: string;
    status: string;
    org_id: string;
    group_id: string;
    updated_at: Date;
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