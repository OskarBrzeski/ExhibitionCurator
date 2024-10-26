export type Objects = number[];

export type Object = {
  objectID: number;
  primaryImage: string;
  title: string;
};

export type Departments = {
  departmentId: number;
  displayName: string;
}[];

export type Search = {
  objectIDs: number[];
  total: number;
};
