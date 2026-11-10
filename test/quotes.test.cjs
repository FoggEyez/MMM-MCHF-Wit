const {test}=require('node:test'),assert=require('node:assert/strict'),book=require('../phrase-book.js');
test('local phrases vary without recent repeats, support custom-only mode and bound long input',()=>{
 const generator=book.create(()=>0),seen=new Set();for(let i=0;i<24;i++){const p=generator.next({humorStyle:'mixed',maxCharacters:120},new Date(2026,10,9,10));assert.ok(p.length<=120);assert.ok(!seen.has(p));seen.add(p);}
 const custom=book.create(()=>0);assert.equal(custom.next({includeBuiltIn:false,customPhrases:[' One ','Two',null,'x'.repeat(200)]}),'One');assert.equal(custom.next({includeBuiltIn:false,customPhrases:['One','Two']}),'Two');assert.equal(custom.next({includeBuiltIn:false,customPhrases:['Only']}),'Only');assert.ok(custom.next({includeBuiltIn:false,customPhrases:[]}).length>0);
});
test('phrase changes preserve their displayed element and never call the mirror fade/rebuild path',()=>{
 const fs=require('node:fs'),vm=require('node:vm');let module,callback;class Element{constructor(){this.children=[];this.style={};}append(e){this.children.push(e);}setAttribute(){}}
 const document={hidden:false,addEventListener(){},createElement(){return new Element();}},context={Module:{register(n,d){module=d;}},MischiefPhrases:book,document,clearTimeout(){},setTimeout(f){callback=f;return 1;}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../MMM-MCHF-Wit.js'),'utf8'),context);
 const instance={...module,config:{...module.defaults},updateDom(){throw Error('Unexpected whole-module refresh');}};instance.start();const root=instance.getDom(),line=instance.line,first=line.textContent;callback();assert.equal(instance.getDom(),root);assert.equal(instance.line,line);assert.notEqual(line.textContent,first);
 instance.suspend();assert.equal(instance.paused,true);
});


test('phrase fades animate only the text, respect reduced motion and cancel on suspension',async()=>{
 const fs=require('node:fs'),vm=require('node:vm');let definition,reduce=false;vm.runInNewContext(fs.readFileSync(require.resolve('../MMM-MCHF-Wit.js'),'utf8'),{Module:{register(n,d){definition=d;}},MischiefPhrases:book,document:{hidden:false,addEventListener(){}},window:{matchMedia(){return {matches:reduce};}},setTimeout(){return 1;},clearTimeout(){}});
 const calls=[],line={textContent:'Before',animate(frames,opts){calls.push({frames,opts});return {finished:Promise.resolve(),cancel(){}};}},instance={...definition,config:{...definition.defaults},line};instance.start();await instance.changePhrase();assert.equal(calls.length,2);assert.equal(calls[0].frames[1].opacity,0);assert.equal(calls[1].frames[1].opacity,1);assert.equal(calls[0].opts.duration,450);assert.equal(line.textContent,instance.phrase);
 reduce=true;await instance.changePhrase();assert.equal(calls.length,2);instance.suspend();assert.equal(instance.transition,null);assert.equal(instance.paused,true);
});
