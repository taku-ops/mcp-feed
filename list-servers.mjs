import { SmitheryAPI } from '@smithery/api';

const api = new SmitheryAPI({ apiKey: '7c273283-2467-4437-8152-91fb7262a60c' });

async function main() {
  // Try to list servers
  try {
    const servers = await api.servers.list();
    console.log('Servers:', JSON.stringify(servers, null, 2));
  } catch (e) {
    console.log('Error listing servers:', e.message);
  }
}

main().catch(console.error);
