import axios, { AxiosResponse } from 'axios'

type User = {
  name: string,
  email: string,
  challenges: number,
  level: number,
  currentExperience: number,
}

export async function login(name: string, email: string){
  const uri = "http://localhost:8080/login"
        
  const body = {
    name,
    email
  }

  const response = await axios.post<any, AxiosResponse<User>>(uri, body)

  return response.data
}

interface UpdateUser {
  level: number;
  currentExperience: number;
  challenges: number;
}

export async function updateUser(email: string, newStatus: UpdateUser){

  const uri = "http://localhost:8080/users"

  const body = {
    email,
    ...newStatus
  }

  const response = await axios.put<any, AxiosResponse<User>>(uri, body)
  
  return response.data
} 