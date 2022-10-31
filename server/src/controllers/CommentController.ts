const { QueryListOfComments, PostNewCommentByAppending } = require("../services/CommentTable");


const GetAllComments = (req: any, res : any) => {
    const commentList = QueryListOfComments();
    return res.json(commentList);
}

const PostNewComment = (req : any , res : any) => {
    PostNewCommentByAppending(req.body);
    const commentList = QueryListOfComments();
    return res.json(commentList);
}

export {
    GetAllComments,
    PostNewComment
  };


