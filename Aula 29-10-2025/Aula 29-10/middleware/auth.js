const jwt = require('jsonwebtoken')
const JWT_SECRET = "minha-senha";

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    //const token = req.body['auth'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if(token == null) {
        return res.status(401).json({
            erro:"Token não fornecido"})
    }
    jwt.verify(token, JWT_SECRET,
         (erro, userPayload)=>{
        if(erro){
            return res.status(403).json(
                {erro: "Token errado ou expirado."})
        }
        req.user = userPayload;
        next();
    })
}
function authorizeRole(allowedRoles){
        //const roles = [].concat(allowedRoles);
        //'admin' -> ['admin']


        return (req,res,next)=>{
                console.log(req.user.role)
                console.log(allowedRoles)
            if(!(req.user.role==allowedRoles)){
                return res.status(403).json({
                    erro: "Acesso negado"
                })
            }
            next();
        }
}
module.exports ={
    authenticateToken,
    authorizeRole
};