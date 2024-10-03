declare module 'yle-teletext-scaper' {
  export const get = (
    page: number = 100,
    subpage: number = 1,
    fetchSubPages: boolean = true,
  ) => Promise<string[]>;
}
