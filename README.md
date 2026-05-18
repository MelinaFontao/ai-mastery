# 🧠 AI Mastery PWA

App educativa gamificada sobre IA. Se instala en el celular como una app real.

---

## 🚀 Instalación en 3 pasos

### Paso 1 — Subir a GitHub Pages (gratis, 5 minutos)

1. Entrá a **github.com** y creá una cuenta si no tenés
2. Hacé clic en **"New repository"**
3. Nombre: `ai-mastery`
4. Marcá **"Public"**
5. Hacé clic en **"Create repository"**
6. En la página del repo, hacé clic en **"uploading an existing file"**
7. Arrastrá TODOS los archivos de esta carpeta (index.html, manifest.json, sw.js, los íconos, y la carpeta modules/)
8. Hacé clic en **"Commit changes"**
9. Andá a **Settings → Pages → Source → Deploy from branch → main → / (root)**
10. Guardá. En 2 minutos tu app va a estar en: `https://TU-USUARIO.github.io/ai-mastery`

### Paso 2 — Abrir en el celular

En el celular, abrí Safari (iPhone) o Chrome (Android) y entrá a:
```
https://TU-USUARIO.github.io/ai-mastery
```

### Paso 3 — Instalar como app

**iPhone (Safari):**
1. Tocá el botón de compartir ⬆️ (abajo en el centro)
2. Tocá **"Añadir a pantalla de inicio"**
3. Tocá **"Añadir"**

**Android (Chrome):**
1. Aparece un banner automático "Instalar app" — tocalo
2. O: menú ⋮ → "Añadir a pantalla de inicio"

✅ Listo. Tenés el ícono de AI Mastery en tu celular. Funciona offline, sin internet.

---

## 🎮 Agregar el código de los módulos

La estructura de la app está lista. Para que cada módulo tenga los juegos completos:

### Método — Copiar desde Claude

1. Abrí la conversación de Claude donde construiste el curso
2. Buscá el widget del módulo (ej: el que dice `aim_m1a_fundamentos`)
3. En el widget, buscá el botón **"..."** o similar → **"View source"**
4. Copiá todo el contenido HTML entre `<style>` y el último `</script>`
5. En `modules/m1a.html`, reemplazá el contenido del `<div id="root">` con ese código
6. Volvé a subir el archivo a GitHub
7. Repetí para los 23 módulos

### Alternativa más fácil

Si los módulos corren bien en Claude, podés jugarlos directamente desde esta conversación. La app PWA y los widgets de Claude comparten el mismo localStorage si usás el mismo navegador del celular — el progreso se sincroniza automáticamente.

---

## 📱 ¿Qué hace esta app?

- **Hub central:** ve tu progreso global, XP, nivel y estado de cada módulo
- **23 módulos:** cada uno con teoría visual + mini-juegos (Quiz, Completar, Ordenar, V/F, Construir)
- **Progreso guardado:** el progreso se guarda en el celular y persiste entre sesiones
- **Funciona offline:** una vez instalada, no necesitás internet para jugar
- **Se actualiza sola:** si subís cambios a GitHub Pages, la app se actualiza automáticamente

---

## 🗂️ Estructura de archivos

```
ai-mastery/
├── index.html          ← Hub central + navegación
├── manifest.json       ← Configuración PWA
├── sw.js               ← Service Worker (offline)
├── icon-192.png        ← Ícono de la app
├── icon-512.png        ← Ícono grande
└── modules/
    ├── m1a.html        ← M1A: ¿Qué es la IA?
    ├── m1b.html        ← M1B: ¿Qué es la IA?
    ├── m2a.html        ← M2A: Prompts Efectivos
    ├── m2b.html        ← M2B
    ├── m3a.html        ← M3A: Tipos de Modelos
    ├── m3b.html        ← M3B
    ├── m4a.html        ← M4A: IA en tu Trabajo
    ├── m4b.html        ← M4B
    ├── m5a.html        ← M5A: Agentes de IA
    ├── m5b.html        ← M5B
    ├── m6a.html        ← M6A: Skills de IA
    ├── m6b.html        ← M6B
    ├── claude.html     ← Modelos de Claude
    ├── m7a.html        ← M7A: Roles del Futuro
    ├── m7b.html        ← M7B
    ├── m8a.html        ← M8A: Roles Técnicos
    ├── m8b.html        ← M8B
    ├── m9a.html        ← M9A: Herramientas Labs
    ├── m9b.html        ← M9B
    ├── m10a.html       ← M10A: Herramientas Externas
    ├── m10b.html       ← M10B
    ├── m11a.html       ← M11A: IA por Industria
    └── m11b.html       ← M11B (módulo final)
```

---

## 💾 Sobre el progreso

- Se guarda en el **localStorage del navegador del celular**
- Persiste aunque cierres la app
- Se borra si limpiás los datos del navegador
- No se sincroniza entre dispositivos (cada celular tiene su propio progreso)

---

## ❓ Problemas comunes

**"No aparece la opción de instalar"**
→ En iPhone, solo funciona desde Safari (no Chrome ni Firefox)
→ En Android, funciona desde Chrome

**"La app no carga offline"**
→ Tenés que haberla abierto al menos una vez con internet para que el Service Worker la cachee

**"Los módulos muestran '⏳' en vez del juego"**
→ Necesitás agregar el código del módulo siguiendo las instrucciones de arriba

---

Construido con ❤️ en Claude · AI Mastery 2026
