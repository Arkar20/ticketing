import axios from "axios"
const axiosNext=(context)=>{
    let api;
    if(typeof window==='undefined'){
         api= axios.create({
            baseURL:'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers:context.req.headers
         })
    }
    else{
      
        api= axios.create({
            baseURL:'/'
        })
    }
    return api;
}

export {axiosNext}