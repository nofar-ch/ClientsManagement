namespace NessOrtClients.Dto
{
    public class BaseResponseDto<T>
    {
        public bool IsSuccess { get; set; }
        public int TotalCount { get; set; }
        public T? Data { get; set; }
    }
}
