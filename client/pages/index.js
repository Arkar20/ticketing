import {axiosNext} from "../service"

const Index=({currentUser})=>{

    return currentUser ?<h1>You are signin </h1>:<h2>YOu are not sign in</h2>
}
Index.getInitialProps=async(context)=>{
    
    const response= await axiosNext(context.req.headers).get('/api/users/currentuser')

    return response.data
    
}
export default Index;