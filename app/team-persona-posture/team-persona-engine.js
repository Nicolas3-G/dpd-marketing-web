/**
 * @param {HTMLElement} root
 * @param {import("./team-state").TeamState | undefined} initialState
 */
export function initializeTeamPersonaTool(root, initialState) {
  const document = {
    getElementById: id => root.querySelector(`[id="${id}"]`),
    querySelectorAll: selector => root.querySelectorAll(selector),
    createElement: tag => root.ownerDocument.createElement(tag),
    body: root,
    execCommand: command => root.ownerDocument.execCommand(command),
  };
  var P=[
    {name:"Dreamer Persona",short:"Dreamer",sub:"Possibilities and ideas",color:"var(--orange)",mode:"Dreaming",
     fn:"Generates possibilities. The Dreamer Persona asks why and what if, and imagines what could be.",
     strengths:["Original ideas and new options","Reframes problems from fresh angles","Sets direction and vision","Brings energy to what is next"],
     watch:["Keeps options open too long","Adds new ideas mid-execution","Lets details and deadlines fade"],
     desc:"This team may naturally gravitate toward possibilities and ideas. The opportunity is to make Planning and Doing more intentional.",
     q:"How do we make sure our ideas become actions?"},
    {name:"Planner Persona",short:"Planner",sub:"Structure and details",color:"var(--grey-mid)",mode:"Planning",
     fn:"Turns ideas into structure. The Planner Persona sets sequence, owners, timelines, and risks.",
     strengths:["Clarity on who does what and when","Alignment before work begins","Spots risks early","Reliable handoffs"],
     watch:["Over-plans before acting","Closes options too early","Slows momentum waiting for certainty"],
     desc:"This team may naturally gravitate toward structure and details. The opportunity is to make Dreaming and Doing more intentional.",
     q:"Are we leaving enough room for innovation before planning the details?"},
    {name:"Doer Persona",short:"Doer",sub:"Action and momentum",color:"var(--fg)",mode:"Doing",
     fn:"Turns plans into results. The Doer Persona starts, executes, and finishes.",
     strengths:["Momentum and visible progress","Follow-through to completion","Practical problem solving","Learns by trying"],
     watch:["Starts before the plan is agreed","Skips exploring other options","Treats reflection as delay"],
     desc:"This team may naturally gravitate toward action and momentum. The opportunity is to make Dreaming and Planning more intentional.",
     q:"Are we taking enough time to explore options and agree on the plan before acting?"}
  ];
  var MEET=["Dream","Plan","Do"];
  var c=[0,0,0], s2=[0,0,0], secOn=true, WP=2, WS=1;
  var members=[];
  function sum(a){return a[0]+a[1]+a[2]}
  function scores(){return [0,1,2].map(function(i){return secOn?c[i]*WP+s2[i]*WS:c[i]})}
  function ranked(sc){var max=Math.max.apply(null,sc);return {max:max,tops:[0,1,2].filter(function(i){return sc[i]===max})}}
  function derive(){
    c=[0,0,0];s2=[0,0,0];
    members.forEach(function(m){if(m.p>=0){c[m.p]++;if(m.s>=0&&m.s!==m.p)s2[m.s]++;}});
    secOn=sum(s2)>0;
  }
  function esc(t){return String(t).replace(/[&<>"]/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]})}
  var roster=document.getElementById("roster");
  var draftName=document.getElementById("draft-name");
  var draftPrimary={value:"-1"}, draftSecondary={value:"-1"};
  var primaryButtons=Array.from(document.querySelectorAll('[data-persona-kind="primary"]'));
  var secondaryButtons=Array.from(document.querySelectorAll('[data-persona-kind="secondary"]'));
  function renderChoices() {
    primaryButtons.forEach(function(button){ button.setAttribute('aria-checked',String(button.dataset.personaValue===draftPrimary.value)); });
    secondaryButtons.forEach(function(button){
      button.disabled=+draftPrimary.value<0 || button.dataset.personaValue===draftPrimary.value;
      button.setAttribute('aria-checked',String(button.dataset.personaValue===draftSecondary.value));
    });
  }
  var entryError=document.getElementById("member-entry-error"), addButton=document.getElementById("addMember"), cancelEdit=document.getElementById("cancel-member-edit");
  var editingIndex=-1;
  function updateSecondary(value=-1) {
    draftSecondary.value=String(value===+draftPrimary.value?-1:value);
    renderChoices();
  }
  function clearEntry() {
    editingIndex=-1; draftName.value=''; draftPrimary.value='-1'; updateSecondary(); entryError.textContent='';
    addButton.textContent='Add team member'; cancelEdit.hidden=true;
    document.getElementById('member-entry-heading').textContent='Add a team member';
  }
  primaryButtons.forEach(function(button){button.onclick=function(){
    draftPrimary.value=button.dataset.personaValue;updateSecondary(+draftSecondary.value);entryError.textContent='';
  };});
  secondaryButtons.forEach(function(button){button.onclick=function(){
    draftSecondary.value=draftSecondary.value===button.dataset.personaValue?'-1':button.dataset.personaValue;renderChoices();
  };});
  [primaryButtons, secondaryButtons].forEach(function(buttons){buttons.forEach(function(button){
    button.onkeydown=function(event){
      if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
      event.preventDefault();
      var enabled=buttons.filter(function(b){return !b.disabled;});
      var index=enabled.indexOf(button), next;
      if(event.key==='Home')next=0;else if(event.key==='End')next=enabled.length-1;
      else next=(index+(['ArrowLeft','ArrowUp'].includes(event.key)?-1:1)+enabled.length)%enabled.length;
      enabled[next]?.focus();enabled[next]?.click();
    };
  });});
  cancelEdit.onclick=clearEntry;
  function animateNewCard(index) {
    var card=roster.children[index];
    if(!card)return;
    if(roster.scrollHeight>roster.clientHeight)roster.scrollTop=roster.scrollHeight;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var bounds=card.getBoundingClientRect(), distance=Math.max(80,window.innerWidth-bounds.left);
    // Animate a visual copy outside the scroll viewport so the entrance stays unclipped.
    var visual=card.cloneNode(true);
    visual.setAttribute('aria-hidden','true');visual.inert=true;
    visual.style.cssText='position:fixed;z-index:40;pointer-events:none;left:'+bounds.left+'px;top:'+bounds.top+'px;width:'+bounds.width+'px;height:'+bounds.height+'px;margin:0;';
    root.appendChild(visual);card.style.opacity='0';
    var animation=visual.animate([{transform:'translateX('+distance+'px)',opacity:0},{transform:'translateX(0)',opacity:1}],{duration:450,easing:'cubic-bezier(0.22, 1, 0.36, 1)'});
    animation.finished.catch(function(){}).finally(function(){visual.remove();card.style.opacity='';});
  }
  function renderRoster(){
    editingIndex=-1;
    roster.innerHTML='';
    document.getElementById('roster-count').textContent=members.length;
    if (!members.length) {
      roster.innerHTML='<button class="roster-empty" type="button" aria-label="Add and edit your first team member"><span class="roster-empty-icon" aria-hidden="true">+</span><span class="empty-title">Your team starts here</span><span>Click here to create your first member, or use the form.</span></button>';
      roster.querySelector('.roster-empty').onclick=function(){
        members.push({name:'',p:0,s:-1});renderRoster();render();
        roster.querySelector('.member-edit').click();animateNewCard(0);
      };
      return;
    }
    members.forEach(function(m,k){
      var d=document.createElement('article');d.className='member persona-member-card';
      d.innerHTML='<div class="mtop"><span class="mnum">'+(k+1)+'</span><h4 class="member-name">'+esc(m.name.trim()||'Team member '+(k+1))+'</h4></div>'+
        '<dl class="member-personas"><div><dt>Primary Persona</dt><dd>'+esc(P[m.p]?.short||'Not selected')+'</dd></div><div><dt>Secondary Persona</dt><dd>'+esc(P[m.s]?.short||'Not entered')+'</dd></div></dl>'+
        '<div class="member-actions"><button class="member-edit" type="button" aria-label="Edit team member '+(k+1)+'">Edit</button><button class="member-remove" type="button" aria-label="Remove team member '+(k+1)+'">Remove</button></div>';
      roster.appendChild(d);
      d.querySelector('.member-edit').onclick=function(){
        renderRoster();editingIndex=k;
        var card=roster.children[k], edited={...m};
        card.classList.add('is-editing');
        card.innerHTML='<label class="inline-name-label" for="edit-name-'+k+'">Member name (optional)</label><input class="inline-member-name" id="edit-name-'+k+'" value="'+esc(m.name)+'" autocomplete="off">'+
          '<div class="inline-persona-controls"></div><div class="inline-edit-actions"><button class="btn primary inline-save" type="button">Save</button><button class="btn inline-cancel" type="button">Cancel</button></div>';
        var controls=card.querySelector('.inline-persona-controls');
        function drawChoices(){
          controls.innerHTML=['primary','secondary'].map(function(kind){
            var primary=kind==='primary', selected=primary?edited.p:edited.s;
            return '<fieldset class="persona-choice-field"><legend>'+ (primary?'Primary Persona':'Secondary Persona (optional)')+'</legend><div class="persona-choices" role="radiogroup" aria-label="'+(primary?'Primary':'Secondary')+' Persona for team member '+(k+1)+'">'+P.map(function(p,i){
              return '<button type="button" role="radio" class="persona-choice" data-edit-kind="'+kind+'" data-edit-value="'+i+'" aria-checked="'+(selected===i)+'"'+(!primary&&i===edited.p?' disabled':'')+'>'+p.short+'</button>';
            }).join('')+'</div></fieldset>';
          }).join('');
          controls.querySelectorAll('[data-edit-kind]').forEach(function(button){button.onclick=function(){
            var value=+button.dataset.editValue;
            if(button.dataset.editKind==='primary'){edited.p=value;if(edited.s===value)edited.s=-1;}
            else edited.s=edited.s===value?-1:value;
            drawChoices();
            controls.querySelector('[data-edit-kind="'+button.dataset.editKind+'"][data-edit-value="'+value+'"]').focus();
          };});
        }
        drawChoices();
        function finish(){renderRoster();render();roster.children[k]?.querySelector('.member-edit')?.focus();}
        card.querySelector('.inline-save').onclick=function(){edited.name=card.querySelector('.inline-member-name').value.trim();members[k]=edited;finish();};
        card.querySelector('.inline-cancel').onclick=finish;
        card.querySelector('.inline-member-name').onkeydown=function(event){
          if(event.key==='Enter'){event.preventDefault();card.querySelector('.inline-save').click();}
          if(event.key==='Escape'){event.preventDefault();finish();}
        };
        card.querySelector('.inline-member-name').focus();
      };
      d.querySelector('.member-remove').onclick=function(){
        members.splice(k,1);renderRoster();render();
      };
    });
    var addCard=document.createElement('button');
    addCard.type='button';addCard.className='roster-add-card';
    addCard.setAttribute('aria-label','Add another team member');
    addCard.innerHTML='<span aria-hidden="true">+</span><span>Add team member</span>';
    addCard.onclick=function(){
      members.push({name:'',p:0,s:-1});renderRoster();render();
      roster.children[members.length-1].querySelector('.member-edit').click();
      animateNewCard(members.length-1);
    };
    roster.appendChild(addCard);
  }
  addButton.onclick=function(){
    if(editingIndex>=0){entryError.textContent='Save or cancel the card edit first.';return;}
    var primary=+draftPrimary.value;
    if(primary<0){entryError.textContent='Choose a Primary Persona before adding this member.';primaryButtons[0].focus();return;}
    var member={name:draftName.value.trim(),p:primary,s:+draftSecondary.value};
    members.push(member);
    clearEntry();renderRoster();render();animateNewCard(members.length-1);draftName.focus();
    document.getElementById('team-form-error').textContent='';
  };
  function list(arr){return arr.length<3?arr.join(" and "):arr.slice(0,-1).join(", ")+", and "+arr[arr.length-1]}
  function the(arr){return "the "+list(arr)}
  function mcount(k){return k===1?"1 member":k+" members"}

  function analyze(){
    var n=sum(c);
    if(n===0) return {n:0,summary:"Add your team's personas",desc:"Choose a Primary Persona for each team member.",q:"What does the work need right now?"};
    var sc=scores(), total=sum(sc), r=ranked(sc), max=r.max, tops=r.tops;
    var basis=secOn?"primary and secondary":"primary";
    if(tops.length===3) return {n:n,summary:"Balanced Persona Posture",desc:"Your team's "+basis+" preferences are evenly spread across the Dreamer Persona, Planner Persona, and Doer Persona.",q:"Your team's preferences are balanced. Which persona does the work need most right now?"};
    if(tops.length===2) return {n:n,summary:"Mixed Persona Posture",desc:"Your team's "+basis+" preferences lean equally toward the "+P[tops[0]].name+" and the "+P[tops[1]].name+".",q:"Your team's preferences are mixed. Which mode does the work need right now?"};
    var t=tops[0], p=P[t], extra="";
    if(secOn && sum(s2)>0){
      var pr=ranked(c);
      if(pr.tops.length>1) extra=" Secondary Personas break the primary tie toward the "+p.name+".";
      else if(pr.tops[0]!==t) extra=" Secondary Personas switch the lean from the "+P[pr.tops[0]].name+" to the "+p.name+".";
    }
    return {n:n,summary:max/total>0.5?p.name+"-leaning":"Slight "+p.name+" lean",desc:p.desc+extra,q:p.q};
  }
  function secActive(){return secOn && sum(s2)>0}
  function secComplete(){return secOn && sum(c)>0 && sum(s2)===sum(c)}
  function secAnalysis(){
    var n2=sum(s2);
    if(!n2) return "Add each member's Secondary Persona to see the team's backup strengths.";
    var max=Math.max.apply(null,s2), tops=[0,1,2].filter(function(i){return s2[i]===max});
    if(tops.length===1) return "Secondary lean: "+P[tops[0]].name+". When the work calls for it, "+mcount(max)+" can switch into the "+P[tops[0]].name+" as backup strength.";
    return "Secondary preferences are spread across "+the(tops.map(function(i){return P[i].name}))+", giving the team backup strength in more than one persona.";
  }

  var MISSING=[
    {t:"Dreamer Persona work may get skipped",look:"With no primary Dreamer Persona, the team may move to solutions before exploring alternatives, or repeat familiar approaches.",tryIt:"Open the next project with a short, time-boxed round where everyone switches into the Dreamer Persona."},
    {t:"Planner Persona work may get thin",look:"With no primary Planner Persona, ideas and action may move faster than structure, so owners, sequence, and deadlines stay unclear.",tryIt:"End each working session with everyone switching into the Planner Persona to name who owns what and by when."},
    {t:"Plans may stall before action",look:"With no primary Doer Persona, the work of turning plans into first steps may wait for a perfect moment.",tryIt:"Before the meeting ends, switch into the Doer Persona and agree on one small first step and a start date."}
  ];
  var PAIRS={
    "0-1":{t:"Dreamer Persona and Planner Persona: open vs. lock",look:"The Dreamer Persona keeps adding options while the Planner Persona works to settle scope. You may hear \"what if\" against \"we already decided.\"",tryIt:"Set a clear point where Dreamer Persona work closes and Planner Persona work begins, and say it out loud."},
    "0-2":{t:"Dreamer Persona and Doer Persona: explore vs. start",look:"The Doer Persona pushes to get moving while the Dreamer Persona is still exploring. New ideas may arrive mid-execution and feel like disruption.",tryIt:"Agree on when new ideas get parked for the next Dreamer Persona round instead of changing work in progress."},
    "1-2":{t:"Planner Persona and Doer Persona: detail vs. momentum",look:"The Doer Persona may act before the Planner Persona's plan is finished, and the plan may feel skipped.",tryIt:"Define what \"good enough to start\" looks like before work begins."}
  };
  var LEAD=["idea generation","organizing the work","driving execution"];

  function frictions(){
    var n=sum(c), out=[];
    if(!n) return out;
    var present=[0,1,2].filter(function(i){return c[i]>0});
    var absent=[0,1,2].filter(function(i){return c[i]===0});
    var pscore=scores(), rk=ranked(pscore), max=rk.max, tops=rk.tops, ptotal=sum(pscore);
    var sa=secActive(), sc=secComplete();
    if(present.length===1){
      out.push({tag:"One persona",hot:true,t:"Fast agreement, narrow view",
        look:"Every member's primary preference is the "+P[present[0]].name+", so decisions can feel easy while "+the(absent.map(function(i){return P[i].name}))+" get skipped without anyone noticing.",
        tryIt:"Before deciding, ask: \"What would "+the(absent.map(function(i){return P[i].name}))+" want us to check here?\""});
    }
    absent.forEach(function(i){
      var m=MISSING[i];
      if(sa && s2[i]>0){
        out.push({tag:"No primary "+P[i].name,hot:false,t:P[i].name+" available as backup",
          look:"No member has a primary "+P[i].name+", but "+mcount(s2[i])+" "+(s2[i]===1?"holds":"hold")+" it as a Secondary Persona. The ability is on the team, but it may not switch on unless someone asks for it.",
          tryIt:"Ask the "+(s2[i]===1?"member":"members")+" with a secondary "+P[i].name+" to lead the switch into "+MEET[i]+" Meeting Mode."});
      } else if(sc && s2[i]===0){
        out.push({tag:"Not in anyone's top two",hot:true,t:m.t,look:m.look+" No member holds it as a Secondary Persona either, so this is the team's clearest practice area.",tryIt:m.tryIt});
      } else {
        out.push({tag:"No primary "+P[i].name,hot:true,t:m.t,look:m.look,tryIt:m.tryIt});
      }
    });
    if(sa && n>=3){
      [0,1,2].forEach(function(i){
        if(c[i]>0 && c[i]+s2[i]===n) out.push({tag:"Everyone's top two",hot:false,t:"Strong shared pull toward the "+P[i].name,
          look:"Every member has the "+P[i].name+" as a primary or Secondary Persona. The team may default to it even when the work needs a different posture.",
          tryIt:"Name the meeting mode at the start, especially when the work is not "+MEET[i]+" Meeting Mode work."});
      });
    }
    if(tops.length===1 && max/ptotal>0.5 && present.length>1){
      var d=P[tops[0]].name, others=present.filter(function(i){return i!==tops[0]}).map(function(i){return P[i].name});
      out.push({tag:d+" majority",hot:false,t:"Other personas may be outnumbered",
        look:"With most of the team preferring the "+d+", "+the(others)+" "+(others.length>1?"perspectives":"perspective")+" may get talked over or read as resistance.",
        tryIt:"On the next decision, have the whole team switch into "+the(others)+" first, before the "+d+" weighs in."});
    }
    if(n>=4){
      [0,1,2].forEach(function(i){
        if(c[i]===1 && !(sa && s2[i]>=2)) out.push({tag:"One "+P[i].name,hot:false,t:P[i].name+" work may fall on one member",
          look:"Only one member has a primary "+P[i].name+", so that member may become the default for "+LEAD[i]+" and carry that load alone.",
          tryIt:"Rotate who leads "+P[i].mode+" so the whole team practices switching into the "+P[i].name+"."});
      });
    }
    if(tops.length===2){
      out.push({tag:"Tie",hot:false,t:"Tug-of-war on what the meeting is for",
        look:"Posture scores for the "+P[tops[0]].name+" and the "+P[tops[1]].name+" are equal, so the team may pull in two directions without naming it.",
        tryIt:"Start each meeting by naming which persona the work needs right now."});
    }
    for(var a=0;a<3;a++)for(var b=a+1;b<3;b++){
      var ha=c[a]>0||(sa&&s2[a]>0), hb=c[b]>0||(sa&&s2[b]>0);
      if(ha&&hb){var pr=PAIRS[a+"-"+b];out.push({tag:"Persona pair",hot:false,t:pr.t,look:pr.look,tryIt:pr.tryIt});}
    }
    return out.slice(0,4);
  }

  var DEEP=[
    {works:"explore possibilities, ask why and what if, and generate new options",drift:"keep exploring and adding ideas",brings:"new options and fresh direction",need:"turning ideas into a clear plan and visible action"},
    {works:"organize the work, set sequence and owners, and spot risks before they land",drift:"refine the plan and seek more certainty",brings:"clear owners, sequence, and timelines",need:"room for new options and the push to start"},
    {works:"move quickly into action, build momentum, and finish what is started",drift:"jump to execution",brings:"momentum and finished work",need:"time to explore options and agree on the plan first"}
  ];
  function lc(t){return t.charAt(0).toLowerCase()+t.slice(1)}
  function pct(a,b){return b?Math.round(a/b*100):0}
  function ul(arr){return "<ul>"+arr.map(function(x){return "<li>"+x+"</li>"}).join("")+"</ul>"}
  function primaryDeep(){
    var n=sum(c); if(!n) return null;
    var r=ranked(c), tops=r.tops, low=Math.min.apply(null,c), lows=[0,1,2].filter(function(i){return c[i]===low && tops.indexOf(i)<0});
    var stat=P.map(function(p,i){return p.short+" "+c[i]}).join(" · ");
    var rows=[], label;
    if(tops.length===1){
      var t=tops[0], tp=P[t], share=pct(c[t],n);
      label=(c[t]/n>0.5?"Strong lean toward the ":"Slight lean toward the ")+tp.name;
      rows.push(["How this team naturally works",
        c[t]+" of "+n+" members ("+share+"%) "+(c[t]===1?"has":"have")+" the "+tp.name+" as their Primary Persona. With the "+tp.name+" leading, the team tends to "+DEEP[t].works+". Meetings may drift toward "+MEET[t]+" Meeting Mode even when the work calls for something else."]);
      rows.push(["Strengths to lean on","The team can count on the "+tp.name+" for:"+ul(tp.strengths)]);
      rows.push(["When overused","When the "+tp.name+" runs the show, watch for these patterns:"+ul(tp.watch)]);
    } else if(tops.length===2){
      var a=tops[0], b=tops[1], key=a+"-"+b;
      label="Shared lead: the "+P[a].name+" and the "+P[b].name;
      rows.push(["How this team naturally works","The "+P[a].name+" and the "+P[b].name+" are equally represented as Primary Personas ("+c[a]+" each). The team pulls toward two ways of working: the "+P[a].name+" tends to "+DEEP[a].works+", while the "+P[b].name+" tends to "+DEEP[b].works+"."]);
      rows.push(["Strengths to lean on","Two strong personas give the team range:"+ul([P[a].strengths[0],P[a].strengths[1],P[b].strengths[0],P[b].strengths[1]])]);
      rows.push(["Built-in tension",PAIRS[key].look]);
    } else {
      label="Balanced across all three personas";
      rows.push(["How this team naturally works","The Dreamer Persona, Planner Persona, and Doer Persona are equally represented as Primary Personas ("+c[0]+" each). No single persona sets the team's default way of working."]);
      rows.push(["Strengths to lean on","The team can cover the full cycle: new ideas from the Dreamer Persona, structure from the Planner Persona, and momentum from the Doer Persona."]);
      rows.push(["When overused","Without a default, meetings can slide between modes. Ideas, plans, and action items compete in the same conversation."]);
    }
    if(lows.length && tops.length<3){
      var L=lows.map(function(i){return P[i].name});
      rows.push(["What to practice",(low===0?"No member has "+the(L)+" as a Primary Persona. ":"The "+list(L)+" "+(L.length>1?"are":"is")+" least represented. ")+
        "The team will need to switch into "+the(L)+" on purpose. Schedule "+list(lows.map(function(i){return MEET[i]+" Meeting Mode"}))+" deliberately, especially when the work needs "+lows.map(function(i){return DEEP[i].brings}).join(", or ")+"."]);
    } else {
      rows.push(["What to practice","Name the meeting mode at the start of every meeting so the whole team switches into the same persona together."]);
    }
    return {title:"Primary Persona Posture",label:label,stat:stat,rows:rows};
  }
  function secondaryDeep(){
    var n=sum(c), n2=sum(s2); if(!secOn||!n) return null;
    var stat=P.map(function(p,i){return p.short+" "+s2[i]}).join(" · ");
    if(!n2) return {title:"Secondary Persona Posture",label:"Not entered yet",stat:stat,rows:[["Next step","Add each member's Secondary Persona to see the team's backup strengths and how they balance the primary posture."]]};
    var r=ranked(s2), tops=r.tops, pr=ranked(c), rows=[], label;
    var plow=Math.min.apply(null,c), pLows=[0,1,2].filter(function(i){return c[i]===plow});
    if(tops.length===1){
      var t=tops[0], tp=P[t];
      label="Backup strength in the "+tp.name;
      rows.push(["Backup strength",s2[t]+" of "+n2+" members ("+pct(s2[t],n2)+"%) "+(s2[t]===1?"has":"have")+" the "+tp.name+" as their Secondary Persona. When the work calls for it, these members can switch into the "+tp.name+" with relative ease and help the team "+DEEP[t].works+"."]);
      var rel;
      if(pr.tops.length===1 && pr.tops[0]===t) rel="This reinforces the primary lean. The team's pull toward the "+tp.name+" is even stronger than the primary counts show, so the risk of overusing it grows too.";
      else if(pLows.indexOf(t)>=0) rel="This complements the primary posture. The "+tp.name+" is the team's least represented Primary Persona, and the secondaries help fill that gap.";
      else rel="This adds depth beside the primary posture. The team has a second, quieter source of "+tp.name+" strength to draw on.";
      rows.push(["How it relates to the primary posture",rel]);
      rows.push(["How to use it","When the team needs the "+tp.name+", invite members with a secondary "+tp.name+" to lead the switch into "+MEET[t]+" Meeting Mode."]);
    } else {
      label="Backup strength spread across "+the(tops.map(function(i){return P[i].name}));
      rows.push(["Backup strength","Secondary Personas are evenly spread across "+the(tops.map(function(i){return P[i].name}))+" ("+s2[tops[0]]+" each). The team has flexible backup and can switch into more than one persona when the work calls for it."]);
      rows.push(["How to use it","Match the meeting mode to the work, then ask members whose secondary fits that mode to help lead it."]);
    }
    var none=[0,1,2].filter(function(i){return c[i]===0&&s2[i]===0});
    if(none.length && n2===n) rows.push(["Clearest practice area","No member has "+the(none.map(function(i){return P[i].name}))+" as a primary or Secondary Persona. This is where the whole team needs the most deliberate practice, through regular "+list(none.map(function(i){return MEET[i]+" Meeting Mode"}))+"."]);
    if(n2<n) rows.push(["Still to enter",(n-n2)+" of "+n+" members have no Secondary Persona entered, so this picture may change."]);
    return {title:"Secondary Persona Posture",label:label,stat:stat,rows:rows};
  }

  var IMPACT=[
    {area:"Innovate",
     strong:"Innovation comes naturally. The Dreamer Persona keeps new options and fresh direction coming. Make sure strong ideas move into Plan Meeting Mode instead of piling up.",
     steady:"The team can innovate when it makes room for it. Schedule Dream Meeting Mode so new options get explored on purpose, not only when there is spare time.",
     practice:"Innovation may not happen by default, and the team may repeat familiar approaches. Open new work with a time-boxed Dream Meeting Mode before any planning starts."},
    {area:"Plan",
     strong:"Planning is a strength. The Planner Persona brings clear owners, sequence, and timelines. Watch that planning does not delay the start or close options too early.",
     steady:"The team can plan when it asks for it. End working sessions in Plan Meeting Mode to confirm who owns what and by when.",
     practice:"Structure may be thin, so handoffs, owners, and deadlines can stay unclear. Make Plan Meeting Mode a required step before work begins."},
    {area:"Execute",
     strong:"Execution is a strength. The Doer Persona drives momentum and follow-through. Make sure the team agrees on the plan before it starts moving.",
     steady:"The team can execute when the plan is clear. Use short Do Meeting Mode check-ins to keep progress visible and clear blockers.",
     practice:"Plans may stall before action. Close each meeting by switching into the Doer Persona and naming one first step, an owner, and a date."}
  ];
  function impactLevel(share){return share>=0.4?"strong":share>=0.22?"steady":"practice"}
  var LVL={strong:"Strength",steady:"Steady",practice:"Needs practice"};
  function dominantAnswer(){
    var n=sum(c); if(!n) return null;
    var sc=scores(), tot=sum(sc), r=ranked(sc), basis=secOn&&sum(s2)>0?"primary and secondary":"primary";
    if(r.tops.length===1){var t=r.tops[0];
      return "Your team's dominant persona posture is the "+P[t].name+". Based on "+basis+" preferences, the "+P[t].name+" holds "+pct(sc[t],tot)+"% of the team's posture score. Left on default, the team will tend to "+DEEP[t].works+".";}
    if(r.tops.length===2) return "Your team has no single dominant persona posture. The "+P[r.tops[0]].name+" and the "+P[r.tops[1]].name+" share the lead, each holding "+pct(sc[r.tops[0]],tot)+"% of the team's posture score based on "+basis+" preferences.";
    return "Your team has no single dominant persona posture. The Dreamer Persona, Planner Persona, and Doer Persona are evenly balanced based on "+basis+" preferences.";
  }
  function impacts(){
    var n=sum(c); if(!n) return [];
    var sc=scores(), tot=sum(sc);
    return [0,1,2].map(function(i){
      var share=tot?sc[i]/tot:0, lv=impactLevel(share);
      if(c[i]===0 && (!secOn || s2[i]===0)) lv="practice";
      return {i:i,area:IMPACT[i].area,lv:lv,share:share,text:IMPACT[i][lv]};
    });
  }
  function postureChart(){
    var sc=scores(), total=sum(sc), leaders=ranked(sc).tops;
    var colors=sc.map(function(_,i){return leaders.includes(i)?'var(--orange)':i===0?'#9A9AA0':i===1?'#5C6067':'#1F2532';});
    var circumference=2*Math.PI*86, offset=0;
    var segments=sc.map(function(score,i){
      var length=total?score/total*circumference:0;
      var segment='<circle cx="110" cy="110" r="86" fill="none" stroke="'+colors[i]+'" stroke-width="24" stroke-dasharray="'+length+' '+(circumference-length)+'" stroke-dashoffset="'+(-offset)+'" transform="rotate(-90 110 110)" />';
      offset+=length;return segment;
    }).join('');
    var label=leaders.length===1?P[leaders[0]].short:leaders.length===3?'Balanced':'Shared lead';
    var largest=total?pct(Math.max.apply(null,sc),total):0;
    var description=P.map(function(p,i){return p.short+' '+pct(sc[i],total)+'%';}).join(', ');
    return '<figure class="posture-chart" role="img" aria-label="Team persona posture: '+description+'. '+(leaders.length===1?label+' has the largest share.':'The largest shares are tied.')+'">'+
      '<svg viewBox="0 0 220 220" aria-hidden="true">'+segments+'<text x="110" y="108" class="chart-percent" text-anchor="middle">'+largest+'%</text><text x="110" y="134" class="chart-persona" text-anchor="middle">'+label+'</text></svg>'+
      '<figcaption class="chart-legend">'+P.map(function(p,i){return '<div class="chart-legend-item'+(leaders.includes(i)?' is-leading':'')+'"><span class="chart-swatch" style="background:'+colors[i]+'"></span><span>'+p.short+'</span><strong>'+pct(sc[i],total)+'%</strong></div>';}).join('')+'</figcaption></figure>';
  }
  function renderQA(){
    var el=document.getElementById("qa"), d=dominantAnswer();
    el.hidden=!d; if(!d) return;
    el.innerHTML='<div class="posture-summary"><div class="posture-summary-copy"><p class="q">What is my team\'s dominant persona posture?</p><p class="a">'+d+'</p></div>'+postureChart()+'</div>'+
      '<div><p class="q">How does it affect our ability to innovate, plan, and execute?</p></div>'+
      '<div class="impacts">'+impacts().map(function(x){
        return '<div class="impact"><div class="ihead"><b>'+x.area+'</b><small>'+P[x.i].name+' · '+Math.round(x.share*100)+'%</small><span class="lvl '+x.lv+'">'+LVL[x.lv]+'</span></div>'+
          '<div class="meter" aria-hidden="true"><i style="width:'+Math.round(x.share*100)+'%"></i></div><p>'+x.text+'</p></div>';
      }).join("")+'<div class="ask"><div class="eyebrow">Manager asks</div><p id="question"></p></div></div>';
  }
  function renderDeep(id,d){
    var el=document.getElementById(id); el.hidden=!d; if(!d) return;
    el.innerHTML='<div class="eyebrow">'+d.title+'</div><div class="dlabel"><h4>'+d.label+'</h4><span class="stat">'+d.stat+'</span></div><dl>'+
      d.rows.map(function(r){return '<div><dt>'+r[0]+'</dt><dd>'+r[1]+'</dd></div>'}).join("")+'</dl>';
  }
  function deepText(d){
    if(!d) return "";
    return "\n\n"+d.title+": "+d.label+" ("+d.stat+")"+d.rows.map(function(r){
      return "\n"+r[0]+": "+r[1].replace(/<li>/g,"\n  - ").replace(/<[^>]+>/g,"");
    }).join("");
  }
  function renderFriction(){
    var f=frictions(), el=document.getElementById("friction");
    if(!f.length){el.innerHTML='<p class="fempty">Add your team\'s personas to see potential friction points.</p>';return;}
    el.innerHTML="";
    f.forEach(function(x){
      var d=document.createElement("article");d.className="fcard";
      d.innerHTML='<div class="fhead"><span class="ftag'+(x.hot?' hot':'')+'"></span><h3></h3></div><dl><dt>Watch for</dt><dd class="l"></dd><dt>Try</dt><dd class="y"></dd></dl>';
      d.querySelector(".ftag").textContent=x.tag;
      d.querySelector("h3").textContent=x.t;
      d.querySelector(".l").textContent=x.look;
      d.querySelector(".y").textContent=x.tryIt;
      el.appendChild(d);
    });
  }

  function getState() { return {team: document.getElementById("team").value, members: members.map(m => ({...m})), secOn}; }
  function render(){
    derive();
    var a=analyze(), n=a.n, n2=sum(s2);
    renderFriction();
    renderQA();
    renderDeep("primDeep",primaryDeep());
    renderDeep("secDeep",secondaryDeep());
    document.getElementById("size").textContent=n;
    var sc=scores(), stot=sum(sc);
    document.getElementById("bar").innerHTML=stot?sc.map(function(v,i){return '<i style="width:'+(v/stot*100)+'%;background:'+P[i].color+'"></i>'}).join(""):"";
    document.getElementById("summary").textContent=a.summary;
    document.getElementById("desc").textContent=a.desc;
    var questionElement=document.getElementById("question");
    if(questionElement)questionElement.textContent=a.q;

    var st=document.getElementById("secStatus");
    var noP=members.filter(function(m){return m.p<0}).length;
    var noS=members.filter(function(m){return m.p>=0&&m.s<0}).length;
    if(!members.length){st.textContent="Add a team member to start.";st.className="sec-status";}
    else if(noP){st.textContent=noP+(noP===1?" member still needs":" members still need")+" a Primary Persona.";st.className="sec-status warn";}
    else if(secOn&&noS){st.textContent=noS+(noS===1?" member has":" members have")+" no Secondary Persona entered.";st.className="sec-status warn";}
    else{st.textContent=members.length+(members.length===1?" member":" members")+" entered.";st.className="sec-status";}

    var cov=document.getElementById("coverage");
    cov.hidden=!(secOn && n>0);
    if(secOn && n>0){
      document.getElementById("secSummary").textContent=secAnalysis();
      var smax=Math.max.apply(null,sc);
      document.getElementById("covBody").innerHTML=P.map(function(p,i){
        return '<tr><th scope="row" class="breakdown-persona">'+p.name+'</th><td data-label="Primary ×2">'+c[i]+'</td><td data-label="Secondary ×1">'+s2[i]+'</td><td data-label="Posture score" class="'+(sc[i]===smax&&smax>0?'top':'')+'">'+sc[i]+'</td><td data-label="Top two">'+(c[i]+s2[i])+' of '+n+'</td></tr>';
      }).join("");
    }

    var g=document.getElementById("gapnote"), zeroIdx=n?[0,1,2].filter(function(i){return c[i]===0}):[];
    if(zeroIdx.length&&zeroIdx.length<3){
      g.hidden=false;
      if(secActive()){
        g.textContent=zeroIdx.map(function(i){
          if(s2[i]>0) return "No member has a primary "+P[i].name+", but "+mcount(s2[i])+" "+(s2[i]===1?"has":"have")+" it as a Secondary Persona. The ability is close at hand.";
          if(secComplete()) return "No member has the "+P[i].name+" as a primary or Secondary Persona. This is the team's clearest practice area.";
          return "No member has a primary "+P[i].name+" yet. Finish entering Secondary Personas to see if the team has backup strength here.";
        }).join(" ");
      } else {
        g.textContent="A team with zero primary "+zeroIdx.map(function(i){return P[i].name+"s"}).join(" or ")+" is not a team without that ability. Secondary personas, individual flexibility, and the task itself also matter.";
      }
    } else g.hidden=true;
    document.getElementById("countnote").textContent=secOn?"Counts reflect surveyed primary and secondary preferences, not fixed abilities or current meeting posture.":"Counts reflect surveyed primary preferences, not fixed abilities or current meeting posture.";

    document.getElementById("sD").textContent=c[0];
    document.getElementById("sP").textContent=c[1];
    document.getElementById("sO").textContent=c[2];
    document.getElementById("secLine").hidden=!secActive();
    document.getElementById("s2D").textContent=s2[0];
    document.getElementById("s2P").textContent=s2[1];
    document.getElementById("s2O").textContent=s2[2];
  }

  function snapshotText(){
    var a=analyze(), t=document.getElementById("team").value.trim(), f=frictions(), n=a.n;
    var sec=secActive()?
      "\nSecondary Dreamer Persona: "+s2[0]+"\nSecondary Planner Persona: "+s2[1]+"\nSecondary Doer Persona: "+s2[2]+
      "\nPosture scores (Primary x2 + Secondary x1): "+P.map(function(p,i){return p.name+" "+scores()[i]}).join(", ")+
      "\nPersona coverage (primary or secondary): "+P.map(function(p,i){return p.name+" "+(c[i]+s2[i])+" of "+n}).join(", ")+
      "\nSecondary summary: "+secAnalysis():"";
    return (t?"Team: "+t+"\n":"")+
      "Team size: "+n+(members.length?"\nTeam members:"+members.filter(function(m){return m.p>=0}).map(function(m,k){return "\n- "+((m.name||"").trim()||"Team member "+(k+1))+": "+P[m.p].name+" (primary)"+(m.s>=0?", "+P[m.s].name+" (secondary)":"")}).join(""):"")+"\nDreamer Persona: "+c[0]+"\nPlanner Persona: "+c[1]+"\nDoer Persona: "+c[2]+sec+
      "\nSummary: "+a.summary+"\n\nWhat is my team's dominant persona posture?\n"+(dominantAnswer()||"")+
      "\n\nHow does it affect our ability to innovate, plan, and execute?"+impacts().map(function(x){return "\n- "+x.area+" ("+P[x.i].name+", "+LVL[x.lv]+"): "+x.text}).join("")+
      "\n\nDiscussion question: "+a.q+deepText(primaryDeep())+deepText(secondaryDeep())+"\n"+
      (f.length?"\nPotential friction points:"+f.map(function(x){return "\n- "+x.t+". Try: "+x.tryIt}).join(""):"")+
      "\nNote: "+document.getElementById("countnote").textContent;
  }
  var toast=document.getElementById("toast"), tt;
  function say(m){toast.textContent=m;clearTimeout(tt);tt=setTimeout(function(){toast.textContent=""},2500)}
  document.getElementById("copy").onclick=function(){
    var txt=snapshotText();
    function fallback(){
      var ta=document.createElement("textarea");ta.value=txt;ta.setAttribute("readonly","");ta.style.position="fixed";ta.style.opacity="0";
      document.body.appendChild(ta);ta.select();var ok=false;try{ok=document.execCommand("copy")}catch(e){}
      document.body.removeChild(ta);say(ok?"Copied":"Copy blocked. Select and copy manually.");
    }
    try{navigator.clipboard.writeText(txt).then(function(){say("Copied")},fallback)}catch(e){fallback()}
  };
  document.getElementById("reset").onclick=function(){members=[];document.getElementById("team").value="";renderRoster();render();say("Cleared")};
  document.getElementById("team").oninput=render;
  function load(spec){members=spec.split(",").map(function(x){var a=x.split("-").map(Number);return {name:"",p:a[0],s:a[1]}})}
  document.querySelectorAll(".ex").forEach(function(b){b.onclick=function(){load(b.dataset.m);renderRoster();render();root.querySelector("#team-calculator").scrollIntoView({behavior:"smooth",block:"start"})}});

  members=initialState?.members?.map(m => ({...m})) || [];
  document.getElementById("team").value=initialState?.team || "";
  renderChoices();
  renderRoster();
  render();

  return { destroy: () => clearTimeout(tt), getState, hasPendingMember: () => editingIndex >= 0 || Boolean(draftName.value.trim()) || +draftPrimary.value >= 0 };
}
