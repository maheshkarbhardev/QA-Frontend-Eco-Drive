import { useEffect, useState } from "react";

function useTimeOutMessage(interval=3000){
    const [message,setMessage]=useState(''); //message state starts empty

    useEffect(()=>{
        if(message){
            let timeout=setTimeout(()=> setMessage(''),interval) //whenever message is set (non-empty) , a timer clears it after interval ms default 3sec.

            return()=> {
                clearTimeout(timeout)
            }
        }
    },[message])

    return [message,setMessage]
}

export default useTimeOutMessage;