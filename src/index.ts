import * as core from "@actions/core";
import * as github from "@actions/github";
import { sendCanaryPublishMessage } from "./utils/slack";
import { getPullRequest } from "./utils/pullRequest";
import { parseGithubEvent } from "./utils/github/events";
import { GithubActionEventName } from "./models/github";

const { eventName, payload } = github.context;

async function main() {
  core.info("🔥 Run.....");
  core.info(`eventName = ${eventName}`);
  core.info("🔥 🔥 🔥 🔥 🔥");
  core.info(`action = ${payload.action}`);
  core.info("🔥 🔥 🔥 🔥 🔥");

  const pullRequest = await getPullRequest();
  const githubEvent = parseGithubEvent();

  if (!githubEvent) {
    core.info("👋 타입이 없습니다.");
    return;
  }

  switch (githubEvent.type) {
    case GithubActionEventName.카나리: {
      core.info("카나리 배포가 되었습니다, 슬랙 메세지를 보냅니다.");
      await sendCanaryPublishMessage({ pullRequest });
      break;
    }
    case GithubActionEventName.PR승인: {
      core.info("Pull Request 승인이 감지되었습니다. 슬랙 메세지를 보냅니다.");
      await sendCanaryPublishMessage({ pullRequest });
      break;
    }
  }

  core.info("👋 Done!");
}

try {
  main();
} catch (error: any) {
  core.setFailed(error);
}
