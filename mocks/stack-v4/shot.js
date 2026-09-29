const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({channel:'chrome'});
const u='file:///C:/Users/Jasmine Gu/portfolio/mocks/stack-v4/index.html';
const d='C:/Users/Jasmine Gu/portfolio/mocks/stack-v4/shots/';
let p=await b.newPage({viewport:{width:1200,height:800}});await p.goto(u);await p.waitForTimeout(1200);
await p.screenshot({path:d+'desktop.png'});
await p.hover('.b2 rect.hl',{force:true});await p.waitForTimeout(400);await p.screenshot({path:d+'hover.png'});
p=await b.newPage({viewport:{width:390,height:844}});await p.goto(u);await p.waitForTimeout(1200);await p.screenshot({path:d+'mobile.png'});
await b.close()})()
