const commentData = require("../models/CommentData");


const QueryListOfComments = () => {
    return commentData;
  };

const PostNewCommentByAppending = (body : any) => {
    const newComment = body;
    commentData.push(newComment);
  };
  
  export {
    QueryListOfComments,
    PostNewCommentByAppending
  };