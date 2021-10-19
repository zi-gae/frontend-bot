export function canaryBodyParser(body: string) {
  console.log("RPEV", body);

  const regex = /```bash.*?```/s;
  const publish = body
    .match(regex)?.[0]
    .replace("bash", "")
    .replaceAll("  ", "");
  console.log("AFTER", publish);

  return publish?.[0];
}
