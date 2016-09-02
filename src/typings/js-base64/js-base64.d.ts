/// <reference path="../node/node.d.ts"/>

declare module 'js-base64' {
    export class Base64{
      static encode(buffer: string): string;
      static encodeURI(buffer: string): string;
      static decode(base64: string): string;
      static decodeURI(base64: string): string;
    }
}
