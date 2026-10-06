import { Request, Response } from "express";
import db from '../db/db.json' with { type: "json" }
//Here db is a json array

interface Body{
    id:number,
    message:string
}

const getMessage = (_:Request, res:Response):void => {
    res.json(db)
}


const postMessage = (req:Request<object, unknown, Body>, res:Response):void => {
    const data:Body = req.body;
    db.push(data);
    res.status(201).json({"message":"Added Successfully"});
}


const deleteMessage = (req:Request, res:Response):void => {
    const id:number = Number(req.params.id);
    const index:number = db.findIndex((i:Body) => i.id === id);

    if(index === -1){
        res.status(404).json({"message":"Id not found"});
        return
    }

    db.splice(index,1);
    res.status(200).json({"message":"Deleted Successfully"});
}

export {getMessage, postMessage, deleteMessage}