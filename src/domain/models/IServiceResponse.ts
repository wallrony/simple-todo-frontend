interface IServiceResponse<T> {
  data?: T;
  error?: string;
}

export default IServiceResponse;
