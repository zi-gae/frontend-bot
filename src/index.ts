import * as core from "@actions/core";
import * as github from "@actions/github";
import { sendGithubPullRequestOpenMessage } from "./utils/slack";
import { getPullRequest } from "./utils/pullRequest";

const { eventName, payload } = github.context;

async function main() {
  core.info("🔥 Run.....");
  core.info(`eventName = ${eventName}`);
  core.info(`action = ${payload.action}`);

  const pullRequest = await getPullRequest();

  core.info("Pull Request 오픈이 감지되었습니다. 슬랙 메세지를 보냅니다.");
  await sendGithubPullRequestOpenMessage({ pullRequest });

  core.info("👋 Done!");
}

try {
  main();
} catch (error: any) {
  core.setFailed(error);
}
