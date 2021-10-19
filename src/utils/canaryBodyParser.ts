export function canaryBodyParser(body: string) {
  const regex = "/```bash.*?```/s";
  const publish = body.match(regex);

  return publish?.[0];
}
