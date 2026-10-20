const PASSWORD=['Albatros2019','Albatross2019'];
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
let lang=localStorage.getItem('lasttransmission_lang')||'pl';

const tr={
  pl:{archiveLK:'Archiwum awaryjne L.K.',restrictedArchive:'Prywatne archiwum',gateText:'Nie wszystko miało zostać odnalezione. Ale wszystko zostało zapisane.',accessPassword:'Hasło dostępu',show:'Pokaż',hide:'Ukryj',openArchive:'Otwórz archiwum',privateSystem:'System prywatny. Dostęp rejestrowany lokalnie.',overview:'Przegląd',evidence:'Dowody',notes:'Notatki',recordings:'Nagrania',system:'O systemie',localArchive:'Archiwum lokalne',search:'Przeszukaj archiwum',logout:'Zablokuj archiwum',archiveTitle:'Archiwum awaryjne',archiveLead:'Zabezpieczone materiały przygotowane przez L.K.',sealed:'ZAPIECZĘTOWANE',materials:'Materiały',lastUpdate:'Ostatnia aktualizacja',integrity:'Integralność',verified:'Zweryfikowana',storedMaterials:'Zapisane materiały',owner:'Właściciel',created:'Utworzono',items:'Liczba materiałów',mode:'Tryb',emergency:'Archiwum awaryjne',systemNote:'Kopie plików zapisano niezależnie od głównego rejestratora i teczki roboczej.',incorrect:'Nieprawidłowe hasło.',imageReport:'OBRAZ / RAPORT',ownerRole:'właściciel archiwum',modified:'zmodyfikowano',close:'Zamknij'},
  en:{archiveLK:'L.K. emergency archive',restrictedArchive:'Private archive',gateText:'Not everything was meant to be found. But everything was recorded.',accessPassword:'Access password',show:'Show',hide:'Hide',openArchive:'Open archive',privateSystem:'Private system. Access is recorded locally.',overview:'Overview',evidence:'Evidence',notes:'Notes',recordings:'Recordings',system:'About system',localArchive:'Local archive',search:'Search archive',logout:'Lock archive',archiveTitle:'Emergency archive',archiveLead:'Secured materials prepared by L.K.',sealed:'SEALED',materials:'Materials',lastUpdate:'Last update',integrity:'Integrity',verified:'Verified',storedMaterials:'Stored materials',owner:'Owner',created:'Created',items:'Number of materials',mode:'Mode',emergency:'Emergency archive',systemNote:'File copies were stored independently from the primary recorder and working folder.',incorrect:'Incorrect password.',imageReport:'IMAGE / REPORT',ownerRole:'archive owner',modified:'modified',close:'Close'}
};

const files=[
 {id:'lt01',cat:'evidence',code:'LT-01',names:{pl:'ostatnia_strona_raportu.jpg',en:'final_report_last_page.jpg'},type:'JPG',size:'3,8 MB',date:'14.04.2026 21:12'},
 {id:'lt02',cat:'notes',code:'LT-02',names:{pl:'jezeli_to_czytasz.txt',en:'if_you_are_reading_this.txt'},type:'TXT',size:'2 KB',date:'14.04.2026 21:18'},
 {id:'lt03',cat:'recordings',code:'LT-03',names:{pl:'nagranie_B_transkrypcja.txt',en:'recording_B_transcript.txt'},type:'TXT',size:'4 KB',date:'14.04.2026 21:58'}
];

const fileName=f=>f.names[lang];
const fileMeta=f=>`${f.size} · ${f.date}`;

