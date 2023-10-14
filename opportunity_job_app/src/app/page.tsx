"use client"

import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { setLocalStorage } from "@/api/baseApi"
import { AuthService } from "@/api/authService"

type User = {
  token: string;
  id: number;
  accountType: string;
};

export default function Home() {
  const [users, setUsers] = useState<User>()
  useEffect(() => {
    const isLogged = () => {
        setLocalStorage()
        if(AuthService.getUser() !== null){
            setUsers(AuthService.getUser())
        }
    }
    isLogged()
},[])

  return (
    <>
      <Header users={users}/>
      <main>
          <h1 className='test'>LETS GOOO</h1>
      </main>
    </>
  )
}
