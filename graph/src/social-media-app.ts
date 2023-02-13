import {
  UploadComment as UploadCommentEvent,
  UploadPost as UploadPostEvent,
} from "../generated/SocialMediaApp/SocialMediaApp";
import { Post, Comment } from "../generated/schema";

export function handleUploadComment(event: UploadCommentEvent): void {
  let entity = new Comment(event.params.commentId.toString());

  entity.commentId = event.params.commentId;
  entity.relatedPostId = event.params.relatedPostId;
  entity.comment = event.params.comment;
  entity.commentDate = event.params.commentDate;
  entity.commentedUser = event.params.commentedUser;

  entity.save();
}

export function handleUploadPost(event: UploadPostEvent): void {
  let entity = new Post(event.params.postId.toString());

  entity.postId = event.params.postId;
  entity.postImage = event.params.postImage;
  entity.caption = event.params.caption;
  entity.tags = event.params.tags;
  entity.date = event.params.date;
  entity.user = event.params.user;

  entity.save();
}
