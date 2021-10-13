import { ChatPostMessageArguments, WebClient } from "@slack/web-api";
import { SLACK_BOT_TOKEN, TARGET_SLACK_CHANNEL_ID } from "./input";
import { GithubPullRequest } from "../models/github";

console.log("SLACK_BOT_TOKEN", SLACK_BOT_TOKEN);

const slackClient = new WebClient(SLACK_BOT_TOKEN);

export function sendMessage(args: ChatPostMessageArguments) {
  console.log("🎉", args);

  return slackClient.chat.postMessage(args);
}

export async function sendGithubPullRequestOpenMessage({
  pullRequest: { link, title, body },
}: {
  pullRequest: GithubPullRequest;
}) {
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${body}* > <${link}|${title}> 풀리퀘스트에 새로운 댓글이 달렸어요`,
      },
    },
    // {
    //   type: "section",
    //   text: {
    //     type: "mrkdwn",
    //     text: await replaceGithubUserToSlackUserInString(comment.message),
    //   },
    // },
  ];

  return sendMessage({
    channel: TARGET_SLACK_CHANNEL_ID,
    text: "",
    blocks,
  });
}
