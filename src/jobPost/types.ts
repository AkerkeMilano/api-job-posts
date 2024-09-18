export type PostEntityType = {
    title: string, 
    description: string,
    salary: string, 
    location: string 
}

export type QueryType = {
    page: string;
    location: string | undefined;
    title: string | undefined;
}

export type FilterType = {
    page: string,
    location: string | undefined,
    title: string | undefined,
    limit: number,
    offset: number
}