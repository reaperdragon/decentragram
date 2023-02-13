import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  UploadComment,
  UploadPost
} from "../generated/SocialMediaApp/SocialMediaApp"

export function createUploadCommentEvent(
  commentId: BigInt,
  relatedPostId: BigInt,
  comment: string,
  commentDate: string,
  commentedUser: Address
): UploadComment {
  let uploadCommentEvent = changetype<UploadComment>(newMockEvent())

  uploadCommentEvent.parameters = new Array()

  uploadCommentEvent.parameters.push(
    new ethereum.EventParam(
      "commentId",
      ethereum.Value.fromUnsignedBigInt(commentId)
    )
  )
  uploadCommentEvent.parameters.push(
    new ethereum.EventParam(
      "relatedPostId",
      ethereum.Value.fromUnsignedBigInt(relatedPostId)
    )
  )
  uploadCommentEvent.parameters.push(
    new ethereum.EventParam("comment", ethereum.Value.fromString(comment))
  )
  uploadCommentEvent.parameters.push(
    new ethereum.EventParam(
      "commentDate",
      ethereum.Value.fromString(commentDate)
    )
  )
  uploadCommentEvent.parameters.push(
    new ethereum.EventParam(
      "commentedUser",
      ethereum.Value.fromAddress(commentedUser)
    )
  )

  return uploadCommentEvent
}

export function createUploadPostEvent(
  postId: BigInt,
  postImage: string,
  caption: string,
  tags: string,
  date: string,
  user: Address
): UploadPost {
  let uploadPostEvent = changetype<UploadPost>(newMockEvent())

  uploadPostEvent.parameters = new Array()

  uploadPostEvent.parameters.push(
    new ethereum.EventParam("postId", ethereum.Value.fromUnsignedBigInt(postId))
  )
  uploadPostEvent.parameters.push(
    new ethereum.EventParam("postImage", ethereum.Value.fromString(postImage))
  )
  uploadPostEvent.parameters.push(
    new ethereum.EventParam("caption", ethereum.Value.fromString(caption))
  )
  uploadPostEvent.parameters.push(
    new ethereum.EventParam("tags", ethereum.Value.fromString(tags))
  )
  uploadPostEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromString(date))
  )
  uploadPostEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return uploadPostEvent
}
