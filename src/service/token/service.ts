import { Response, request } from "../service";
import { Token, UserLoginRequest } from "./interface";
import  '../service'
export default async function Login(user:UserLoginRequest):Promise<Response<Token>>{
  
  try {
  return await request({
    method:"POST",
    endpoint:"/api/Account/login",
    body: user
  })
}catch(err){
  return {
    status: 500,
    error: `${err}`
  };
}}
