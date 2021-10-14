import * as github from "@actions/github";
import { GithubPullRequest } from "models/github";

export async function getPullRequest(): Promise<GithubPullRequest> {
  const { pull_request } = github.context.payload;
  console.log("🎇", pull_request);

  return {
    title: (pull_request?.title ?? "") as string,
    body: pull_request?.body ?? "",
    link: (pull_request?._links.html.href ?? "") as string,
  };
}
