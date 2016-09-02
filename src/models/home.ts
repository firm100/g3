import {Const} from './const'

// AuthConfig contains authorization information
export class HomeAuthConfig {
  username: string
  password: string
  accessToken: string
}

// Config ~/.get3w/config.json file info
export class HomeConfig {
  auth: string
  apps: Array<App>
  authConfig: HomeAuthConfig
}

export class App {
  id: string
  owner: string
  name: string
  from: string
  path: string
  private: boolean
  createdAt: string
  updatedAt: string
  starCount: number
  cloneCount: number
  origin: string
  host: string
  description: string
  tags: string
  thumbSmall: string
  thumbLarge: string
}

export class File {
  constructor(public isDir: boolean, public path: string, public name: string, public size: number){}
}

export class User {
  id: string
  username: string
  email: string
  avatarUrl: string
  createdAt: string
  updatedAt: string
  starred: number
  locale: string
  company: string
  location: string
  url: string
  billingPlanId: string
  billingCustomerId: string
  billingCardId: string

  constructor() { }
}

export class Token {
  owner: string
  scopes: string
  accessToken: string
  createdAt: string

  constructor() { }
}

export class Upload {
  userId: string
  uploadType: string
  url: string

  constructor() { }
}

export interface Error {
  status: number
  message: string
}

export enum ERestMethod {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH
}

export class ERestMethodUtils {
  static getValue(method: ERestMethod): string {
    if (method === ERestMethod.GET) {
      return "GET"
    } else if (method === ERestMethod.POST) {
      return "POST"
    } else if (method === ERestMethod.PUT) {
      return "PUT"
    } else if (method === ERestMethod.DELETE) {
      return "DELETE"
    } else if (method === ERestMethod.PATCH) {
      return "PATCH"
    }
    return "POST"
  }

  static equals(methodStr: string, method: ERestMethod) {
    return (ERestMethodUtils.getValue(method) === methodStr)
  }

  static errorCode(status: number): string {
    switch (status) {
      case Const.STATUS_BAD_REQUEST:
        return 'Bad Request'
      case Const.STATUS_UNAUTHORIZED:
        return 'Unauthorized'
      case Const.STATUS_PAYMENT_REQUIRED:
        return 'Payment Required'
      case Const.STATUS_FORBIDDEN:
        return 'Forbidden'
      case Const.STATUS_NOT_FOUND:
        return 'Not Found'
      case Const.STATUS_METHOD_NOT_ALLOWED:
        return 'Method Not Allowed'
      case Const.STATUS_NOT_ACCEPTABLE:
        return 'Not Acceptable'
      case Const.STATUS_PROXY_AUTHENTICATION_REQUIRED:
        return 'Proxy Authentication Required'
      case Const.STATUS_REQUEST_TIMEOUT:
        return 'Request Timeout'
      case Const.STATUS_CONFLICT:
        return 'Conflict'
      case Const.STATUS_GONE:
        return 'Gone'
      case Const.STATUS_LENGTH_REQUIRED:
        return 'Length Required'
      case Const.STATUS_INTERNAL_SERVER_ERROR:
        return 'Internal Server Error'
    }
    return 'Unknown Error'
  }
}

export interface Options {
  api?: string;
  token?: string;
  username?: string;
  password?: string;
}
