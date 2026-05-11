#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const BASE_URL = "https://earnwithhermes.com/daily";
const POLAR_ORG_ID = "30ede7c9-9751-4d53-9a5c-0c2be8620b11";
const CHECKOUT_URL = "https://buy.polar.sh/polar_cl_1cx4D2JF8Yrvb5V29rWdNyNEwjv74qNNT92Dk2obwLE";
const POLAR_VALIDATE_URL = "https://api.polar.sh/v1/customer-portal/license-keys/validate";

const FEED_URLS = {
  "daily://latest": `${BASE_URL}/latest.toon`,
  "daily://feed":   `${BASE_URL}/feed.toon`,
};

const RESOURCE_DEFS = {
  "daily://latest": {
    name: "Latest Daily Feed",
    description: "Single most recent daily entry (~1-2 KB, latest.toon)",
    mimeType: "text/plain",
    free: true,
  },
  "daily://feed": {
    name: "Full Feed Archive",
    description: "Complete archive of all daily entries (feed.toon) — requires EWH_API_KEY env var",
    mimeType: "text/plain",
    free: false,
  },
};

async function validateLicenseKey(key) {
  try {
    const res = await fetch(POLAR_VALIDATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, organization_id: POLAR_ORG_ID }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
  }
}

const server = new Server(
  { name: "earnwithhermes-feed", version: "1.0.0" },
  { capabilities: { resources: {} } },
);

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: Object.entries(RESOURCE_DEFS).map(([uri, def]) => ({
    uri,
    name: def.name,
    description: def.description,
    mimeType: def.mimeType,
  })),
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  const url = FEED_URLS[uri];
  const def = RESOURCE_DEFS[uri];

  if (!url || !def) {
    throw new Error(`Unknown resource: ${uri}`);
  }

  // Paid resource requires a valid license key
  if (!def.free) {
    const key = process.env.EWH_API_KEY;
    if (!key) {
      throw new Error(
        "daily://feed requires a Pro license key. " +
        "Set the EWH_API_KEY environment variable, or get one at " +
        CHECKOUT_URL,
      );
    }
    const valid = await validateLicenseKey(key);
    if (!valid) {
      throw new Error(
        "Invalid or expired EWH_API_KEY. Get a Pro license at " +
        CHECKOUT_URL,
      );
    }
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Feed fetch failed (HTTP ${response.status})`);
  }

  return {
    contents: [{ uri, text: await response.text() }],
  };
});

// Graceful shutdown
process.on("SIGINT", async () => { await server.close(); process.exit(0); });
process.on("SIGTERM", async () => { await server.close(); process.exit(0); });

const transport = new StdioServerTransport();
await server.connect(transport);
