# Bouncing 3D Object with Color Change

Summary
-------
This project demonstrates a simple 3D animation using Three.js. A single lit object (a sphere by default) moves continuously inside the visible camera frustum and bounces off the viewport edges. Each time the object collides with an edge and reverses direction it changes to a new color. The scene uses a soft yellow light (hex `#FFFFAA`) positioned at the upper-left to produce visible light and shading on the object.

Files
-----
- `index.html` — Minimal HTML page that loads Three.js and `script.js`.
- `script.js` — Main scene setup and animation code (camera, renderer, light, mesh, movement, bounce logic, and resize handling).

How to run
----------
1. Open `d:/UoPeople/2026-T1/code/index.html` in a modern browser (Chrome, Edge, Firefox).
   - No local server is required; double-clicking the file or using the browser's File → Open works.
2. You should see a canvas with a light faded yellow background and a shaded object moving and bouncing. Each bounce changes the object's color.

Expected behavior / Grading checklist
------------------------------------
- The scene displays a single 3D object visible to the camera.
- A directional light with color `#FFFFAA` is present in the upper-left and produces light/shading on the object.
- The object moves and bounces exactly at the visible edges of the viewport (frustum-based limits).
- The object changes color immediately upon each bounce.
- The viewport resize updates bounds so bouncing remains correct after resizing.

Implementation notes
--------------------
- Bounce boundaries are computed from the camera frustum so the object collides with the visible edges rather than arbitrary hard-coded coordinates.
- On collision, position is clamped to the boundary and the corresponding velocity component is reversed to avoid jitter caused by repeated frame flips.
- Colors use `THREE.Color` to ensure proper shading updates.

Possible extensions
-------------------
- Enable soft shadows (enable `renderer.shadowMap`, set `light.castShadow = true`, and configure the mesh and plane to cast/receive shadows).
- Add a plane/ground and soft ambient light for more realistic shading.
- Add UI controls to change geometry (sphere/box/torus knot), speed, or toggle shadows.

Troubleshooting
---------------
- If nothing appears, open the browser console (F12) and check for errors (e.g., CDN blocked or Three.js load issue).
- If the object appears off-screen, confirm your browser window has focus and the canvas is full-window (the script sets the renderer to window size).

Author / Notes
--------------
This code is prepared for a university assignment demonstrating animation, collision response, and basic lighting in Three.js. Update or annotate the files with your name and additional comments as needed.
