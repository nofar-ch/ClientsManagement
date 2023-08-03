
abstract class BaseResponseDto<T> {
    abstract isSuccess: boolean;
    abstract data?: T[];
} 