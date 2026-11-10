/* global Module,MischiefPhrases */
Module.register('MMM-MCHF-Wit',{
 requiresVersion:'2.38.0',
 defaults:{humorStyle:'mixed',updateSeconds:300,panelWidth:620,textSize:'normal',showLabel:true,contextAware:true,includeBuiltIn:true,maxCharacters:120,customPhrases:[],transitionStyle:'fade',transitionMs:900},
 getScripts(){return [this.file('phrase-book.js')];},getStyles(){return [this.file('mischief-surfaces.css'),this.file('MMM-MCHF-Wit.css')];},
 start(){this.generator=MischiefPhrases.create();this.phrase=this.generator.next(this.config);this.paused=false;this.transitionId=0;this.visibility=()=>{this.cancelTransition();if(document.hidden)clearTimeout(this.timer);else this.schedule();};document.addEventListener('visibilitychange',this.visibility);this.schedule();},
 schedule(){clearTimeout(this.timer);if(this.paused||document.hidden)return;const n=Number(this.config.updateSeconds),seconds=Number.isFinite(n)?Math.min(3600,Math.max(30,n)):300;this.timer=setTimeout(()=>{this.changePhrase();},seconds*1000);},
 cancelTransition(){this.transitionId++;this.transition?.cancel();this.transition=null;},
 async changePhrase(){const next=this.generator.next(this.config),id=++this.transitionId,line=this.line,reduced=typeof window!=='undefined'&&window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const n=Number(this.config.transitionMs),duration=Number.isFinite(n)?Math.min(2400,Math.max(200,n)):900;
  if(this.config.transitionStyle!=='fade'||reduced||!line?.animate){this.phrase=next;if(line)line.textContent=next;this.schedule();return;}
  try{this.transition=line.animate([{opacity:1},{opacity:0}],{duration:duration/2,easing:'ease-in',fill:'forwards'});await this.transition.finished;if(id!==this.transitionId||this.paused||document.hidden)return;this.phrase=next;line.textContent=next;this.transition.cancel();this.transition=line.animate([{opacity:0},{opacity:1}],{duration:duration/2,easing:'ease-out',fill:'forwards'});await this.transition.finished;}catch{ /* Cancelled when hidden or suspended. */ }
  finally{if(id===this.transitionId){this.transition?.cancel();this.transition=null;this.schedule();}}
 },
 suspend(){this.paused=true;clearTimeout(this.timer);this.cancelTransition();},resume(){this.paused=false;this.schedule();},
 getDom(){if(!this.root){this.root=document.createElement('section');this.root.className='mischief-quote '+(this.config.textSize==='large'?'mischief-quote-large':'');const width=Number(this.config.panelWidth);this.root.style.width=Math.min(900,Math.max(280,Number.isFinite(width)?width:620))+'px';this.root.setAttribute('aria-label','Mirror Mischief one-liner');if(this.config.showLabel!==false){const label=document.createElement('div');label.className='mischief-quote-label';label.textContent='MIRROR MISCHIEF';this.root.append(label);}this.line=document.createElement('div');this.line.className='mischief-quote-line';this.line.textContent=this.phrase;this.root.append(this.line);}return this.root;}
});
