export declare enum CaseType {
    upper = 0,
    lower = 1,
    mixed = 2
}
export declare class Random {
    static alphanumeric(length?: number): string;
    static number(max: number): number;
    static character(caseType?: CaseType): string;
    static string(length?: number, caseType?: CaseType): string;
    static array(size: number, maxValueInArray?: number): number[];
    private static columns;
    static table(maxColumnLength?: number, maxRowLength?: number): {
        [key: string]: any;
    }[];
    static object(maxSize?: number): {
        [key: string]: string;
    };
}
