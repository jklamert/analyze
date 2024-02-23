const { getClient } = require("../connectionProvider");
const { Client } = require("pg");

test("Connection Provider", async () => {
  const client = await getClient();
  expect(client).not.toBe(null);
  expect(client).toBeInstanceOf(Client);
  client.end();
});
