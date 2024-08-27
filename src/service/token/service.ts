import { request } from "../service";
import { Token, UserLoginRequest } from "./interface";
import '../service'
export default async function Login(user:UserLoginRequest):Promise<Token | number | undefined>{
  
  try{
  return await request({
    method:"POST",
    endpoint:"/api/Account/login",
    body: user
  })
}catch{
  return undefined;
}}