# AGENTS.md

MCP server for the Agent Edge daily feed. Exposes TOON-format daily content as discoverable MCP resources for any MCP-compatible agent (Claude Desktop, Cursor, VS Code, Hermes, etc.).

Published as `@autonomics/mcp-feed` on npm.

## Quick start

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

## How it works

The server exposes two MCP resources:

| URI | Content | Access |
|-----|---------|--------|
| `daily://latest` | Single most recent daily entry (JSON, free) | No key required |
| `daily://feed` | Complete archive (TOON format, pro) | `AUTONOMICS_API_KEY` required |

The server fetches content from `https://autonomics.build/daily/` endpoints and serves it through the MCP protocol via stdio transport.

Pro license validation uses the Polar.sh API. License keys are validated against `AUTONOMICS_API_KEY` (or legacy `EWH_API_KEY`) environment variable.

## Configuration

### Environment variables

- `AUTONOMICS_API_KEY` — Pro license key for `daily://feed` access
- `EWH_API_KEY` — Legacy alias (still supported)

### MCP client setup

Add as an MCP server to any client:

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

With a Pro key:
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

## Project structure

```
mcp-feed/
├── index.js           # Main MCP server (stdio transport, resource handlers)
├── list-servers.mjs   # Smithery registry helper
├── manifest.json      # Smithery deployment manifest
├── smithery.json      # Smithery config
├── feed.mcpb          # TOON-format feed bundle (pre-compiled archive)
├── package.json       # npm package (name: @autonomics/mcp-feed)
├── README.md          # User-facing docs
└── .gitignore
```

## Publishing

```bash
npm publish --access public
```

The package is published on npm as `@autonomics/mcp-feed`. Smithery deployment config in `smithery.json`.

## Dependencies

- Node.js 18+
- `@modelcontextprotocol/sdk` ^1.9.0
- npm
