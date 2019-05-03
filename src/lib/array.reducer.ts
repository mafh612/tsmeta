/**
 * return first element of array
 */
const first: (previous: any, current: any) => any = (p: any): any => p

/**
 * return last element of array
 */
const last: (previous: any, current: any) => any = (p: any, c: any): any => !c ? p : c

export {
  first,
  last
}
