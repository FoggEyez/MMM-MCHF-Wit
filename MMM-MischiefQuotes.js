/* global Module,MischiefPhrases */
Module.register('MMM-MischiefQuotes',{
 requiresVersion:'2.38.0',
 defaults:{humorStyle:'mixed',updateSeconds:300,panelWidth:620,textSize:'normal',showLabel:true,contextAware:true,includeBuiltIn:true,maxCharacters:120,customPhrases:[]},
 getScripts(){return [this.file('phrase-book.js')];},getStyles(){return [this.file('MMM-MischiefQuotes.css')];},
 start(){this.generator=MischiefPhrases.create();this.phrase=this.generator.next(this.config);this.paused=false;this.visibility=()=>{if(document.hidden)clearTimeout(this.timer);else this.schedule();};document.addEventListener('visibilitychange',this.visibility);this.schedule();},
 schedule(){clearTimeout(this.timer);if(this.paused||document.hidden)return;const n=Number(this.config.updateSeconds),seconds=Number.isFinite(n)?Math.min(3600,Math.max(30,n)):300;this.timer=setTimeout(()=>{this.phrase=this.generator.next(this.config);if(this.line&&this.line.textContent!==this.phrase)this.line.textContent=this.phrase;this.schedule();},seconds*1000);},
 suspend(){this.paused=true;clearTimeout(this.timer);},resume(){this.paused=false;this.schedule();},
 getDom(){if(!this.root){this.root=document.createElement('section');this.root.className='mischief-quote '+(this.config.textSize==='large'?'mischief-quote-large':'');const width=Number(this.config.panelWidth);this.root.style.width=Math.min(900,Math.max(280,Number.isFinite(width)?width:620))+'px';this.root.setAttribute('aria-label','Mirror Mischief one-liner');if(this.config.showLabel!==false){const label=document.createElement('div');label.className='mischief-quote-label';label.textContent='MIRROR MISCHIEF';this.root.append(label);}this.line=document.createElement('div');this.line.className='mischief-quote-line';this.line.textContent=this.phrase;this.root.append(this.line);}return this.root;}
});
