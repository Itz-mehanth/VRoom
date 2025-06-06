const forge = require('node-forge');
const fs = require('fs');
const path = require('path');

// Ensure cert directory exists
const certDir = path.join(__dirname, '..', 'cert');
!fs.existsSync(certDir) && fs.mkdirSync(certDir);

// Generate key pair
const keys = forge.pki.rsa.generateKeyPair(2048);
const cert = forge.pki.createCertificate();

// Basic certificate setup
cert.publicKey = keys.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

const attrs = [{
  name: 'commonName',
  value: 'localhost'
}];

cert.setSubject(attrs);
cert.setIssuer(attrs);
cert.sign(keys.privateKey);

// Save files
fs.writeFileSync(path.join(certDir, 'key.pem'), forge.pki.privateKeyToPem(keys.privateKey));
fs.writeFileSync(path.join(certDir, 'cert.pem'), forge.pki.certificateToPem(cert));

console.log('SSL certificates generated in cert/ directory'); 