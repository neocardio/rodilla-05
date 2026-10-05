# Rodilla 05 · Modo Oso Monarca

Aplicación web en español, adaptable a celular, para rutinas conservadoras de casa a las 05:00 y gimnasio. La versión Oso Monarca añade guía visual de posición inicial y movimiento, flechas de dirección, claves técnicas, mensajes motivacionales y reconocimiento de constancia. No diagnostica una lesión ni prescribe recuperación posquirúrgica.

## Uso

Abrir `index.html` o servir la carpeta por HTTPS. No requiere compilación ni dependencias para funcionar. En Safari, compartir → Añadir a pantalla de inicio. Para uso sin conexión, cargar una vez la versión alojada y esperar la instalación del servicio de caché. No hay notificaciones automáticas con la app cerrada; se puede exportar un evento recurrente de calendario a las 05:00, hora local.

## Progresión

- Etapa 0: movilidad cómoda y contracciones suaves; gimnasio solo tren superior sentado.
- Etapa 1: activación de cuádriceps y cadera, únicamente después de revisión clínica y autorización del plan.
- Etapa 2: bicicleta sin resistencia y fuerza funcional suave, si se autoriza cada ejercicio.
- Etapa 3: aumento conservador de duración o series. No incorpora impacto, giros, flexión profunda ni cargas máximas.

Cada avance requiere confirmación explícita de autorización clínica para la siguiente etapa y tres sesiones recientes de la etapa actual, en días distintos, completas, sin aumento de síntomas y con respuesta posterior registrada. Los síntomas y filtros son una elección conservadora de diseño, no un criterio clínico validado de cicatrización ni una autorización automática. Las sesiones de fuerza de rodilla en gimnasio tienen una separación mínima de 48 horas. En días de gimnasio, la sesión de casa de etapas 2–3 se limita a movilidad.

Las restricciones de apoyo o flexión, lesión de raíz meniscal, lesión ligamentaria, lesión osteocondral, inmovilización o cirugía requieren un plan específico que puede reemplazar por completo estas etapas.

## Datos y privacidad

El registro se guarda en `localStorage`, clave exclusiva `rodilla05:v1`. Sin servidor de datos, cuentas, telemetría ni sincronización. Borrar datos del navegador elimina la bitácora. Exportar JSON para copia; restaurar sobrescribe el registro tras confirmación. No publicar exportaciones clínicas en GitHub. El repositorio contiene únicamente código, no bitácoras personales.

El servicio de caché tiene alcance limitado a esta carpeta y solo elimina sus propias versiones de caché. Las solicitudes para servir la app pueden aparecer en registros del proveedor de alojamiento; no incluyen el registro de síntomas.

## Evidencia

- AAOS, *Acute Isolated Meniscal Pathology*, 2024: https://www.aaos.org/quality/quality-programs/acute-isolated-meniscal-pathology/ . Aplicable a menisco agudo aislado; no lesiones combinadas, de raíz o degenerativas.
- Hull University Teaching Hospitals NHS, *Patella dislocation – Advice regarding healing and recovery*, actualizado 2026: https://www.hey.nhs.uk/patient-leaflet/patella-dislocation-advice-regarding-healing-and-recovery/ . Orienta movilidad cómoda y rehabilitación progresiva; no confirma diagnóstico.
- AAOS OrthoInfo, *Patellar Instability*: https://orthoinfo.aaos.org/diseases--conditions/unstable-kneecap/ . Evaluación e inestabilidad rotuliana.

Los tiempos, dosis iniciales, umbral de dolor 2/10 y reglas de tres sesiones son decisiones conservadoras propias de esta app. No se presenta la app como tratamiento validado para una lesión no diagnosticada.

## Desarrollo y verificación

`node tests/core.test.js` valida filtros de alarma, dosis iniciales, fecha de México y bloqueo de progresión. `node --check app.js` verifica sintaxis. Para reconstruir `index.html`, sustituir los marcadores `/* CORE */` y `/* APP */` en `template.html` por el contenido literal de `core.js` y `app.js`. `monarch.css` contiene la identidad visual y las secuencias SVG se generan desde `app.js`.

Publicar la carpeta `rodilla-05` en la raíz de un sitio GitHub Pages existente permite acceder en `/rodilla-05/`, sin modificar su página principal. Versionar el nombre de caché en `sw.js` al actualizar recursos.
