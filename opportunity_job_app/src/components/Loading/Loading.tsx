"use client"
import { ReactNode, useEffect, useState } from "react"
import { setLocalStorage } from "@/api/baseApi"
import { AuthService } from "@/api/authService"

type LoadingProps = {
    children: ReactNode;
}

const Loading = ({children}:LoadingProps) => {
    const [preview, setPreview] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const isLogged = () => {
            setLocalStorage()
            if(AuthService.getUser() !== null){
                setPreview(true)
                setUsers(AuthService.getUser())
            }
        }
        isLogged()
    },[preview])

    return(
        <>
        {console.log(users)}
        <h1>Test</h1>
        {preview ? children : <span>ERROR</span>}

        </>
    )
}

export default Loading