# @earnwithhermes/mcp-feed

MCP server for the [Earn With Hermes](https://earnwithhermes.com) daily feed — exposes TOON-format daily content as discoverable MCP resources for any MCP-compatible agent.

## Quick Start

Add to your MCP client config:

**Claude Desktop** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "earnwithhermes-feed": {
      "command": "npx",
      "args": ["-y", "@earnwithhermes/mcp-feed"]
    }
  }
}
```

**VS Code** (`.vscode/mcp.json` or settings):
```json
{
  "servers": {
    "earnwithhermes-feed": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@earnwithhermes/mcp-feed"]
    }
  }
}
```

**Hermes Agent** (`~/.hermes/config.yaml`):
```yaml
mcp_servers:
  earnwithhermes-feed:
    command: npx
    args: ["-y", "@earnwithhermes/mcp-feed"]
```

**Cursor / Other MCP clients**: Same pattern — add an MCP server with command `npx -y @earnwithhermes/mcp-feed`.

## Resources

| URI | Content | Access |
|-----|---------|--------|
| `daily://latest` | Single most recent daily entry (~1-2 KB) | Free |
| `daily://feed` | Complete archive of all daily entries | Pro license key required |

## Pro License

`daily://feed` requires a Pro subscription ($5/month). Get a license key at [buy.polar.sh](https://buy.polar.sh/polar_cl_1cx4D2JF8Yrvb5V29rWdNyNEwjv74qNNT92Dk2obwLE), then set it as an environment variable:

```json
{
  "mcpServers": {
    "earnwithhermes-feed": {
      "command": "npx",
      "args": ["-y", "@earnwithhermes/mcp-feed"],
      "env": {
        "EWH_API_KEY": "ewh_pro_xxxxxxxx"
      }
    }
  }
}
```

## Development

```bash
git clone https://github.com/taku-ops/mcp-feed.git
cd mcp-feed
npm install
node index.js
```

Test with the MCP Inspector:
```bash
npx @modelcontextprotocol/inspector node index.js
```

## License

MIT
