export function canaryBodyParser(body: string) {
  console.log("RPEV", body);

  const regex = /```bash.*?```/s;
  const parse = body.match(regex);

  if (!parse) return null;

  const result = parse[0].replace("bash", "").replace(/"  "/gi, "");
  return result;
}
