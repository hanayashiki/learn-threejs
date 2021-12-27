/// <reference types="vite/client" />

declare module "*.glsl" {
  const text: string;
  export default text;
}