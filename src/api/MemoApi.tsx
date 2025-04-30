import { MemoApiClient } from "../generated";

// https://github.com/ferdikoomen/openapi-typescript-codegen/issues/477
const memoApiClientOption = { 
    BASE: import.meta.env.VITE_API_BASE,
    HEADERS: { accept: "text/plain" },
 };
export const memoApi = new MemoApiClient(memoApiClientOption);