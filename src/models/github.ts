export interface GithubPullRequest {
  title: string;
  body: string;
  link: string;
}

export interface GithubPullRequestComment {
  author: Developer;
  message: string;
}

export interface Developer {
  name: string;
  githubUserName: string;
  slackUserId: string;
}

export enum GithubActionEventName {
  카나리 = "CREATED_CANARY",
  PR승인 = "APPROVED_PULL_REQUEST",
}

export interface GithubActionEvent {
  type: GithubActionEventName;
}
