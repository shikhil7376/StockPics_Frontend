export interface signupTypes{
    name?:string;
    email?:string;
    password?:string;
    phone?:string;
    _id?:string
}

export interface uploadDataTypes {
    url: string;
    description: string;
    userid:string;
}

export interface getDataTypes extends uploadDataTypes{
    id:string
}