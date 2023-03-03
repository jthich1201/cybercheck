const { QueryListOfComments, PostNewCommentByAppending } = require("../services/CommentTable");
import { saveComment } from "../services/commentService";
import { Request, Response } from "express";

const GetAllComments = (req: any, res : any) => {
    const commentList = QueryListOfComments();
    return res.json(commentList);
}

export const addCommentController = async (req: Request, res: Response) => {
    const { comment } = req.body;
    try {
      const comments = await saveComment(comment);
      res.status(201).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error saving comment" });
    }
  }

export {
    GetAllComments
  };


