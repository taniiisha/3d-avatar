/**
 * app_streamoji.js
 * ─────────────────────────────────────────────────────────────
 * Three.js + AngularJS controller for Streamoji GLB avatars.
 *
 * Camera strategy (the only reliable approach for unknown GLBs):
 *   1. Measure raw bounding box
 *   2. Place model with feet at Y = 0, centred on X/Z
 *   3. Head crown is at Y = size.y (the very top)
 *   4. Face centre ≈ Y = size.y * 0.88
 *   5. Camera sits at that Y, pulled back so head+chest fills frame
 *
 * This avoids all bounding-box-center issues caused by spread arms.
 * ─────────────────────────────────────────────────────────────
 */

angular
  .module("StreamojiApp", [])
  .controller("StreamojiController", function ($scope) {

    /* ─────────────────────────────────
       State
    ───────────────────────────────── */
    let model   = null;
    let mixer   = null;
    const clock = new THREE.Clock();
    const scene = new THREE.Scene();

    let blinkInterval = null;
    let headMesh      = null;
    let teethMesh     = null;

    $scope.avatarReady = false;
    $scope.isSpeaking  = false;
    $scope.showDebug   = false;

    const AVATAR_URL = "avatar-KuJ8E7LXMmVeR5b6qsni.glb";

    /* ─────────────────────────────────
       Phoneme → viseme map
    ───────────────────────────────── */
    const corresponding = {
      A:"viseme_PP", a:"viseme_PP",
      B:"viseme_kk", b:"viseme_kk",
      C:"viseme_I",  c:"viseme_I",
      D:"viseme_AA", d:"viseme_T",
      E:"viseme_O",  e:"viseme_O",
      F:"viseme_U",  f:"viseme_FF",
      G:"viseme_FF", g:"viseme_kk",
      H:"viseme_TH", h:"viseme_TH",
      I:"viseme_ee", i:"viseme_ee",
      J:"viseme_ch", j:"viseme_ch",
      K:"viseme_kk", k:"viseme_kk",
      L:"viseme_L",  l:"viseme_L",
      M:"viseme_M",  m:"viseme_M",
      N:"viseme_N",  n:"viseme_N",
      O:"viseme_O",  o:"viseme_O",
      P:"viseme_O",  p:"viseme_O",
      Q:"viseme_Q",  q:"viseme_Q",
      R:"viseme_R",  r:"viseme_R",
      S:"viseme_S",  s:"viseme_S",
      T:"viseme_T",  t:"viseme_T",
      U:"viseme_U",  u:"viseme_U",
      V:"viseme_V",  v:"viseme_V",
      W:"viseme_W",  w:"viseme_W",
      X:"viseme_X",  x:"viseme_X",
      Y:"viseme_Y",  y:"viseme_Y",
      Z:"viseme_Z",  z:"viseme_Z",
      sil:"viseme_X",
      th:"viseme_TH", dh:"viseme_TH",
      ng:"viseme_nn", ch:"viseme_ch",
      sh:"viseme_SS", zh:"viseme_SS",
      aw:"viseme_AA", oy:"viseme_AA",
      er:"viseme_R",  ah:"viseme_AA",
      uh:"viseme_U",  aa:"viseme_AA",
      ae:"viseme_AA", ao:"viseme_AA",
      ay:"viseme_AA", eh:"viseme_E",
      ey:"viseme_E",  ih:"viseme_I",
      iy:"viseme_ee", ow:"viseme_O",
      uw:"viseme_U",
    };

    /* ─────────────────────────────────
       Sample lip-sync data
       (swap mouthCues for real data)
    ───────────────────────────────── */
    const lipsync = {
      mouthCues: [
        {start:0.006,end:0.061,value:"k"},{start:0.061,end:0.102,value:"a"},
        {start:0.102,end:0.160,value:"t"},{start:0.160,end:0.221,value:"i"},
        {start:0.221,end:0.265,value:"u"},{start:0.265,end:0.329,value:"t"},
        {start:0.329,end:0.378,value:"i"},{start:0.378,end:0.465,value:"s"},
        {start:0.465,end:0.520,value:"k"},{start:0.520,end:0.588,value:"r"},
        {start:0.588,end:0.671,value:"a"},{start:0.671,end:0.723,value:"p"},
        {start:0.723,end:0.772,value:"sil"},{start:0.772,end:0.896,value:"s"},
        {start:0.896,end:0.938,value:"i"},{start:0.938,end:1.008,value:"t"},
        {start:1.008,end:1.066,value:"E"},{start:1.066,end:1.189,value:"r"},
        {start:1.189,end:1.262,value:"i"},{start:1.262,end:1.359,value:"o"},
        {start:1.359,end:1.472,value:"u"},{start:1.472,end:1.522,value:"E"},
        {start:1.522,end:1.588,value:"r"},{start:1.588,end:1.673,value:"i"},
        {start:1.673,end:1.746,value:"u"},{start:1.746,end:1.828,value:"k"},
        {start:1.828,end:1.900,value:"a"},{start:1.900,end:1.973,value:"t"},
        {start:1.973,end:2.052,value:"u"},{start:2.052,end:2.180,value:"a"},
        {start:2.180,end:2.302,value:"p"},{start:2.302,end:2.529,value:"sil"},
        {start:2.529,end:2.636,value:"s"},{start:2.636,end:2.815,value:"k"},
        {start:2.815,end:2.945,value:"p"},{start:2.945,end:3.063,value:"t"},
        {start:3.063,end:3.214,value:"s"},{start:3.214,end:3.341,value:"e"},
        {start:3.341,end:3.494,value:"t"},{start:3.494,end:3.611,value:"e"},
        {start:3.611,end:3.823,value:"s"},{start:3.823,end:3.984,value:"k"},
        {start:3.984,end:4.125,value:"i"},{start:4.125,end:4.319,value:"t"},
        {start:4.319,end:4.547,value:"E"},{start:4.547,end:4.698,value:"k"},
        {start:4.698,end:4.828,value:"t"},{start:4.828,end:4.943,value:"i"},
        {start:4.943,end:5.060,value:"a"},{start:5.060,end:5.388,value:"r"},
        {start:5.388,end:5.883,value:"sil"},
      ]
    };

    /* ─────────────────────────────────
       Renderer — sized to the container
    ───────────────────────────────── */
    const container = document.getElementById("avatar-canvas");

    const camera = new THREE.PerspectiveCamera(
      35,                                          // tighter FOV → less distortion
      container.clientWidth / container.clientHeight,
      0.01,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding    = THREE.sRGBEncoding;
    renderer.toneMapping       = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);           // transparent bg (CSS handles colour)
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    /* ─────────────────────────────────
       Lighting
    ───────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const keyLight = new THREE.DirectionalLight(0xfff4e6, 1.0);
    keyLight.position.set(1.5, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa0c8ff, 0.3);
    fillLight.position.set(-2, 2, -1);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    /* ─────────────────────────────────
       Avatar loading
    ───────────────────────────────── */
    const gltfLoader = new THREE.GLTFLoader();
    loadAvatar(AVATAR_URL);

    function loadAvatar(url) {
      $scope.avatarReady = false;
      setLoading(true);
      headMesh = teethMesh = null;
      clearBlinking();

      if (model) {
        disposeHierarchy(model, disposeNode);
        scene.remove(model);
        model = null;
      }

      gltfLoader.load(url, onLoaded, undefined, (err) => {
        console.error("GLB load error:", err);
        setLoading(false);
        document.querySelector(".loader-label").textContent = "Failed to load avatar.";
      });
    }

    /* ─────────────────────────────────
       onLoaded — the heart of the fix
    ───────────────────────────────── */
    function onLoaded(gltf) {
      model = gltf.scene;
      scene.add(model);

      /* ── Step 1: raw bounding box ─────────────── */
      const box  = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);

      console.log("📐 GLB bbox  min:", box.min, "  max:", box.max);
      console.log("📐 GLB size  x:", size.x.toFixed(3), " y:", size.y.toFixed(3), " z:", size.z.toFixed(3));

      /* ── Step 2: position — feet at Y=0, centred X/Z ── */
      model.position.set(
        -( box.min.x + box.max.x ) / 2,   // centre on X
        -box.min.y,                         // lift so bottom = 0
        -( box.min.z + box.max.z ) / 2     // centre on Z
      );

      /*
       * After this placement:
       *   Y = 0          → bottom of model (feet / waist for half-body)
       *   Y = size.y     → absolute top of model (crown of head)
       *   Y = size.y * 0.88  → face / eye level  (head occupies ~top 12%)
       */

      /* ── Step 3: camera framing ───────────────── *
       *
       * We want to show: head + upper chest
       * "frame height" = top 42% of total model height
       *
       * camDist is derived from the vertical FOV formula:
       *   tan(fovY/2) = (frameH/2) / camDist
       *   → camDist = (frameH/2) / tan(fovY/2)
       *
       * We use a 1.15× padding factor so there's breathing room.
       */
      const faceY  = size.y * 0.88;
      const frameH = size.y * 0.42;
      const fovRad = (camera.fov * Math.PI) / 180;
      const camDist = ( frameH / 2 ) / Math.tan( fovRad / 2 ) * 1.15;

      camera.position.set(0, faceY, camDist);
      camera.lookAt(0, faceY, 0);
      camera.near = Math.max(0.01, camDist / 100);
      camera.far  = camDist * 100;
      camera.updateProjectionMatrix();

      console.log("📷 faceY:", faceY.toFixed(3), "  camDist:", camDist.toFixed(3));

      /* ── Step 4: materials & shadows ─────────── */
      model.traverse((child) => {
        if (!child.isMesh) return;
        child.castShadow = child.receiveShadow = true;
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((mat) => {
          const n = (mat.name || "").toLowerCase();
          if (n.includes("skin") || n.includes("head") || n.includes("face")) {
            mat.roughness = 0.65;
            mat.metalness = 0.0;
          }
        });
      });

      /* ── Step 5: resolve lip-sync meshes ─────── */
      resolveLipSyncMeshes();
      buildDebugInfo();

      /* ── Step 6: animations ───────────────────── */
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());

      /* ── Step 7: ready ────────────────────────── */
      setupBlinking();
      setLoading(false);
      $scope.$apply(() => { $scope.avatarReady = true; });
      startRenderLoop();
    }

    /* ─────────────────────────────────
       Dynamic lip-sync mesh resolver
       Finds meshes by scanning for viseme_ morph targets.
       Never uses hardcoded mesh names.
    ───────────────────────────────── */
    function resolveLipSyncMeshes() {
      let bestHeadScore = -1;
      let bestTeethScore = -1;

      model.traverse((child) => {
        if (!child.isMesh || !child.morphTargetDictionary) return;
        const keys    = Object.keys(child.morphTargetDictionary);
        const visemes = keys.filter((k) => k.startsWith("viseme_")).length;
        const name    = child.name.toLowerCase();

        if (visemes <= 0) return;

        if (name.includes("teeth") || name.includes("tooth") || name.includes("mouth")) {
          if (visemes > bestTeethScore) { bestTeethScore = visemes; teethMesh = child; }
        } else if (visemes > bestHeadScore) {
          bestHeadScore = visemes; headMesh = child;
        }
      });

      if (!teethMesh) teethMesh = headMesh; // many rigs combine head+teeth

      if (headMesh) {
        console.log("✅ headMesh:", headMesh.name,
          "→", Object.keys(headMesh.morphTargetDictionary).length, "morph targets");
      } else {
        console.warn("⚠️ No viseme morph targets found — lip sync disabled");
      }
    }

    /* ─────────────────────────────────
       Debug info → UI panel
    ───────────────────────────────── */
    function buildDebugInfo() {
      const lines = [];
      model.traverse((child) => {
        if (!child.isMesh) return;
        const keys = child.morphTargetDictionary
          ? Object.keys(child.morphTargetDictionary) : [];
        lines.push(
          `<b style="color:#eef0f4">${child.name || "(unnamed)"}</b> `
          + `<span style="color:#5c6370">${keys.length} morph targets</span>`
          + (keys.length ? `<br><span style="color:#60d4f0;opacity:.7">${keys.join(", ")}</span>` : "")
        );
      });
      document.getElementById("debugContent").innerHTML =
        lines.length ? lines.join("<br><br>") : "No meshes found.";
    }

    /* ─────────────────────────────────
       Lip sync
    ───────────────────────────────── */
    let cueIdx           = 0;
    const activeMorphs   = {};
    const SMOOTH         = 0.25;

    function updateLipSync(t) {
      if (!headMesh) return;

      // Decay active morphs toward 0
      Object.keys(activeMorphs).forEach((i) => {
        const idx = +i;
        headMesh.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
          headMesh.morphTargetInfluences[idx], 0, SMOOTH);
        if (teethMesh !== headMesh)
          teethMesh.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
            teethMesh.morphTargetInfluences[idx], 0, SMOOTH);
        if (headMesh.morphTargetInfluences[idx] < 0.01) {
          headMesh.morphTargetInfluences[idx] = 0;
          if (teethMesh !== headMesh) teethMesh.morphTargetInfluences[idx] = 0;
          delete activeMorphs[i];
        }
      });

      // Reset cue index if audio rewound
      if (cueIdx > 0 && t < lipsync.mouthCues[cueIdx - 1].start) cueIdx = 0;

      // Advance index
      while (cueIdx < lipsync.mouthCues.length && t > lipsync.mouthCues[cueIdx].end)
        cueIdx++;

      // Apply current cue
      if (cueIdx < lipsync.mouthCues.length) {
        const cue = lipsync.mouthCues[cueIdx];
        if (t >= cue.start && t <= cue.end) {
          const viseme = corresponding[cue.value];
          if (viseme && headMesh.morphTargetDictionary[viseme] !== undefined) {
            const idx = headMesh.morphTargetDictionary[viseme];
            headMesh.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
              headMesh.morphTargetInfluences[idx], 1, SMOOTH);
            if (teethMesh !== headMesh)
              teethMesh.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
                teethMesh.morphTargetInfluences[idx], 1, SMOOTH);
            activeMorphs[idx] = true;
          }
        }
      }
    }

    function resetLipSync() {
      cueIdx = 0;
      if (!headMesh) return;
      Object.values(corresponding).forEach((v) => {
        if (headMesh.morphTargetDictionary[v] !== undefined) {
          const idx = headMesh.morphTargetDictionary[v];
          headMesh.morphTargetInfluences[idx] = 0;
          if (teethMesh !== headMesh) teethMesh.morphTargetInfluences[idx] = 0;
        }
      });
      Object.keys(activeMorphs).forEach((k) => delete activeMorphs[k]);
    }

    /* ─────────────────────────────────
       Blinking
    ───────────────────────────────── */
    const BLINK_CANDIDATES = [
      ["eyeBlinkLeft","eyeBlinkRight"],
      ["EyeBlinkLeft","EyeBlinkRight"],
      ["eye_blink_left","eye_blink_right"],
      ["blinkLeft","blinkRight"],
    ];

    function setupBlinking() {
      if (blinkInterval) return;
      blinkInterval = setInterval(() => {
        if (!headMesh?.morphTargetDictionary) return;
        const d = headMesh.morphTargetDictionary;
        const inf = headMesh.morphTargetInfluences;
        for (const [L, R] of BLINK_CANDIDATES) {
          if (d[L] !== undefined && d[R] !== undefined) {
            inf[d[L]] = inf[d[R]] = 1;
            setTimeout(() => { inf[d[L]] = inf[d[R]] = 0; }, 150);
            break;
          }
        }
      }, THREE.MathUtils.randInt(2000, 5500));
    }

    function clearBlinking() {
      if (blinkInterval) { clearInterval(blinkInterval); blinkInterval = null; }
    }

    /* ─────────────────────────────────
       Audio + lip sync loop
    ───────────────────────────────── */
    $scope.speakQuestion = function () {
      if ($scope.isSpeaking || !$scope.avatarReady) return;
      const audio = new Audio("output.ogg");
      let rafId;
      let lastSync = Date.now();
      const SYNC_MS = 1000 / 30;

      $scope.$apply(() => { $scope.isSpeaking = true; });

      audio.onplay = () => {
        const t0 = audio.currentTime;
        const loop = () => {
          if (!audio.paused && !audio.ended) rafId = requestAnimationFrame(loop);
          const now = Date.now();
          if (now - lastSync > SYNC_MS) {
            lastSync = now;
            updateLipSync(audio.currentTime - t0);
          }
        };
        loop();
      };

      const done = () => {
        cancelAnimationFrame(rafId);
        resetLipSync();
        $scope.$apply(() => { $scope.isSpeaking = false; });
      };
      audio.onended = done;
      audio.onerror = (e) => { console.error("Audio error:", e); done(); };
      audio.play().catch((e) => { console.error("play() failed:", e); done(); });
    };

    /* ─────────────────────────────────
       Scope helpers
    ───────────────────────────────── */
    $scope.reloadAvatar = function () { loadAvatar(AVATAR_URL); };

    $scope.toggleDebug = function () {
      $scope.showDebug = !$scope.showDebug;
      document.getElementById("debugPanel")
        .classList.toggle("visible", $scope.showDebug);
    };

    /* ─────────────────────────────────
       Render loop — 30 FPS cap
    ───────────────────────────────── */
    let then         = Date.now();
    const FRAME_MS   = 1000 / 30;
    let loopStarted  = false;

    function startRenderLoop() {
      if (loopStarted) return;
      loopStarted = true;
      (function loop() {
        requestAnimationFrame(loop);
        const now = Date.now(), dt = now - then;
        if (dt > FRAME_MS) {
          then = now - (dt % FRAME_MS);
          if (mixer) mixer.update(clock.getDelta());
          renderer.render(scene, camera);
        }
      })();
    }

    /* ─────────────────────────────────
       Resize — keep renderer in sync
       with the CSS-sized container
    ───────────────────────────────── */
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(container);

    /* ─────────────────────────────────
       Cleanup
    ───────────────────────────────── */
    function disposeNode(node) {
      if (!(node instanceof THREE.Mesh)) return;
      node.geometry?.dispose();
      const mats = Array.isArray(node.material) ? node.material : [node.material];
      mats.forEach((m) => m?.dispose());
    }
    function disposeHierarchy(node, cb) {
      for (let i = node.children.length - 1; i >= 0; i--)
        disposeHierarchy(node.children[i], cb);
      cb(node);
    }

    $scope.$on("$destroy", () => {
      resetLipSync();
      clearBlinking();
      resizeObserver.disconnect();
      if (model) disposeHierarchy(model, disposeNode);
      renderer.dispose();
    });

    /* ─────────────────────────────────
       Loading overlay helpers
    ───────────────────────────────── */
    function setLoading(on) {
      document.getElementById("loadingOverlay")
        .classList.toggle("hidden", !on);
    }

  });
