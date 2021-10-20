import * as github from "@actions/github";
import { GithubPullRequest, GithubComment } from "models/github";

export async function getPullRequest(): Promise<GithubPullRequest> {
  const { pull_request } = github.context.payload;
  return {
    title: (pull_request?.title ?? "") as string,
    body: pull_request?.body ?? "",
    link: (pull_request?._links.html.href ?? "") as string,
  };
}

export async function getComment(): Promise<GithubComment> {
  const { comment } = github.context.payload;
  return {
    body: comment?.body ?? "",
    link: (comment?.html_url ?? "") as string,
  };
}
