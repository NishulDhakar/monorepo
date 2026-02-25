export interface IUser {
    name : string,
    email : string,
    password : string
}

export interface Request {
  body: {
    name: string;
    email: string;
    password: string;
  }
}


export interface Response {
  status: (code: number) => {
    json: (data: any) => void;
  };
  cookie: (name: string, value: string, options: any) => void;
}