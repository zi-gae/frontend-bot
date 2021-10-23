import * as github from "@actions/github";
import { ActionEventName } from "models/github";
import { BUILD_TYPE, PLANE_TEXT } from "utils/input";

function isReadyCanaryBuild() {
  const isReadyForCanary = BUILD_TYPE === "canary";

  return isReadyForCanary;
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
  return PLANE_TEXT && !BUILD_TYPE;
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
