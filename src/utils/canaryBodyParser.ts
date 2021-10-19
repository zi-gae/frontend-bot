export function canaryBodyParser(body: string) {
  const regex = /```bash.*?```/s;
  const pars = body.match(regex);

  console.log("RPEV", pars);
  const result = pars?.[0].replace("bash", "").replaceAll("  ", "");
  console.log("AFTER", result);

  return result;
}
