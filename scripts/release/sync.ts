import { request } from "https";

function sync() {
  const req = request(
    new URL(
      `https://registry-direct.npmmirror.com/ntbot/sync?sync_upstream=true`
    ),
    {
      method: "PUT",
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "Content-Length": 0,
      },
    }
  );

  req.write("");

  req.on("close", () => {
  });
}
export default sync;