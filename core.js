(function(root){
  const day=(date=new Date())=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
  function screen(s){
    if(s.cold||s.calf||s.fever) return {level:'urgent',text:'No entrenes. Pie frío o adormecido, pantorrilla hinchada/dolorosa, o fiebre con rodilla roja requieren atención urgente. Si hay falta de aire o dolor torácico, llama al 911.'};
    if(s.lock||s.unstable||s.noWeight||s.largeSwelling) return {level:'stop',text:'Pausa la sesión y solicita valoración pronta: bloqueo, nueva inestabilidad, incapacidad de apoyo o derrame importante necesitan exploración.'};
    if(s.pain>2||s.swelling>0||s.limp) return {level:'adapt',text:'Hoy reduce la carga. Solo movilidad suave sin dolor; gimnasio de rodilla suspendido. Si empeora o persiste, consulta.'};
    return {level:'go',text:'Puedes probar la sesión conservadora. Detente ante dolor mayor de 2/10, pinchazo, bloqueo o sensación de desplazamiento.'};
  }
  function canAdvance(state){
    if(!state.clearance||!state.clearance.reviewed||!state.clearance.approved) return {ok:false,reason:'Pendiente revisar el estudio y confirmar con tu tratante que este plan y sus ejercicios son adecuados.'};
    if(state.phase>=3) return {ok:false,reason:'Última etapa disponible. El retorno a impacto necesita valoración funcional presencial.'};
    const sessions=state.sessions.filter(s=>s.phase===state.phase).sort((a,b)=>b.started.localeCompare(a.started));
    const recent=sessions.slice(0,3);
    if(recent.length<3) return {ok:false,reason:'Registra tres sesiones en días distintos y revisa la respuesta al día siguiente.'};
    if(new Set(recent.map(x=>x.day)).size<3) return {ok:false,reason:'Las tres sesiones deben ser de días distintos.'};
    if(recent.some(x=>x.skipped||x.stopped||x.pre?.level!=='go'||!x.post||x.post.pain>2||x.post.pain>x.pre.pain||x.post.swelling||x.post.unstable||!x.next||x.next.pain>2||x.next.pain>x.pre.pain||x.next.worse||x.next.swelling||x.next.unstable)) return {ok:false,reason:'Se requieren tres sesiones recientes completas de esta etapa, sin aumento de síntomas, con revisión de las 24 horas.'};
    return {ok:true,reason:'Cumples el filtro conservador de tolerancia. Avanza solo si tu tratante autorizó esta etapa; esto no mide cicatrización.'};
  }
  const ex=(id,name,dose,seconds,how,stop)=>({id,name,dose,seconds,how,stop});
  function routine(phase,place,adapt=false){
    const ankle=ex('ankle','Despierta el tobillo','20 repeticiones suaves',50,'Sentado o acostado, alterna la punta del pie hacia ti y hacia delante. La rodilla descansa.','Sin dolor de pantorrilla ni cambios de sensibilidad.');
    const slide=ex('slide','Desliza el talón','1 × 10 repeticiones',90,'Acostado boca arriba, desliza el talón para doblar y estirar dentro del rango cómodo. No fuerces el final ni uses tirones.','Suspende si hay enganche, bloqueo o dolor punzante.');
    const quad=ex('quad','Activa el cuádriceps',phase===0?'10 × 5 segundos':'2 × 10 contracciones de 5 segundos',phase===0?90:180,'Con la pierna apoyada y estirada, aprieta suavemente el muslo y lleva la parte posterior de la rodilla hacia la cama. Respira y relaja entre contracciones.','No fuerces una rodilla que no puede extenderse.');
    if(adapt) return [ankle,ex('slide','Movilidad cómoda','Hasta 5 repeticiones, sin forzar',60,slide.how,'Omite este movimiento si duele, se engancha o existe una restricción médica.')];
    if(place==='gym'){
      const upper=[ex('seated','Press de pecho sentado','2 × 10–12 · esfuerzo 4/10',180,'Máquina con respaldo, carga ligera, pies cómodos y sin empujar con las piernas. Descansa 60–90 segundos entre series.','Evita esfuerzo máximo, aguantar la respiración o traslado inseguro al aparato.'),ex('row','Remo con apoyo','2 × 10–12 · esfuerzo 4/10',180,'Sentado con tronco apoyado si hay máquina disponible. Tira con los brazos; no uses impulso de piernas.','Si la postura exige doblar mucho la rodilla o causa dolor, omite.'),ex('arms','Bíceps sentado','2 × 10–12 · esfuerzo 4/10',180,'Usa mancuernas ligeras, respaldo y movimiento lento. No cargues pesos caminando.','Pide ayuda para mover material y evita apoyos inestables.')];
      if(phase<2) return upper;
      return [ex('bike','Bicicleta suave',phase===2?'5 minutos sin resistencia':'8 minutos · resistencia mínima',phase===2?300:480,'Solo autorizada por tu tratante: asiento alto, flexión cómoda y pedaleo fluido. No fuerces una vuelta completa si el rango no alcanza.','Omite si no puedes pedalear sin dolor, derrame o inestabilidad.'),...upper,ex('sit','Sentarse y levantarse',phase===2?'1 × 8 · silla alta':'2 × 8 · silla alta',phase===2?120:240,'Solo autorizado: silla firme alta, apoyo cercano, pies al ancho de cadera. Levántate lentamente sin que la rodilla caiga hacia dentro. Sin peso adicional.','No hagas flexión profunda. Detente ante dolor o falla.'),ex('calf','Talones con apoyo',phase===2?'1 × 10 · ambos pies':'2 × 10 · ambos pies',phase===2?90:180,'De pie frente a una superficie firme, sube ambos talones despacio y baja con control. Mantén apoyo de manos.','Solo si apoyas sin cojera y el ejercicio está autorizado.')];
    }
    if(phase===0) return [ankle,slide,quad];
    return [ankle,slide,quad,ex('raise','Pierna recta',phase===1?'1 × 8':'2 × 8',phase===1?90:180,'Acostado, contrae el muslo y eleva unos 20 cm. Solo si puedes mantener la rodilla totalmente recta, sin que se doble al elevar.','Omite si no mantienes extensión, duele o hay restricción médica.'),ex('hip','Cadera de lado',phase===1?'1 × 10':'2 × 10',phase===1?90:180,'Acostado sobre el lado derecho, eleva suavemente la pierna izquierda recta, sin girar la pelvis; baja lentamente.','Sin peso ni banda. Evita movimientos que provoquen dolor de rodilla.')];
  }
  const api={day,screen,canAdvance,routine};
  if(typeof module!=='undefined') module.exports=api;
  root.RehabCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
