import fs from 'node:fs';
import {parse} from 'parse5';
const d=parse(fs.readFileSync('../REFERO/sitecloner_lowticketacademy.com.br_2026-10-25/index.html','utf8'));
let i=0; function walk(n){if(n.nodeName==='#text'&&n.value.trim()&&!['style','script'].includes(n.parentNode?.tagName)) console.log(i++,JSON.stringify(n.value.trim()));for(const c of n.childNodes||[])walk(c)}walk(d);
