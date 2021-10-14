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