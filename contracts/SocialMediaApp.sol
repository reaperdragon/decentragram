// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/*
* @author Aakrut
* @title SocialMedia App
*/
contract SocialMediaApp {

    // events

    /* 
    * @title UploadPost
    * @dev log upload post
    * @param post id, post image, caption, tags, user
    */
    event UploadPost (
        uint256 postId,
        string  postImage,
        string caption,
        string tags,
        string date,
        address user
    );

    /* 
    * @title UploadComment
    * @dev log upload comment
    * @param comment id, post id, comment, comment user
    */
    event UploadComment (
       uint256 commentId,
        uint256 relatedPostId,
        string comment,
        string commentDate,
        address commentedUser
    );

    // state vars
    string private name;
    address private owner;

    using Counters for Counters.Counter;
    Counters.Counter private _postIds;
    Counters.Counter private _commentIds;

    // Post Structure
    struct Post {
        uint256 postId;
        string  postImage;
        string caption;
        string tags;
        string date;
        address user;
    }

    // Comment Structure
    struct Comment {
        uint256 commentId;
        uint256 relatedPostId;
        string comment;
        string commentDate;
        address commentedUser;
    }   
     // 1 -> 1 , 3D Balls, 3D Render Image, 3D render, 2022
    mapping(uint256 => Post) private idToPost;
    // 1 -> 1 ,1, Awesome 3D Rendering 2022
    mapping(uint256 => Comment) private idToComment;

    constructor(string memory _name) {
        console.log("Scocial Media App Name",_name);
        name = _name;
        owner = msg.sender;
    }

    /* 
    * @title uploadpost
    * @dev log upload post
    * @param  post image, caption, tags, post date
    */
    function uploadpost(string memory postImage, string memory caption, string memory tags,string memory postDate) public {
        require(bytes(postImage).length > 0,"Please Select Post");
        require(bytes(caption).length > 0,"Please Enter Caption!");
        require(bytes(tags).length > 0,"Please Enter Tag");

        _postIds.increment();

        uint256 currentPostId = _postIds.current();

        Post storage post = idToPost[currentPostId];
        post.postId = currentPostId;
        post.postImage = postImage;
        post.caption = caption;
        post.tags = tags;
        post.date = postDate;
        post.user = msg.sender;

        emit UploadPost(currentPostId,postImage,caption,tags,postDate,msg.sender);
    }

      /* 
    * @title uploadComment
    * @dev log upload comment
    * @param  post id, post comment, comment date
    */
    function uploadcomment(uint postId,string memory postComment,string memory date) public {
        require( _postIds.current() > 0 && postId != 0 , "Post Not Awailable");
        require(bytes(postComment).length > 0,"Please Add Comment");

        _commentIds.increment();

        uint256 currentCommentId = _commentIds.current();

        Comment storage comment = idToComment[currentCommentId];
        comment.commentId = currentCommentId;
        comment.relatedPostId = postId;
        comment.comment = postComment;
        comment.commentDate = date;
        comment.commentedUser = msg.sender;

        emit UploadComment(currentCommentId,postId,postComment,date,msg.sender);

    }

    /* 
    * @title getPost
    * @dev log get post
    * @param post id
    */
    function getPost(uint256 id) public view returns(Post memory) {
        return idToPost[id];
    }

    /* 
    * @title getPosts
    * @dev log get posts
    */
    function getPosts() public view returns(Post[] memory) {
        // get the total posts from id
        uint256 totalPosts = _postIds.current();

        // create fixed size array
        Post[] memory posts = new Post[](totalPosts);

        for(uint i=0; i<totalPosts; i++) {
             uint currentId = i + 1;
            Post storage currentItem = idToPost[currentId];
            posts[i] = currentItem;
        }
        return posts;
    }

    /* 
    * @title getComments
    * @dev log get comments
    */

    function getComments() public view returns(Comment[] memory) {
        // get the total comments from id
        uint256 totalComments = _commentIds.current();

        // create fixed size array
        Comment[] memory comments = new Comment[](totalComments);

        for(uint i=0; i<totalComments; i++) {
             uint currentId = i + 1;
            Comment storage currentItem = idToComment[currentId];
            comments[i] = currentItem;
        }
        return comments;
    }

}