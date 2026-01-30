const dns = require('dns').promises;

async function testDNS() {
  try {
    console.log('Testing DNS resolution...');
    const result = await dns.resolveSrv('_mongodb._tcp.cluster0.kk880ed.mongodb.net');
    console.log('✅ DNS Resolution successful:', result);
  } catch (error) {
    console.error('❌ DNS Resolution failed:', error.message);
    console.error('This indicates a network/firewall/DNS issue');
  }
}

testDNS();