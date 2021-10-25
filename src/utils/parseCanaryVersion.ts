const PACKAGE_NAME = "@myrealtrip/design-system";

function findStringLastIndex(string: string, match: string) {
  return string.indexOf(match) + match.length;
}

export function parseCanaryVersion(body: string) {
  const regex = /Published.*?Done/s;
  const parse = body.match(regex);
  if (!parse) return "Failed Parse";

  const matchString = {
    start: "version: ",
    end: " Done",
  };
  // 26 ~ 51
  const versionNote = parse[0];

  const startIndex = findStringLastIndex(versionNote, matchString.start);
  const endIndex =
    findStringLastIndex(versionNote, matchString.end) - startIndex;

  const version = versionNote.substr(startIndex, endIndex);

  const markdown = `\`\`\`sh npm install ${PACKAGE_NAME}@${version}\n\n yarn add ${PACKAGE_NAME}@${version}\`\`\``;

  return markdown;
}
