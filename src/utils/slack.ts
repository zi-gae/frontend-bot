import { ChatPostMessageArguments, WebClient } from "@slack/web-api";
import { SLACK_BOT_TOKEN, TARGET_SLACK_CHANNEL_ID } from "./input";
import { GithubComment } from "../models/github";
import { canaryBodyParser } from "./canaryBodyParser";

const slackClient = new WebClient(SLACK_BOT_TOKEN);

export function sendMessage(args: ChatPostMessageArguments) {
  return slackClient.chat.postMessage(args);
}

export async function sendCanaryPublishMessage({
  comment: { link, body },
}: {
  comment: GithubComment;
}) {
  const header = ":sparkles: 다음을 통해 PR 로컬 테스트:\n";

  const content = canaryBodyParser(body);
  console.log("content", content);

  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${
          header + "\n" + content + "\n"
        }  :point_right: <${link}|Link> 풀리퀘스트에 카나리 배포가 되었어요!`,
      },
    },
  ];

  return sendMessage({
    channel: TARGET_SLACK_CHANNEL_ID,
    text: "",
    blocks,
  });
}

export async function sendPlaneTextMessage({
  planeText,
}: {
  planeText: string;
}) {
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${planeText}`,
      },
    },
  ];

  return sendMessage({
    channel: TARGET_SLACK_CHANNEL_ID,
    text: "",
    blocks,
  });
}
