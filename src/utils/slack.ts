import { ChatPostMessageArguments, WebClient } from "@slack/web-api";
import { SLACK_BOT_TOKEN, TARGET_SLACK_CHANNEL_ID } from "./input";
import { GithubComment } from "../models/github";
import { canaryBodyParser } from "./canaryBodyParser";

const dummy =
  "### Changes\r\n\r\n### Check points\r\n- [ ] 브라우저 호환성 테스트\r\n\r\n### Notes\r\n\r\n### Post Actions\r\n\n<!-- GITHUB_RELEASE PR BODY: canary-version -->\n<details>\n  <summary>📦 Published PR as canary version: <code>2.0.2-canary.1.29ff6c6b9df189bfd673f1c840878282560ea0e9.0</code></summary>\n  <br />\n  \n  :sparkles: Test out this PR locally via:\n  \n  ```bash\n  npm install @zi-gae/design-system@2.0.2-canary.1.29ff6c6b9df189bfd673f1c840878282560ea0e9.0\n  # or \n  yarn add @zi-gae/design-system@2.0.2-canary.1.29ff6c6b9df189bfd673f1c840878282560ea0e9.0\n  ```\n</details>\n<!-- GITHUB_RELEASE PR BODY: canary-version -->\n";

const slackClient = new WebClient(SLACK_BOT_TOKEN);

export function sendMessage(args: ChatPostMessageArguments) {
  return slackClient.chat.postMessage(args);
}

export async function sendCanaryPublishMessage({
  comment: { link },
}: {
  comment: GithubComment;
}) {
  const header = ":sparkles: 다음을 통해 PR 로컬 테스트:\n";

  const content = canaryBodyParser(dummy);

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
