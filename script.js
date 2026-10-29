
const solution=`const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

console.log(tabs);
console.log(panels);

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove("active");
    });
    panels.forEach((p) => {
      p.classList.remove("active");
    });
    tab.classList.add("active");
    panels[index].classList.add("active");
  });
});`;
document.getElementById("solution").textContent=solution;
const demo=document.getElementById("demo"),tabs=demo.querySelectorAll(".tab"),panels=demo.querySelectorAll(".panel");
tabs.forEach((tab,index)=>tab.addEventListener("click",()=>{tabs.forEach(t=>t.classList.remove("active"));panels.forEach(p=>p.classList.remove("active"));tab.classList.add("active");panels[index].classList.add("active");document.getElementById("demo-status").textContent="Selected: "+tab.textContent+" · index "+index;}));
const steps=[
["Select all tabs",'const tabs = document.querySelectorAll(".tab");',"Finds every HTML element with class tab and returns a NodeList."],
["Select all panels",'const panels = document.querySelectorAll(".panel");',"Finds every element with class panel."],
["Print elements","console.log(tabs);\nconsole.log(panels);","Shows the selected NodeLists in the browser console for debugging."],
["Loop with index","tabs.forEach((tab, index) => { ... });","Runs once per tab. tab is the current element; index is its position (0, 1, 2, 3)."],
["Wait for click",'tab.addEventListener("click", () => { ... });',"Runs the function when the user clicks that tab."],
["Clear all tabs",'tabs.forEach((t) => t.classList.remove("active"));',"Removes the active highlight from every tab."],
["Hide all panels",'panels.forEach((p) => p.classList.remove("active"));',"Removes active from every panel so CSS hides them."],
["Activate clicked tab",'tab.classList.add("active");',"Highlights the tab that was clicked."],
["Show matching panel",'panels[index].classList.add("active");',"Shows the panel with the same position as the clicked tab."]
];
const stepBox=document.getElementById("steps");
steps.forEach((s,i)=>{const d=document.createElement("div");d.className="step";const h=document.createElement("strong");h.textContent=(i+1)+". "+s[0];const b=document.createElement("button");b.className="action outline";b.textContent="Explain";const x=document.createElement("div");x.className="detail";const code=document.createElement("pre");code.textContent=s[1].replace(/\\n/g,"\n");const desc=document.createElement("p");desc.textContent=s[2];x.append(code,desc);b.onclick=()=>{x.classList.toggle("visible");b.textContent=x.classList.contains("visible")?"Hide":"Explain";};d.append(h,b,x);stepBox.append(d);});
const editor=document.getElementById("editor"),start=editor.value;
document.getElementById("answer").onclick=()=>{editor.value=solution;};
document.getElementById("reset").onclick=()=>{editor.value=start;document.getElementById("check-output").textContent="Practice reset.";};
document.getElementById("check").onclick=()=>{const s=editor.value;const tests=[["Select tabs",s.includes('querySelectorAll(".tab")')],["Select panels",s.includes('querySelectorAll(".panel")')],["Use forEach with index",/tabs\.forEach\s*\(\s*\(\s*\w+\s*,\s*\w+/.test(s)],["Listen for click",s.includes('addEventListener("click"')],["Remove active",s.includes('classList.remove("active")')],["Add active",s.includes('classList.add("active")')],["Use panels[index]",/panels\s*\[\s*index\s*\]/.test(s)]];document.getElementById("check-output").textContent=tests.filter(x=>x[1]).length+"/7 concepts detected: "+tests.map(x=>(x[1]?"✓ ":"○ ")+x[0]).join(" · ")+" (pattern check, not execution)";};
const questions=[
["What does querySelectorAll('.tab') find?",["Only the first tab","All elements with class tab","Only active tabs"],1,"It selects all matching elements."],
["What is the index of the first tab?",["0","1","4"],0,"Array and NodeList positions start at 0."],
["Why remove active from all panels?",["To delete them","To hide the old panel","To change text"],1,"CSS hides panels without active."],
["What does panels[index] mean?",["All panels","The matching panel by position","The first panel"],1,"The index links each tab with its panel."],
["Which line highlights the clicked tab?",["tab.classList.add('active')","console.log(tab)","tab.classList.remove('active')"],0,"Adding active changes the tab style."]
];
const picks={};questions.forEach((q,i)=>{const d=document.createElement("div");d.className="quiz";const h=document.createElement("strong");h.textContent=(i+1)+". "+q[0];d.append(h);q[1].forEach((o,j)=>{const b=document.createElement("button");b.className="option";b.textContent=String.fromCharCode(65+j)+". "+o;b.onclick=()=>{picks[i]=j;d.querySelectorAll(".option").forEach(v=>v.classList.remove("selected"));b.classList.add("selected");};d.append(b);});const fb=document.createElement("p");fb.id="feedback-"+i;d.append(fb);document.getElementById("questions").append(d);});
document.getElementById("mark").onclick=()=>{let n=0;questions.forEach((q,i)=>{if(picks[i]===q[2])n++;document.getElementById("feedback-"+i).textContent=(picks[i]===q[2]?"✓ Correct. ":"✗ Review. ")+q[3];});document.getElementById("score").textContent="Score: "+n+" / 5";};
document.getElementById("retry").onclick=()=>{Object.keys(picks).forEach(k=>delete picks[k]);document.querySelectorAll(".option").forEach(b=>b.classList.remove("selected"));questions.forEach((_,i)=>document.getElementById("feedback-"+i).textContent="");document.getElementById("score").textContent="Try again!";};
