
export abstract class BaseResponseDto<T> {
    abstract isSuccess: boolean;
    abstract totalCount: number;
    abstract data?: T[];
} 