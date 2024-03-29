/* eslint-disable */

export const protobufPackage = "";

export interface Empty {
}

export interface Error {
  code: number;
  message: string;
}

export interface EmptyOrError {
  empty?: Empty | undefined;
  error?: Error | undefined;
}

export interface GetAllRequest {
  search?: string | undefined;
  skip?: number | undefined;
  pageSize?: number | undefined;
  desc?: boolean | undefined;
}

export interface Paginator {
  count: number;
  currentPage: number;
  totalPages: number;
}

export interface GetByIdRequest {
  id: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string | undefined;
  image?: string | undefined;
  permission: string;
  isActivated: boolean;
}

export const _PACKAGE_NAME = "";
