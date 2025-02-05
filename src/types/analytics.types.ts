export type GetNewUsersResponse = {
    success: boolean;
    data: {
        dailyUsers: number; 
        weeklyUsers: number;
        monthlyUsers: number;
    }
}

export type CategoryType = {
    _id: string,
    categoryId: string,
    title: string,
    usageCount: number
}