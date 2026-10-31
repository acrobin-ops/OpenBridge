/**
 * OpenBridge — Core Datasets & State Models
 * Quests, Git Visualizer Steps, Good First Issues, and Bilingual Jargon Glossary
 */

 const i18nStrings = {
 en: {
 nav_sim: 'PR Simulator',
 nav_viz: 'Git vs English',
 nav_issues: 'Live Issues',
 nav_glossary: 'Jargon Decoder',
 nav_reuse: 'Club Config',
 hero_pill: 'Open Source Education — No Terminal Needed',
 step_1: 'Pick Quest',
 step_2: 'Sandbox Edit',
 step_3: 'Submit PR',
 step_4: 'Merge & Badge',
 select_quest_title: '1. Choose Your Starter Quest',
 mission_brief_title: 'Plain-Language Assignment',
 goal_label: 'Your Exact Goal:',
 btn_auto_hint: 'Auto-Fill Guided Solution',
 btn_reset: 'Reset',
 tab_editor: 'Code Editor',
 tab_diff: 'Live Diff Preview',
 tip_hover: 'Tip: Check the Live Diff tab to see additions in green!',
 btn_ready_pr: 'Step 3: Prepare Pull Request',
 pr_form_title: 'Step 3: Open Your Pull Request (PR)',
 pr_form_subtitle: 'A Pull Request politely asks the project maintainers to review and merge your changes.',
 btn_fill_template: 'Auto-Fill PR Template',
 label_your_name: 'Your Name / GitHub Handle (for your Badge!)',
 label_pr_title: 'Pull Request Title',
 label_pr_desc: 'What did you change and why does it help?',
 btn_submit_pr: 'Submit Pull Request to RowdyBot',
 badge_earned_title: ' Official First Contributor Badge Unlocked!',
 badge_earned_desc: 'You just completed the exact workflow professional open-source developers use every day. Download your badge or jump into a real UTSA repository!',
 btn_download_badge: 'Download Official PNG Certificate',
 btn_explore_real: 'Explore Real Good First Issues →',
 viz_title: 'Git Commands vs. Everyday Life (Group Potluck Analogy)',
 viz_subtitle: 'Terminal commands sound scary only because nobody explains the real-world story behind them. Click each step of the journey below!',
 issues_title: 'Beginner-Friendly"Good First Issue" Matcher',
 issues_subtitle: 'Filter by your major or comfort level—over 40% of open source contributions require zero coding!',
 glossary_title: 'Bilingual Open Source Jargon Decoder',
 glossary_subtitle: 'Search any intimidating Git or GitHub term to see its plain-language definition and everyday analogy in English and Spanish.'
 },
 es: {
 nav_sim: 'Simulador PR',
 nav_viz: 'Git en Español',
 nav_issues: 'Proyectos Reales',
 nav_glossary: 'Glosario Git',
 nav_reuse: 'Configurar Club',
 hero_pill: 'Educación Open Source — Sin Terminal',
 step_1: 'Elegir Misión',
 step_2: 'Editar Archivo',
 step_3: 'Enviar PR',
 step_4: 'Insignia',
 select_quest_title: '1. Elige Tu Misión Inicial',
 mission_brief_title: 'Instrucciones en Lenguaje Claro',
 goal_label: 'Tu Objetivo Exacto:',
 btn_auto_hint: 'Autocompletar Solución Guiada',
 btn_reset: 'Reiniciar',
 tab_editor: 'Editor de Código',
 tab_diff: 'Vista Previa de Cambios (Diff)',
 tip_hover: 'Consejo: ¡Revisa la pestaña Diff para ver tus adiciones en verde!',
 btn_ready_pr: 'Paso 3: Preparar Pull Request',
 pr_form_title: 'Paso 3: Abre Tu Pull Request (PR)',
 pr_form_subtitle: 'Un Pull Request pide amablemente a los encargados del proyecto que revisen y fusionen tus mejoras.',
 btn_fill_template: 'Autocompletar Plantilla PR',
 label_your_name: 'Tu Nombre / Usuario GitHub (¡para tu Certificado!)',
 label_pr_title: 'Título del Pull Request',
 label_pr_desc: '¿Qué cambiaste y cómo ayuda al proyecto?',
 btn_submit_pr: 'Enviar Pull Request a RowdyBot',
 badge_earned_title: ' ¡Insignia Oficial de Primer Contribuidor Desbloqueada!',
 badge_earned_desc: 'Acabas de completar el flujo exacto que usan los desarrolladores profesionales. ¡Descarga tu certificado o explora proyectos reales de UTSA!',
 btn_download_badge: 'Descargar Certificado Oficial PNG',
 btn_explore_real: 'Explorar Proyectos Reales →',
 viz_title: 'Comandos Git vs. La Vida Diaria (Analogía del Recetario)',
 viz_subtitle: 'Los comandos de terminal parecen difíciles solo porque nadie explica la historia sencilla detrás de ellos. ¡Haz clic en cada paso!',
 issues_title: 'Buscador de Tareas Iniciales ("Good First Issues")',
 issues_subtitle: 'Filtra por tu carrera o nivel—¡más del 40% del software libre no requiere saber programar!',
 glossary_title: 'Decodificador Bilingüe de Jerga Open Source',
 glossary_subtitle: 'Busca cualquier término de Git o GitHub para ver su explicación sencilla y analogía en inglés y español.'
 }
 };


 const glossaryTerms = [
 {
 term: 'Repository',
 esTerm: 'Repositorio (Repo)',
 enDesc: 'The main project folder where all code, documentation, and history are stored.',
 esDesc: 'La carpeta principal del proyecto donde se guardan todos los archivos, documentos e historial.',
 enAnalogy: 'Analogy: Like a shared Google Drive folder for an entire club project.',
 esAnalogy: 'Analogía: Como una carpeta compartida de Google Drive para todo el club.'
 },
 {
 term: 'Fork',
 esTerm: 'Bifurcación (Fork)',
 enDesc: 'Your own personal copy of someone else’s repository on your account so you can experiment safely.',
 esDesc: 'Tu propia copia personal del proyecto en tu cuenta para experimentar sin temor a romper nada.',
 enAnalogy: 'Analogy: Photocopying a friend’s recipe so you can add your own secret spices at home.',
 esAnalogy: 'Analogía: Fotocopiar la receta de un amigo para probar tus propios ingredientes en casa.'
 },
 {
 term: 'Branch',
 esTerm: 'Rama (Branch)',
 enDesc: 'A safe draft workspace where you work on one specific fix without touching the official version.',
 esDesc: 'Un borrador seguro donde trabajas en una mejora específica sin alterar la versión oficial.',
 enAnalogy: 'Analogy: Working on a rough draft tab before pasting into the final group essay.',
 esAnalogy: 'Analogía: Escribir en un borrador aparte antes de pasarlo al ensayo final del equipo.'
 },
 {
 term: 'Commit',
 esTerm: 'Confirmación (Commit)',
 enDesc: 'Saving a snapshot of your changes along with a short note explaining what you did.',
 esDesc: 'Guardar una captura de tus cambios junto con una nota corta explicando qué hiciste.',
 enAnalogy: 'Analogy: Hitting a video game checkpoint with a label like"Fixed level 2 bridge".',
 esAnalogy: 'Analogía: Guardar partida en un videojuego con una nota de lo que lograste.'
 },
 {
 term: 'Pull Request',
 esTerm: 'Solicitud de Cambios (PR)',
 enDesc: 'Politely proposing your saved changes to the main project so maintainers can review and include them.',
 esDesc: 'Proponer tus mejoras al proyecto principal para que los encargados las revisen y las incluyan.',
 enAnalogy: 'Analogy: Submitting your improved recipe card to be printed in the official UTSA cookbook.',
 esAnalogy: 'Analogía: Enviar tu receta mejorada para que la incluyan en el recetario oficial.'
 },
 {
 term: 'Merge',
 esTerm: 'Fusionar (Merge)',
 enDesc: 'When the project maintainer approves your Pull Request and blends your changes into the official project.',
 esDesc: 'Cuando el encargado aprueba tu Pull Request y une tus cambios al proyecto oficial.',
 enAnalogy: 'Analogy: Your paragraph is officially accepted and published in the club handbook!',
 esAnalogy: 'Analogía: ¡Tu párrafo es aceptado oficialmente y publicado en el manual del club!'
 },
 {
 term: 'Good First Issue',
 esTerm: 'Tarea para Principiantes',
 enDesc: 'A welcoming task specifically tagged by maintainers for newcomers making their first contribution.',
 esDesc: 'Una tarea sencilla marcada especialmente por los creadores para dar la bienvenida a principiantes.',
 enAnalogy: 'Analogy: A"Starter Quest" in an RPG with clear instructions and friendly mentors.',
 esAnalogy: 'Analogía: Una misión de entrenamiento con instrucciones claras y ayuda garantizada.'
 },
 {
 term: 'Open Source License',
 esTerm: 'Licencia Open Source (MIT)',
 enDesc: 'A legal permission slip (like the MIT License) that lets anyone use, study, modify, and share the project.',
 esDesc: 'Un permiso legal (como la Licencia MIT) que permite a cualquiera usar, mejorar y compartir el proyecto.',
 enAnalogy: 'Analogy: A Creative Commons pass saying"Feel free to remix and share for your school!"',
 esAnalogy: 'Analogía: Un pase libre que dice"¡Siéntete libre de adaptarlo y usarlo en tu universidad!"'
 }
 ];


 const quests = [
 {
 id: 'docs-fix',
 icon: '',
 badgeTag: 'Non-CS / Zero Code',
 branch: 'docs/fix-handbook-url',
 file: 'README.md',
 time: '~2 mins',
 enTitle: 'Quest 1: Fix Broken Handbook Link',
 esTitle: 'Misión 1: Corregir Enlace Roto en Guía',
 enDesc: 'A student noticed the UTSA OSPO newcomer guide has a typo in the website URL (`https://utsa.edu/ospo-404`). You do not need any programming knowledge—just fix the link!',
 esDesc: 'Un estudiante notó que la guía de bienvenida de UTSA OSPO tiene un error en el enlace web (`https://utsa.edu/ospo-404`). ¡No necesitas saber programar, solo corrige el enlace!',
 enGoal: 'Change"https://utsa.edu/ospo-404" to"https://utsa.edu/ospo" on line 5.',
 esGoal: 'Cambia"https://utsa.edu/ospo-404" por"https://utsa.edu/ospo" en la línea 5.',
 initialCode: `# Welcome to UTSA Open Source Launchpad \n\nWe help Roadrunners make their first open-source contribution!\n\n Official Student Portal: https://utsa.edu/ospo-404\n\n## How to Join\n- Attend our weekly Friday workshop\n- Say hello in the community channel`,
 solutionCode: `# Welcome to UTSA Open Source Launchpad \n\nWe help Roadrunners make their first open-source contribution!\n\n Official Student Portal: https://utsa.edu/ospo\n\n## How to Join\n- Attend our weekly Friday workshop\n- Say hello in the community channel`,
 prTitle: 'docs: fix broken UTSA OSPO student portal URL in README',
 prBody: 'Updated the broken `/ospo-404` URL to the active `https://utsa.edu/ospo` link so new students can access the portal.',
 validate: (code) => code.includes('https://utsa.edu/ospo') && !code.includes('ospo-404')
 },
 {
 id: 'es-translation',
 icon: '',
 badgeTag: 'Bilingual / Español',
 branch: 'i18n/add-spanish-welcome',
 file: 'WELCOME_ES.md',
 time: '~2 mins',
 enTitle: 'Quest 2: Translate Welcome Banner to Spanish',
 esTitle: 'Misión 2: Traducir Bienvenida al Español',
 enDesc: 'Help make our repository welcoming for bilingual first-generation students and families by translating the missing greeting line into Spanish!',
 esDesc: '¡Ayuda a que nuestro proyecto sea accesible para estudiantes bilingües y de primera generación traduciendo la línea pendiente al español!',
 enGoal: 'Replace"[TODO: Translate to Spanish]" with"¡Bienvenidos al código abierto en UTSA!"',
 esGoal: 'Reemplaza"[TODO: Translate to Spanish]" por"¡Bienvenidos al código abierto en UTSA!"',
 initialCode: `# Bilingual Community Guide / Guía Comunitaria\n\nEnglish: Welcome to open source at UTSA!\nEspañol: [TODO: Translate to Spanish]\n\nEveryone is welcome to contribute regardless of major.`,
 solutionCode: `# Bilingual Community Guide / Guía Comunitaria\n\nEnglish: Welcome to open source at UTSA!\nEspañol: ¡Bienvenidos al código abierto en UTSA!\n\nEveryone is welcome to contribute regardless of major.`,
 prTitle: 'i18n(es): add Spanish welcome translation for newcomers',
 prBody: 'Added the Spanish welcome greeting in WELCOME_ES.md to support bilingual students at UTSA.',
 validate: (code) => !code.includes('[TODO: Translate to Spanish]') && (code.toLowerCase().includes('bienvenidos') || code.toLowerCase().includes('utsa'))
 },
 {
 id: 'wall-of-fame',
 icon: '',
 badgeTag: 'First-Timer Wall',
 branch: 'feat/add-contributor-card',
 file: 'contributors.json',
 time: '~3 mins',
 enTitle: 'Quest 3: Add Yourself to the Wall of Fame',
 esTitle: 'Misión 3: Agrégate al Muro de Contribuidores',
 enDesc: 'Every open-source contributor deserves credit! Add your name, major, and role to our official `contributors.json` registry.',
 esDesc: '¡Todo colaborador merece reconocimiento! Agrega tu nombre y carrera al registro oficial `contributors.json`.',
 enGoal: 'Change"REPLACE_WITH_YOUR_NAME" to your real name or handle.',
 esGoal: 'Cambia"REPLACE_WITH_YOUR_NAME" por tu nombre o usuario.',
 initialCode: `[\n {\n"name":"Rowdy the Roadrunner",\n"major":"Mascot Studies",\n"role":"Maintainer"\n },\n {\n"name":"REPLACE_WITH_YOUR_NAME",\n"major":"First-Time Open Source Explorer",\n"role":"First PR Contributor"\n }\n]`,
 solutionCode: `[\n {\n"name":"Rowdy the Roadrunner",\n"major":"Mascot Studies",\n"role":"Maintainer"\n },\n {\n"name":"Sofia Rodriguez",\n"major":"First-Time Open Source Explorer",\n"role":"First PR Contributor"\n }\n]`,
 prTitle: 'feat: add new contributor profile to contributors.json',
 prBody: 'Added my contributor entry to the student launchpad Wall of Fame!',
 validate: (code) => !code.includes('REPLACE_WITH_YOUR_NAME') && code.includes('"First PR Contributor"')
 },
 {
 id: 'css-theme',
 icon: '',
 badgeTag: 'Design & Accessibility',
 branch: 'style/high-contrast-button',
 file: 'theme.css',
 time: '~2 mins',
 enTitle: 'Quest 4: Upgrade Button Contrast to UTSA Orange',
 esTitle: 'Misión 4: Mejorar Contraste Visual con Naranja UTSA',
 enDesc: 'Designers are vital to open source! The current primary button uses a dull gray color (`#64748B`) with low visibility. Update it to official UTSA Orange (`#F15A22`).',
 esDesc: '¡El diseño es vital en open source! El botón principal usa un gris opaco (`#64748B`). Actualízalo al Naranja Oficial de UTSA (`#F15A22`).',
 enGoal: 'Replace"#64748B" with"#F15A22" in `.btn-primary`.',
 esGoal: 'Reemplaza"#64748B" por"#F15A22" en `.btn-primary`.',
 initialCode: `:root {\n --campus-navy: #0C2340;\n}\n\n.btn-primary {\n background-color: #64748B; /* Low contrast gray */\n color: #FFFFFF;\n border-radius: 12px;\n padding: 12px 24px;\n}`,
 solutionCode: `:root {\n --campus-navy: #0C2340;\n}\n\n.btn-primary {\n background-color: #F15A22; /* Official UTSA Vibrant Orange */\n color: #FFFFFF;\n border-radius: 12px;\n padding: 12px 24px;\n}`,
 prTitle: 'style(a11y): update primary button token to high-contrast UTSA orange',
 prBody: 'Replaced low-contrast `#64748B` gray with `#F15A22` UTSA orange for better visual clarity.',
 validate: (code) => code.toUpperCase().includes('#F15A22') && !code.toUpperCase().includes('#64748B')
 }
 ];


 const vizSteps = [
 {
 analogyTitle: '1. The Shared Family Recipe Book',
 analogyBody: 'Imagine a community cookbook kept in the UTSA library. Everyone can read it, and all changes are tracked page by page.',
 webTitle: 'Open the Project Page on GitHub',
 webBody: 'You visit a public URL like github.com/utsa-ospo/launchpad and read the README file to learn what the project does.',
 cliCode: '# No command needed!\n# You simply view the repository in your browser.',
 cliNote: 'A Repository ("Repo") is just a project folder stored online.'
 },
 {
 analogyTitle: '2. Photocopying the Recipe Book',
 analogyBody: 'Before scribbling notes, you make a personal photocopy of the cookbook so you cannot accidentally ruin the library’s master copy.',
 webTitle: 'Click the"Fork" Button in the Top-Right',
 webBody: 'GitHub creates an identical copy under your personal username (e.g., your-name/launchpad) in 2 seconds.',
 cliCode: 'git clone https://github.com/you/launchpad.git',
 cliNote: 'Forking stays 100% online; git clone just downloads a copy if you work offline.'
 },
 {
 analogyTitle: '3. Using a Sticky Note for Your Tweak',
 analogyBody: 'You place a yellow sticky note on page 5 to test adding extra garlic without altering the other pages.',
 webTitle: 'Click"New Branch" Dropdown',
 webBody: 'Type a short descriptive name like `fix-link` or `spanish-translation` so your experiment stays organized.',
 cliCode: 'git checkout -b fix-link',
 cliNote: 'Branches let 50 students work on 50 different features at the exact same time!'
 },
 {
 analogyTitle: '4. Snapping a Photo of Your New Dish',
 analogyBody: 'Once the recipe tastes great, you write a quick label:"Added 2 cloves of garlic for flavor" and clip it into your binder.',
 webTitle: 'Edit in Browser & Click"Commit Changes"',
 webBody: 'Press `.` on any GitHub repo to open a browser editor, make your change, and write a 1-sentence summary.',
 cliCode: 'git add README.md\ngit commit -m"docs: fix broken portal URL"\ngit push origin fix-link',
 cliNote: 'A Commit is just a saved checkpoint with a helpful message.'
 },
 {
 analogyTitle: '5. Inviting the Head Chef to Taste It',
 analogyBody: 'You hand your card to the cookbook editor:"Hey! I fixed the typo on page 5—would you like to print this in the official edition?"',
 webTitle: 'Click"Compare & Pull Request"',
 webBody: 'Maintainers review your green/red diff lines, leave a friendly comment, and click"Merge Pull Request"!',
 cliCode: 'gh pr create --title"docs: fix broken URL"',
 cliNote: 'Once merged, your GitHub profile officially credits you as a project contributor!'
 }
 ];


 const liveIssues = [
 {
 id: 'iss-1',
 repo: 'utsa-ospo / openbridge-launchpad',
 title: 'Add Spanish glossary examples for"Merge Conflict" and"Release"',
 category: 'esl',
 categoryLabel: ' Bilingual / Español',
 skill: 'No Coding Required • Español',
 mentor: 'RowdyBot & UTSA OSPO Team',
 url: 'https://github.com/utsa-ospo'
 },
 {
 id: 'iss-2',
 repo: 'firstcontributions / first-contributions',
 title: 'Add your name to Contributors.md in a real 80k-star GitHub repository',
 category: 'non-code',
 categoryLabel: ' Non-Code / Markdown',
 skill: 'Markdown • 5-Minute Walkthrough',
 mentor: 'First Contributions Bot',
 url: 'https://github.com/firstcontributions/first-contributions'
 },
 {
 id: 'iss-3',
 repo: 'utsa-acm / rowdyhacks-portal-docs',
 title: 'Proofread newcomer FAQ section for first-time hackathon attendees',
 category: 'non-code',
 categoryLabel: ' Non-Code / Docs',
 skill: 'English Writing • Clarity Audit',
 mentor: 'ACM Student Maintainers',
 url: 'https://github.com/utsa-ospo'
 },
 {
 id: 'iss-4',
 repo: ' EddieHubCommunity / BioDrop',
 title: 'Improve high-contrast focus ring on profile link buttons (WCAG AA)',
 category: 'design',
 categoryLabel: ' UI / Accessibility',
 skill: 'CSS / Tailwind • Accessibility',
 mentor: 'EddieHub Mentors',
 url: 'https://goodfirstissue.dev'
 },
 {
 id: 'iss-5',
 repo: 'freeCodeCamp / freeCodeCamp',
 title: 'Translate interactive HTML curriculum hint strings into Spanish',
 category: 'esl',
 categoryLabel: ' Bilingual / Español',
 skill: 'Spanish Localization • Education',
 mentor: 'fCC i18n Working Group',
 url: 'https://up-for-grabs.net'
 },
 {
 id: 'iss-6',
 repo: 'utsa-ospo / campus-resource-map',
 title: 'Design SVG icon badge for wheelchair-accessible campus study rooms',
 category: 'design',
 categoryLabel: ' UI / Design',
 skill: 'Figma / SVG • Zero JS Needed',
 mentor: 'UTSA OSPO Design Lead',
 url: 'https://github.com/utsa-ospo'
 },
 {
 id: 'iss-7',
 repo: 'python / cpython-beginner-guide',
 title: 'Clarify Windows vs macOS installation screenshot captions in tutorial',
 category: 'non-code',
 categoryLabel: ' Non-Code / Docs',
 skill: 'Documentation • Screenshots',
 mentor: 'Python Docs Community',
 url: 'https://goodfirstissue.dev'
 },
 {
 id: 'iss-8',
 repo: 'utsa-ospo / openbridge-launchpad',
 title: 'Add unit test verifying JSON schema for club.config.json',
 category: 'code',
 categoryLabel: ' Starter Code',
 skill: 'JavaScript / JSON • Beginner Code',
 mentor: 'UTSA OSPO Maintainers',
 url: 'https://github.com/utsa-ospo'
 }
 ];
