import * as github from "@actions/github";
import { GithubActionEvent, GithubActionEventName } from "models/github";
import { BUILD_TYPE } from "utils/input";

function isReadyCanaryBuild() {
  const { eventName } = github.context;
  const isPullReqeustEvent = eventName === "pull_request";
  const isReadyForCanary = BUILD_TYPE === "canary";

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

export function parseGithubEvent(): GithubActionEvent | null {
  if (isReadyCanaryBuild()) {
    return {
      type: GithubActionEventName.카나리,
    };
  } else if (isApprovedCodeReview()) {
    return {
      type: GithubActionEventName.PR승인,
    };
  }

  return null;
}
