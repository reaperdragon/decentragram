import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as";
import { BigInt, Address } from "@graphprotocol/graph-ts";
import { UploadComment } from "../generated/schema";
import { UploadComment as UploadCommentEvent } from "../generated/SocialMediaApp/SocialMediaApp";
import { handleUploadComment } from "../src/social-media-app";
import { createUploadCommentEvent } from "./social-media-app-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let commentId = BigInt.fromI32(234);
    let relatedPostId = BigInt.fromI32(234);
    let comment = "Example string value";
    let commentDate = "Example string value";
    let commentedUser = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let newUploadCommentEvent = createUploadCommentEvent(
      commentId,
      relatedPostId,
      comment,
      commentDate,
      commentedUser
    );
    handleUploadComment(newUploadCommentEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("UploadComment created and stored", () => {
    assert.entityCount("UploadComment", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "UploadComment",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "commentId",
      "234"
    );
    assert.fieldEquals(
      "UploadComment",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "relatedPostId",
      "234"
    );
    assert.fieldEquals(
      "UploadComment",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "comment",
      "Example string value"
    );
    assert.fieldEquals(
      "UploadComment",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "commentDate",
      "Example string value"
    );
    assert.fieldEquals(
      "UploadComment",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "commentedUser",
      "0x0000000000000000000000000000000000000001"
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
