import type { DefaultError, QueryFunctionContext, QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ErrorResponse, ErrorStatuses, FetchResponse, FetchResponseOfError } from "./Api";

type BaseResponse<TData = unknown> = FetchResponse<TData, number> | ErrorResponse;

export type SuccessResponse<TResponse extends BaseResponse> = Extract<TResponse, { status: 200 | 201 | 202 | 204 }>;

type SuccessResponseData<TResponse extends BaseResponse> = SuccessResponse<TResponse>["data"];

export type Statuses400s = 400 | 401 | 403 | 404 | 405 | 409 | 422;

export type ProcessResponseOptions = {
  skipToastFor?: (ErrorStatuses | Statuses400s)[] | true;
};

export type QueryInfo = {
  meta?: UseQueryOptions["meta"];
  queryKey: QueryKey;
};
export class ApiCallError extends Error {
  data: FetchResponseOfError | FetchResponse<unknown, Statuses400s>;
  queryInfo?: QueryInfo;
  options?: ProcessResponseOptions;

  constructor(
    message: string,
    data: FetchResponseOfError,
    options?: ProcessResponseOptions,
    queryKey?: QueryInfo["queryKey"],
    meta?: QueryInfo["meta"],
  ) {
    super(message);
    this.name = "ApiCallError";
    this.data = data;
    this.options = options;
    if (queryKey) {
      this.queryInfo = { queryKey, meta };
    }
  }

  protected isApiException = true;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isFetchResponseOfError = (obj: any): obj is FetchResponseOfError =>
  !!obj.data && typeof obj.status === "number";

export const handleResponseError = (error: unknown) => {
  const skipToast =
    error instanceof ApiCallError
      ? error.options?.skipToastFor === true || error.options?.skipToastFor?.includes(error.data.status)
      : false;

  const errorMessage = error instanceof Error ? error.message : "Unknown error";

  if (errorMessage && !skipToast) {
    toast.error(errorMessage, { id: errorMessage });
  }
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getMessageFromErrorResponse(response: any | undefined) {
  let errorMessage: string | undefined;
  let responseError = response;
  if (responseError instanceof ApiCallError) {
    responseError = responseError.data;
  }

  if (isFetchResponseOfError(responseError)) {
    responseError = responseError.data;
  }

  //if has property title
  if (responseError?.title?.length > 0 && responseError?.detail?.length > 0) {
    return `${responseError.title}: ${responseError.detail}`;
  }

  if (responseError?.title?.length > 0) {
    return responseError.title;
  }

  if (responseError instanceof Error) {
    errorMessage = responseError.message;
  }

  //Meaning API validation errors
  if (responseError.errors) {
    return undefined;
  }

  return errorMessage ?? "Unknown error";
}

export const processResponseBase =
  <TArgs, TResponse extends BaseResponse>(request: (args: TArgs, headers?: Headers) => Promise<TResponse>) =>
  async (args: TArgs): Promise<TResponse> => {
    const response = await request(args);
    return processResponseStatusCodeBase(response);
  };

/**
 *  Process response and throw error if status code is not 2xx
 * @param request request function
 * @returns Processed response
 */
export const processResponse =
  <TArgs, TResponse extends BaseResponse>(
    request: (args: TArgs, headers?: Headers) => Promise<TResponse>,
    options?: ProcessResponseOptions,
  ) =>
  async (args: TArgs): Promise<SuccessResponseData<TResponse>> => {
    const response = await request(args);
    return processResponseStatusCode(response, options);
  };

/**
 *  Process response and throw error if status code is not 2xx
 * @param request request function
 * @returns Processed response
 */
export const processResponseQuery =
  <TResponse extends BaseResponse, TQueryKey extends QueryKey = QueryKey>(
    request: (args: QueryFunctionContext<TQueryKey>, headers?: Headers) => Promise<TResponse>,
    options?: ProcessResponseOptions,
  ) =>
  async (args: QueryFunctionContext<TQueryKey>): Promise<SuccessResponseData<TResponse>> => {
    const response = await request(args);
    return processResponseStatusCode(response, options, args);
  };

export const processResponseAndExtractData =
  <TArgs, TResponse extends BaseResponse, TExtract extends keyof SuccessResponseData<TResponse>>(
    request: (args: TArgs, headers?: Headers) => Promise<TResponse>,
    propertyKey: TExtract,
  ) =>
  async (args: TArgs): Promise<SuccessResponseData<TResponse>[TExtract]> => {
    const response = await processResponse(request)(args);
    return response[propertyKey];
  };

function processResponseStatusCodeBase<TResponse extends BaseResponse, TQueryKey extends QueryKey = QueryKey>(
  response: TResponse,
  options?: ProcessResponseOptions,
  args?: QueryFunctionContext<TQueryKey, never>,
): TResponse {
  if (response?.status >= 400 || response?.status === 0) {
    const message = getMessageFromErrorResponse(response);

    if (response?.status !== 404) {
      throw new ApiCallError(message, response as FetchResponseOfError, options, args?.queryKey, args?.meta);
    }
  }

  return response;
}

function processResponseStatusCode<TResponse extends BaseResponse, TQueryKey extends QueryKey = QueryKey>(
  response: TResponse,
  options?: ProcessResponseOptions,
  args?: QueryFunctionContext<TQueryKey, never>,
): SuccessResponseData<TResponse> {
  return processResponseStatusCodeBase(response, options, args)?.data;
}

export type HandleCallResponse<TData> =
  | {
      isSuccess: true;
      data: TData;
    }
  | { isSuccess: false; data?: never };

/**
 * Similar to @function processResponse but used to handle manual api calls. It does not throw an error but shows a toast message when status is not 2xx.
 * @param request request function
 * @returns Processed response
 */
export const handleCall = async <TResponse extends BaseResponse>(
  request: Promise<TResponse>,
  options?: ProcessResponseOptions,
): Promise<HandleCallResponse<SuccessResponseData<TResponse>>> => {
  try {
    const response = await request;
    const data = processResponseStatusCode(response, options);
    return { isSuccess: true, data };
  } catch (error) {
    handleResponseError(error);
  }
  return { isSuccess: false };
};

export type QueryBasicOptions = {
  _defaulted?: UseQueryOptions["_defaulted"];
  _optimisticResults?: UseQueryOptions["_optimisticResults"];
  cacheTime?: UseQueryOptions["gcTime"];
  enabled?: boolean;
  initialDataUpdatedAt?: UseQueryOptions["initialDataUpdatedAt"];
  meta?: UseQueryOptions["meta"];
  networkMode?: UseQueryOptions["networkMode"];
  notifyOnChangeProps?: UseQueryOptions["notifyOnChangeProps"];
  refetchIntervalInBackground?: UseQueryOptions["refetchIntervalInBackground"];
  retryOnMount?: UseQueryOptions["retryOnMount"];
  staleTime?: number;
  refetchInterval?: number | false;
  refetchOnMount?: boolean | "always";
  refetchOnReconnect?: boolean | "always";
  refetchOnWindowFocus?: boolean | "always";
  retry?: boolean | number;
  retryDelay?: number;
  structuralSharing?: boolean;
  useErrorBoundary?: boolean;
};
