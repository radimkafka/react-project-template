/* eslint-disable */
// THIS FILE WAS GENERATED
// ALL CHANGES WILL BE OVERWRITTEN

// INFRASTRUCTURE START
export type StandardError = globalThis.Error;
export type Error500s = 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;
export type ErrorStatuses = 0 | Error500s;
export type ErrorResponse = FetchResponse<unknown, ErrorStatuses>;

export type FetchResponseOfError = {
  data: null;
  error: StandardError;
  status: ErrorStatuses;
  args: FetchArgs;
};

export type FetchResponseOfSuccess<TData, TStatus extends number = 0> =
  {
    data: TData;
    error: null;
    status: TStatus;
    args: FetchArgs;
    responseHeaders: Headers;
  };

export type FetchResponse<TData, TStatus extends number = 0> =
  TStatus extends ErrorStatuses ? FetchResponseOfError : FetchResponseOfSuccess<TData, TStatus>;

export type TerminateRequest = null;
export type TerminateResponse = null;

export type Configuration = {
  apiUrl: string | (() => string);
  jwtKey: string | undefined | (() => string | null | undefined);
  requestMiddlewares?: Array<{
    name: string;
    fn: (request: FetchArgs) => FetchArgs | TerminateRequest;
  }>;
  responseMiddlewares?: Array<{
    name: string;
    fn: <TData, TStatus extends number>(
      response: FetchResponse<TData, TStatus>,
    ) => FetchResponse<TData, TStatus> | TerminateResponse;
  }>;
};

let CONFIG: Configuration = {
  apiUrl: () => "",
  jwtKey: undefined,
  requestMiddlewares: [],
  responseMiddlewares: [],
};

export function setupClient(configuration: Configuration) {
  CONFIG = {
    ...CONFIG,
    ...configuration,
    requestMiddlewares: [
      ...(CONFIG.requestMiddlewares || []),
      ...(configuration.requestMiddlewares || []),
    ],
    responseMiddlewares: [
      ...(CONFIG.responseMiddlewares || []),
      ...(configuration.responseMiddlewares || []),
    ],
  };
}

export function getApiUrl() {
  if (typeof CONFIG.apiUrl === "function") {
    return CONFIG.apiUrl();
  }
  return CONFIG.apiUrl;
}

export type Termination = {
  termination: {
    name: string;
  };
};

export function processRequestWithMiddlewares(
  request: FetchArgs
): FetchArgs | Termination {
  for (const middleware of CONFIG.requestMiddlewares || []) {
    try {
      const middlewareResponse = middleware.fn(request);
      if (middlewareResponse === null) {
        return { termination: { name: middleware.name } };
      }
      return middlewareResponse;
    } catch (e) {
      console.error("Request middleware error", e);
    }
  }
  return request;
}

export function processResponseWithMiddlewares<TData, TStatus extends number>(
  response: FetchResponse<TData, TStatus>,
): FetchResponse<TData, TStatus | 0> {
  for (const middleware of CONFIG.responseMiddlewares || []) {
    try {
      const middlewareResponse = middleware.fn(response);
      if (middlewareResponse === null) {
        return {
          status: 0,
          args: response.args,
          data: null,
          error: new Error(
            `Response terminated by middleware: ${middleware.name}`
          ),
        } satisfies FetchResponseOfError;
      }
      response = middlewareResponse;
    } catch (e) {
      console.error("Response middleware error", e);
    }
  }
  return response;
}

export type FetchArgsOptions = Omit<RequestInit, "method" | "redirect" | "body">;

export type FetchArgs = {
  url: string;
  options: RequestInit;
}

export type UriComponent = string | number | boolean;
export type ParamsObject = {
  [key: string]: UriComponent | UriComponent[] | undefined | null;
};

