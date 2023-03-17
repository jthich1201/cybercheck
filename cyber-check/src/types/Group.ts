export interface Group {
    groupId: string;
    groupName: string;
    organizationId: string; // rename in db
}

export interface GroupManager {
    groupId: string;
    userId: string;
}