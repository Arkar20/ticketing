import { useState } from "react"
import axios from "axios"


const useRequest=({url,method,onSuccess})=>{
    const [errors, setErrors] = useState([])

    const doRequest=async(payload)=>{
        try {
            const response=await axios[method](url,payload); 
            onSuccess();

        } catch (error) {
            setErrors(error.response.data)
        }
        
    }

    return {
        doRequest,
        errors
    }

}

export {useRequest}