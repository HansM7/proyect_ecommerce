export const isAdmin= async(req,res,next)=>{
    try {
        if (req.user) {
            if (req.user.type_user==="ADMIN") {
                next()
            }else{
                // res.redirect('/')
                res.json({
                    message:"Error no privileges"
                })
            }
        }else{
            // res.redirect('/')
            res.json({
                message:"Error no privileges"
            })
        }
    } catch (error) {
        console.log(error)
    }
}
