import * as github from "@actions/github";
import { ActionEventName } from "models/github";
import { BUILD_TYPE, PLANE_TEXT } from "utils/input";

function isReadyCanaryBuild() {
  const { eventName } = github.context;
  const isPullReqeustEvent = eventName === "issue_comment";
  const isReadyForCanary = BUILD_TYPE === "canary";

  console.log(eventName, BUILD_TYPE);

  return isPullReqeustEvent && isReadyForCanary;
}

function isApprovedCodeReview() {
  const { eventName, payload } = github.context;
  const isReviewEvent = eventName === "pull_request_review";
  return (
    isReviewEvent &&
    payload.action === "submitted" &&
    payload.review.state === "approved"
  );
}

function hasPlaneText() {
  return PLANE_TEXT;
}

export function parseGithubEvent() {
  if (isReadyCanaryBuild()) {
    return {
      type: ActionEventName.카나리,
    };
  } else if (isApprovedCodeReview()) {
    return {
      type: ActionEventName.PR승인,
    };
  } else if (hasPlaneText()) {
    return {
      type: ActionEventName.입력,
    };
  }

  return null;
}