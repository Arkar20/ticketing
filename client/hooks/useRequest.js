import { useState } from "react"
import axios from "axios"


const useRequest=({url,method,onSuccess})=>{
    const [errors, setErrors] = useState([])

    const doRequest=async(payload)=>{
        try {
            const response=await axios[method](url,payload); 
            onSuccess();

        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
        
    }

    const errorsUI= (
        <div>
            {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => {
            return <li id={index}>{error.message}</li>;
          })}
        </ul>
      )}
        </div>
    )

    return {
        doRequest,
        errors,
        errorsUI
    }

}

export {useRequest}