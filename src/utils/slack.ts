import { ChatPostMessageArguments, WebClient } from "@slack/web-api";
import { SLACK_BOT_TOKEN, TARGET_SLACK_CHANNEL_ID } from "./input";
import { GithubPullRequest } from "../models/github";
import { canaryBodyParser } from "./canaryBodyParser";

const slackClient = new WebClient(SLACK_BOT_TOKEN);

export function sendMessage(args: ChatPostMessageArguments) {
  console.log("🎉", args);
  return slackClient.chat.postMessage(args);
}

export async function sendCanaryPublishMessage({
  pullRequest: { link, title, body },
}: {
  pullRequest: GithubPullRequest;
}) {
  const header = ":sparkles: 다음을 통해 PR을 테스트:\n";

  const content = canaryBodyParser(body);
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${
          header + "\n" + content
        }* > <${link}|${title}> 풀리퀘스트에 카나리 배포가 되었어요!`,
      },
    },
  ];

  return sendMessage({
    channel: TARGET_SLACK_CHANNEL_ID,
    text: "",
    blocks,
  });
}