function setLang(value){
  lang=value;
  localStorage.setItem('lasttransmission_lang',value);
  document.documentElement.lang=value;
  $$('.lang').forEach(x=>x.value=value);
  $$('[data-i18n]').forEach(el=>el.textContent=tr[value][el.dataset.i18n]||el.textContent);
  $$('[data-i18n-placeholder]').forEach(el=>el.placeholder=tr[value][el.dataset.i18nPlaceholder]||el.placeholder);
  const ownerRole=$('#profileMenu small'); if(ownerRole) ownerRole.textContent=tr[value].ownerRole;
  const toggle=$('#toggle'); if(toggle) toggle.textContent=tr[value][$('#password').type==='password'?'show':'hide'];
  render();
}
function showApp(){ $('#gate').classList.add('hidden'); $('#app').classList.remove('hidden'); }
function card(f){
  const preview=f.id==='lt01'?tr[lang].imageReport:`${f.type} / ${f.code}`;
  return `<article class="file-card" data-file="${f.id}" tabindex="0" role="button"><div class="thumb ${f.id==='lt01'?'photo':''}"><span>${preview}</span></div><div class="file-kind">${f.cat.toUpperCase()}</div><p class="code">${f.code}</p><b class="filename">${fileName(f)}</b><small>${fileMeta(f)}</small></article>`;
}
function row(f){return `<div class="file-row" data-file="${f.id}" tabindex="0" role="button"><div class="file-icon">${f.type}</div><div><b>${fileName(f)}</b><small>${f.code} · ${f.type}</small></div><span>${fileMeta(f)}</span></div>`;}
function render(){
  $('#cards').innerHTML=files.map(card).join('');
  $('#evidenceList').innerHTML=files.filter(f=>f.cat==='evidence').map(row).join('');
  $('#notesList').innerHTML=files.filter(f=>f.cat==='notes').map(row).join('');
  $('#recordingsList').innerHTML=files.filter(f=>f.cat==='recordings').map(row).join('');
  $$('[data-file]').forEach(el=>{
    el.onclick=()=>openFile(el.dataset.file);
    el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openFile(el.dataset.file)}};
  });
}
function section(id){ $$('.view').forEach(v=>v.classList.toggle('active',v.id===id)); $$('.nav').forEach(n=>n.classList.toggle('active',n.dataset.view===id)); }
function openFile(id){
  const f=files.find(x=>x.id===id);
  $('#fileCode').textContent=f.code;
  $('#fileName').textContent=fileName(f);
  $('#fileMeta').textContent=fileMeta(f);
  $('#viewer').innerHTML=content(id);
  $('#modal').classList.remove('hidden');
}
function content(id){
  const en=lang==='en';
  if(id==='lt01') return `<div class="report-photo"><div class="paper"><div class="document-header"><span>NORTH COAST LOGISTICS</span><span>NC-L/INC-19</span></div><p class="document-kicker">${en?'INTERNAL • CONFIDENTIAL':'WEWNĘTRZNE • POUFNE'}</p><h1>${en?'FINAL INCIDENT REPORT · LAST PAGE':'RAPORT KOŃCOWY Z INCYDENTU · OSTATNIA STRONA'}</h1><div class="rule"></div><p>${en?'The committee finds that crew actions were undertaken in accordance with the emergency procedures applicable at the time of the incident.':'Komisja uznaje, że działania załogi zostały podjęte zgodnie z procedurami awaryjnymi obowiązującymi w chwili zdarzenia.'}</p><div class="signature"><p><b>Tomasz Grzelak</b><br>${en?'Vessel captain':'Kapitan jednostki'}</p></div><p class="hand">${en?'Nine minutes were not a failure. They were a decision.':'Dziewięć minut nie było awarią. Było decyzją.'}<br><small>T.G.</small></p><p class="pencil">${en?'If this is true, someone knew Michał was alive.':'Jeśli to prawda, ktoś wiedział, że Michał żyje.'} — L.K.</p><div class="page-number">07 / 07</div></div></div>`;
  if(id==='lt02') return `<pre class="text-view"><span class="terminal-head">LT-02 // ${fileName(files[1])}</span>\n\n${en?'If you are reading this, it means I did not finish.\n\nFor years I searched for one document.\nThen I understood that documents do not lie by themselves.\n\nThere is always someone behind them who signed, approved or changed something.\n\nDo not ask only what is written in the reports.\nAsk who knew more than they should have.\n\nSome mistakes are too precise to be accidents.\n\nL.K.':'Jeżeli to czytasz, znaczy, że nie zdążyłem.\n\nPrzez lata szukałem jednego dokumentu.\nPotem zrozumiałem, że dokumenty nie kłamią same.\n\nZawsze stoi za nimi ktoś, kto coś podpisał, zatwierdził albo zmienił.\n\nNie pytaj wyłącznie, co znajduje się w raportach.\nPytaj, kto wiedział więcej, niż powinien.\n\nNiektóre błędy są zbyt dokładne, by były przypadkiem.\n\nL.K.'}</pre>`;
  return `<div class="transcript"><div class="transcript-head"><span>REC-B</span><span>00:00–00:38</span></div><p><span class="speaker">[00:00] LEON:</span> ${en?'You did not come here to talk.':'Nie przyszedłeś tu po rozmowę.'}</p><p><span class="speaker">[00:04] ${en?'MAN':'MĘŻCZYZNA'}:</span> ${en?'I came to stop you broadcasting this.':'Przyszedłem, żebyś tego nie emitował.'}</p><p><span class="speaker">[00:16] LEON:</span> ${en?'Nine minutes would have changed something for Michał.':'Dla Michała zmieniłoby dziewięć minut.'}</p><p class="sound">[00:20] ${en?'paper rustling':'szelest papieru'}</p><p><span class="speaker">[00:22] ${en?'MAN':'MĘŻCZYZNA'}:</span> ${en?'Give it to me.':'Oddaj mi to.'}</p><p><span class="speaker">[00:29] LEON:</span> ${en?'To do what? Take the report?':'Do czego? Do zabrania raportu?'}</p><p><span class="speaker">[00:34] LEON:</span> ${en?'Let go.':'Puść.'}</p><p class="sound">[00:35] ${en?'impact, signal interference':'uderzenie, zakłócenie sygnału'}</p></div>`;
}
window.addEventListener('DOMContentLoaded',()=>{
  $$('.lang').forEach(x=>x.onchange=e=>setLang(e.target.value));
  $('#loginForm').onsubmit=e=>{e.preventDefault();if(PASSWORD.includes($('#password').value)){localStorage.setItem('lasttransmission_authenticated','true');showApp()}else $('#error').textContent=tr[lang].incorrect;};
  $('#toggle').onclick=()=>{const input=$('#password');input.type=input.type==='password'?'text':'password';$('#toggle').textContent=tr[lang][input.type==='password'?'show':'hide'];};
  $$('.nav').forEach(n=>n.onclick=()=>section(n.dataset.view));
  $('#profile').onclick=()=>$('#profileMenu').classList.toggle('hidden');
  $('#logout').onclick=()=>{localStorage.removeItem('lasttransmission_authenticated');location.reload();};
  $('#close').onclick=()=>$('#modal').classList.add('hidden');
  $('#modal').onclick=e=>{if(e.target===$('#modal'))$('#modal').classList.add('hidden');};
  document.onkeydown=e=>{if(e.key==='Escape')$('#modal').classList.add('hidden');};
  $('#search').oninput=()=>{const q=$('#search').value.toLowerCase();$$('[data-file]').forEach(x=>x.style.display=x.textContent.toLowerCase().includes(q)?'':'none');};
  setLang(lang);
  if(localStorage.getItem('lasttransmission_authenticated')==='true')showApp();
});
