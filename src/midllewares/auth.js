import { Response, Request, NextFunction } from "express";

export const isAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    }else{
        res.status(401).json('unauthoraized')
    }

}
export const isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user?.isAdmin === true){
        next()
    }else{
        res.status(401).json('forbidden')
    }

}