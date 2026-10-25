import fs from 'node:fs';
import path from 'node:path';
import {defineConfig} from 'vite';

const publicFiles=[
  'assets/fonts.css',
  'favicon.png',
  'images/selo-garantia.jpg',
  'images/selo-garantia.png',
  'images/protocolo-zero-logo.png',
  'images/protocolo-zero-avatar.png',
  'logos/discord.svg',
  'logos/chatgpt.svg',
  ...['chatgpt','claude','gemini','perplexity','runway','midjourney','flux','mistral','grok','ideogram','meta','deepseek','minimax','qwen-qvq','luma','dall-e'].map(name=>`ai-logos/${name}.png`)
];
const blockedRoots=['video/','depoimentos/','assets/podcast-poster.jpg'];

function getMime(pathname){
  if(pathname.endsWith('.css')) return 'text/css; charset=utf-8';
  if(pathname.endsWith('.svg')) return 'image/svg+xml';
  if(pathname.endsWith('.jpg')||pathname.endsWith('.jpeg')) return 'image/jpeg';
  if(pathname.endsWith('.webp')) return 'image/webp';
  return 'image/png';
}

function allowlistedPublicAssets(){
 let publicRoot;
 const serveAllowed=(server)=>{server.middlewares.use((req,res,next)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'');
  if(blockedRoots.some(root=>pathname.startsWith(root))){res.statusCode=404;res.end('Not found');return}
  if(!publicFiles.includes(pathname)){next();return}
  const file=path.resolve(publicRoot,pathname);
  res.setHeader('Content-Type',getMime(pathname));
  res.setHeader('Cache-Control','public, max-age=3600');
  fs.createReadStream(file).on('error',()=>{res.statusCode=404;res.end('Not found')}).pipe(res);
 });};
 return {
  name:'protocolo-zero-public-allowlist',
  configResolved(config){publicRoot=path.resolve(config.root,'public')},
  configureServer:serveAllowed,
  configurePreviewServer:serveAllowed,
  buildStart(){
   for(const file of publicFiles){
    if(fs.existsSync(path.resolve(publicRoot,file))){
      this.emitFile({type:'asset',fileName:file,source:fs.readFileSync(path.resolve(publicRoot,file))});
    }
   }
  }
 }
}

export default defineConfig({base:'./',publicDir:false,plugins:[allowlistedPublicAssets()]});
