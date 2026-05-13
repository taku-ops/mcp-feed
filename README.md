# @autonomics/mcp-feed

[![smithery badge](https://smithery.ai/badge/taku-ops/feed)](https://smithery.ai/servers/taku-ops/feed)

MCP server for the [Agent Edge](https://autonomics.build/daily/) daily feed — exposes TOON-format daily content as discoverable MCP resources for any MCP-compatible agent.

## Quick Start

Add to your MCP client config:

**Claude Desktop** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "autonomics-feed": {
      "command": "npx",
      "args": ["-y", "@autonomics/mcp-feed"]
    }
  }
}
```

**VS Code** (`.vscode/mcp.json` or settings):
```json
{
  "servers": {
    "autonomics-feed": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@autonomics/mcp-feed"]
    }
  }
}
```

**Hermes Agent** (`~/.hermes/config.yaml`):
```yaml
mcp_servers:
  autonomics-feed:
    command: npx
    args: ["-y", "@autonomics/mcp-feed"]
```

**OpenClaw** (`.openclaw/config.json`):
```json
{
  "mcpServers": {
    "autonomics-feed": {
      "command": "npx",
      "args": ["-y", "@autonomics/mcp-feed"]
    }
  }
}
```

**Cursor / Other MCP clients**: Same pattern — add an MCP server with command `npx -y @autonomics/mcp-feed`.

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
    "autonomics-feed": {
      "command": "npx",
      "args": ["-y", "@autonomics/mcp-feed"],
      "env": {
        "AUTONOMICS_API_KEY": "ae_pro_xxxxxxxx"
      }
    }
  }
}
```

*Legacy `EWH_API_KEY` also still supported.*

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
