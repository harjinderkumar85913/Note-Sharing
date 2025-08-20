import { Navigate, Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminMaster(){
    const token = sessionStorage.getItem("token")
    const[showRedrict,setShowRedrict] = useState(false)

    useEffect(() =>{
        if(!token){
            toast.error("Please Login First")
        }
       const timer = setTimeout(() => {
        setShowRedrict(true)
       }, 500);
       return () => clearTimeout(timer)
    },[token])
    if(!token && showRedrict){
        return <Navigate to="/login" />
    }
    if(!token) return null;
    return(
        <>
        <AdminHeader/>
        <Outlet/>
        <AdminFooter/>
        </>
    )
}