export async function fetchJson<TData>(args: FetchArgs): Promise<FetchResponse<TData, number> | FetchResponseOfError> {
  const errorResponse = (error: StandardError, status: number, args: FetchArgs) => {
    const errorResponse = {
      status: status as ErrorStatuses,
      args,
      data: null,
      error,
    } satisfies FetchResponseOfError;

    return processResponseWithMiddlewares(errorResponse);
  };

  const errorStatus = (args: FetchArgs) => {
    const errorResponse = {
      status: 0,
      args,
      data: null,
      error: new Error("Network error"),
    } satisfies FetchResponseOfError;

    return processResponseWithMiddlewares(errorResponse);
  };

  try {
    const fetchRequest = processRequestWithMiddlewares(args);

    if ("termination" in fetchRequest) {
      const terminationResponse = {
        status: 0,
        args,
        data: null,
        error: new Error(
          `Request terminated by middleware: ${fetchRequest.termination.name}`
        ),
      } satisfies FetchResponseOfError;

      return processResponseWithMiddlewares(terminationResponse);
    }

    const fetchResponse: Response = await fetch(fetchRequest.url, fetchRequest.options);
    const status = fetchResponse.status;
    try {
      const json = await fetchResponse.json();
      const response = {
        data: json,
        status: fetchResponse.status,
        args,
        error: null,
        responseHeaders: fetchResponse.headers,
      };
      return processResponseWithMiddlewares(response);
    } catch (error) {
      return errorResponse(error as StandardError, status, args);
    }
  } catch {
    return errorStatus(args);
  }
}

export function getJwtKey(): string | null | undefined {
  if (typeof CONFIG.jwtKey === "function") {
    return CONFIG.jwtKey();
  }

  if (typeof CONFIG.jwtKey === "string") {
    return localStorage.getItem(CONFIG.jwtKey);
  }

  return undefined;
}


function getApiRequestData<Type extends any>(
  requestContract: Type | undefined,
  isFormData: boolean = false
): FormData | Type | {} {

  if (!isFormData) {
    return requestContract !== undefined ? requestContract : {};
  }

  //multipart/form-data
  const formData = new FormData();

  if (requestContract) {
    Object.keys(requestContract).forEach(key => {
      const value = requestContract[key as keyof Type];
      const isKeyArrayAndValueIterable = key.endsWith('[]') && typeof (value as any)[Symbol.iterator] === 'function';
      const values = isKeyArrayAndValueIterable ? Array.from(value as Iterable<any>) : [value];
      for (const val of values) {
        if (val === undefined) {
          continue;
        }
        if (val === null) {
          formData.append(key, '');
        } else if (val instanceof File) {
          formData.append(key, val);
        } else if (typeof val === 'object' && val !== null) {
          formData.append(key, JSON.stringify(val));
        } else {
          formData.append(key, val);
        }
      }
    });
  }

  return formData;
}


function updateHeaders(headers: HeadersInit) {
  const token = getJwtKey();
  if (headers instanceof Headers) {
    if (!headers.has("Content-Type")) {
      headers.append("Content-Type", "application/json");
    }
    if (!headers.has("Authorization") && !!token) {
      headers.append("Authorization", token);
    }
    return;
  }

  if (Array.isArray(headers)) {
    if (!headers.find(([key]) => key === "Content-Type")) {
      headers.push(["Content-Type", "application/json"]);
    }
    if (!headers.find(([key]) => key === "Authorization") && !!token) {
      headers.push(["Authorization", token]);
    }
    return;
  }

  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  if (!headers.Authorization && !!token) {
    headers.Authorization = token;
  }
}

function removeContentTypeHeader(headers: HeadersInit) {
  if (headers instanceof Headers) {
    headers.delete("Content-Type");
    return;
  }

  if (Array.isArray(headers)) {
    return headers.filter(([key]) => key !== "Content-Type");
  }

  delete headers["Content-Type"];
}

export function createRequest<TRequest>(
  method: string,
  request: TRequest | undefined,
  options: FetchArgsOptions | undefined,
  url: string,
  paramsObject: ParamsObject = {},
) {
  const fetchOptions = options ?? {};

  if (!fetchOptions.headers) {
    fetchOptions.headers = new Headers();
  }

  updateHeaders(fetchOptions.headers);
  if (request instanceof FormData) {
    removeContentTypeHeader(fetchOptions.headers);
  }

  const body = request !== undefined || !(request instanceof FormData) ? JSON.stringify(request) : undefined;
  const maybeQueryString = getQueryParamsString(paramsObject);

  const requestOptions: RequestInit = {
    ...fetchOptions,
    method,
    body,
    redirect: "follow",
  };

  return { options: requestOptions, url: `${url}${maybeQueryString}` } as FetchArgs;
}

