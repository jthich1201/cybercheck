const { QueryListOfComments, PostNewCommentByAppending } = require("../services/CommentTable");
import { saveComment } from "../services/commentService";
import { Request, Response } from "express";

const GetAllComments = (req: any, res : any) => {
    const commentList = QueryListOfComments();
    return res.json(commentList);
}

const PostNewComment = (req : any , res : any) => {
    PostNewCommentByAppending(req.body);
    const commentList = QueryListOfComments();
    return res.json(commentList);
}

export const addCommentController = async (req: Request, res: Response) => {
    const { taskId, commentText } = req.body;
    try {
      const comment = await saveComment(taskId, commentText);
      res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error saving comment" });
    }
  }

export {
    GetAllComments,
    PostNewComment
  };


