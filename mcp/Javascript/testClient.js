import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
    const transport = new StdioClientTransport({
        command: "node",
        args: ["index.js"],
        stderr: "inherit",
        cwd: process.cwd(),
    });

    const client = new Client({
        name: "test-client",
        version: "1.0.0",
    });

    await client.connect(transport);

    const tools = await client.listTools();
    console.log("Tools:", tools.tools.map(t => t.name));

    const call = await client.callTool({
        name: "getWeatherDataByCityName",
        arguments: { city: "Lakhimpur" },
    });

    console.log("Call result:", call);

    await client.close();
}

main().catch((err) => {
    console.error("Test client error:", err);
    process.exit(1);
});