export function getQueryParamsString(paramsObject: ParamsObject = {}) {
  const queryString = Object.entries(paramsObject)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .map(val => `${encodeURIComponent(key)}=${encodeURIComponent(
            val,
          )}`)
          .join('&');
      }
      // Handling non-array parameters
      return value !== undefined && value !== null
        ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : '';
    })
    .filter(part => part !== '')
    .join("&");

  return queryString.length > 0 ? `?${queryString}` : '';
}

export function apiPost<TResponse extends FetchResponse<unknown, number>, TRequest>(
  url: string,
  request: TRequest,
  options: FetchArgsOptions | undefined,
  paramsObject: ParamsObject = {}
) {
  return fetchJson<TResponse>(createRequest("POST", request, options, url, paramsObject));
}

export function apiGet<TResponse extends FetchResponse<unknown, number>>(
  url: string,
  options: FetchArgsOptions | undefined,
  paramsObject: ParamsObject = {}
) {
  return fetchJson<TResponse>(createRequest("GET", undefined, options, url, paramsObject));
}

export function apiPut<TResponse extends FetchResponse<unknown, number>, TRequest>(
  url: string,
  request: TRequest,
  options: FetchArgsOptions | undefined,
  paramsObject: ParamsObject = {}
) {
  return fetchJson<TResponse>(createRequest("PUT", request, options, url, paramsObject));
}

export function apiDelete<TResponse extends FetchResponse<unknown, number>>(
  url: string,
  options: FetchArgsOptions | undefined,
  paramsObject: ParamsObject = {}
) {
  return fetchJson<TResponse>(createRequest("DELETE", undefined, options, url, paramsObject));
}

export function apiPatch<TResponse extends FetchResponse<unknown, number>, TRequest>(
  url: string,
  request: TRequest,
  options: FetchArgsOptions | undefined,
  paramsObject: ParamsObject = {}
) {
  return fetchJson<TResponse>(createRequest("PATCH", request, options, url, paramsObject));
}
// INFRASTRUCTURE END


export type GetTFetchResponse =
  | FetchResponse<void, 200>
  | FetchResponse<void, 401>
  | ErrorResponse;

export const getTPath = () => `/?t`;

export const getT = (t: string, y?: number, type?: string, plot?: string, r?: string, callback?: string, options?: FetchArgsOptions):
  Promise<GetTFetchResponse> => {
  const queryParams = {
    "t": t,
    "y": y,
    "type": type,
    "plot": plot,
    "r": r,
    "callback": callback
  }
  return apiGet(`${getApiUrl()}${getTPath()}`, options, queryParams) as Promise<GetTFetchResponse>;
}

export type Movie = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type MovieRating = {
  Source: string;
  Value: string;
};

export type GetIFetchResponse =
  | FetchResponse<Movie, 200>
  | FetchResponse<void, 401>
  | ErrorResponse;

export const getIPath = () => `/?i`;

export const getI = (i: string, plot?: string, r?: string, callback?: string, options?: FetchArgsOptions):
  Promise<GetIFetchResponse> => {
  const queryParams = {
    "i": i,
    "plot": plot,
    "r": r,
    "callback": callback
  }
  return apiGet(`${getApiUrl()}${getIPath()}`, options, queryParams) as Promise<GetIFetchResponse>;
}


export type MovieInfo = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};


export type GetMoviesResult = {
  totalResults: string;
  Search: MovieInfo[];  
    Response: string;
};

export type GetSFetchResponse =
  | FetchResponse<GetMoviesResult, 200>
  | FetchResponse<void, 401>
  | ErrorResponse;

export const getSPath = () => `/?s`;

export const getS = (s: string, y?: number, type?: string, r?: string, page?: number, callback?: string, options?: FetchArgsOptions):
  Promise<GetSFetchResponse> => {
  const queryParams = {
    "s": s,
    "y": y,
    "type": type,
    "r": r,
    "page": page,
    "callback": callback
  }
  return apiGet(`${getApiUrl()}${getSPath()}`, options, queryParams) as Promise<GetSFetchResponse>;
}
