
export const isLogin= async(req,res,next)=>{
    try {
        if (req.user) {
            next()
        }else{
            res.redirect('/error_add_login')
        }
    } catch (error) {
        console.log(error)   
    }
}

// export const  async=(req,res,next)=>{
//     try {
        
//     } catch (error) {
//         console.log(error)
//     }
// }