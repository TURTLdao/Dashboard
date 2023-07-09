
// Render ipfs image
export function convertIPFSUrlToHttpUrl(ipfsUrl) {
  const gatewayUrl = 'https://ipfs.io/ipfs/';
  const cid = ipfsUrl.split('ipfs://')[1];
  return gatewayUrl + cid;
}
