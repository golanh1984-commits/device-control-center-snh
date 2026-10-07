export const LOCATION={address:'Hannoversche Str. 1, 30629 Hannover-Misburg-Anderten, Germany',lat:52.39012,lng:9.8544};
export const LAST_KNOWN='28.09.2026 · 21:37:33';
export const roles=['Administrator','Mitarbeiter','User (eingeschränkte Nutzung)','Geschäftsführung','Head of IT/KI'];
export const users=[
 {name:'Iheb K.',role:'Mitarbeiter',status:'Aktiv'},
 {name:'Anton P.',role:'Administrator',status:'Aktiv'},
 {name:'Geschäftsführung',role:'Geschäftsführung',status:'Aktiv'},
 {name:'Head of IT/KI',role:'Head of IT/KI',status:'Aktiv'},
 {name:'Laurens Hasan',role:'Administrator',status:'Aktiv'}
];
const names=['Sozan Evdal','Iheb K.','Anton P.','Laurens Hasan','Mitarbeiter A.','Mitarbeiter B.','Geschäftsführung','IT Service','Support Team','Field Device'];
const types=['iPhone 15 Pro','iPhone 16 Pro','iPad Pro 13','iPad Air','MacBook Pro 14','MacBook Air','Dell Latitude 7450','ThinkPad T14','Samsung Galaxy S25'];
export const devices=Array.from({length:36},(_,i)=>{
 const special=i===0;
 const type=special?'iPhone 15 Pro':types[i%types.length];
 return {id:`SNH-${String(i+1).padStart(4,'0')}`,name:special?'iPhone 15 Pro von Sozan Evdal':`${type} – ${names[i%names.length]}`,type,owner:special?'Sozan Evdal':names[i%names.length],serial:special?'F2L9Q7X0N6M3':`SNH${(735200+i*173).toString(36).toUpperCase()}${(1000+i).toString().padStart(4,'0')}`,imei:special?'359876104321765':`35${String(980000000000000+i).slice(0,14)}`,status:special?'Offline':(i%7===0?'Offline':'Online'),sim:special?'Gesperrt':(i%9===0?'Gesperrt':'Aktiv'),battery:special?47:((i*7)%81)+19,lastContact:special?LAST_KNOWN:`07.10.2026 · ${String(8+(i%4)).padStart(2,'0')}:${String((i*7)%60).padStart(2,'0')}:00`};
});
export const audit=[
 {time:'07.10.2026 · 12:14:09',user:'Laurens Hasan',action:'Anmeldung erfolgreich',target:'Device Control Center SNH',result:'Erfolgreich'},
 {time:'07.10.2026 · 11:58:32',user:'Anton P.',action:'Geräteübersicht geöffnet',target:'SNH-0001',result:'Erfolgreich'},
 {time:'06.10.2026 · 16:41:02',user:'Iheb K.',action:'Gerätestatus geprüft',target:'SNH-0014',result:'Erfolgreich'},
 {time:'06.10.2026 · 15:21:47',user:'Laurens Hasan',action:'Standortabfrage',target:'SNH-0001',result:'Letzter bekannter Standort'},
];
