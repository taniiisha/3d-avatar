/**
 * app_streamoji.js
 * ─────────────────────────────────────────────────────────────
 * Three.js + AngularJS controller built specifically for
 * Streamoji GLB avatars. Key differences from the original:
 *
 *  1. Auto-fit bounding box camera — no hardcoded position/scale
 *  2. Dynamic mesh detection — finds head/teeth by scanning
 *     morph target dictionaries, NOT by hardcoded RPM names
 *  3. Debug panel — logs all mesh names + morph targets to UI
 *  4. Half-body aware framing — camera tilts down slightly
 *     to centre the face/chest
 * ─────────────────────────────────────────────────────────────
 */

angular
  .module("StreamojiApp", [])
  .controller("StreamojiController", function ($scope) {

    /* ──────────────────────────────────────────────
       State
    ────────────────────────────────────────────── */
    let model, mixer;
    const clock  = new THREE.Clock();
    const scene  = new THREE.Scene();
    let blinkingInterval = null;
    let headMesh  = null; // resolved dynamically after load
    let teethMesh = null; // resolved dynamically after load

    $scope.avatarReady = false;
    $scope.isSpeaking  = false;
    $scope.showDebug   = false;

    const AVATAR_URL = "avatar-KuJ8E7LXMmVeR5b6qsni.glb";

    /* ──────────────────────────────────────────────
       Phoneme → viseme mapping
       (unchanged from original — works for any ARKit-
        compatible rig as long as morph target names match)
    ────────────────────────────────────────────── */
    const corresponding = {
      A: "viseme_PP",  a: "viseme_PP",
      B: "viseme_kk",  b: "viseme_kk",
      C: "viseme_I",   c: "viseme_I",
      D: "viseme_AA",  d: "viseme_T",
      E: "viseme_O",   e: "viseme_O",
      F: "viseme_U",   f: "viseme_FF",
      G: "viseme_FF",  g: "viseme_kk",
      H: "viseme_TH",  h: "viseme_TH",
      I: "viseme_ee",  i: "viseme_ee",
      J: "viseme_ch",  j: "viseme_ch",
      K: "viseme_kk",  k: "viseme_kk",
      L: "viseme_L",   l: "viseme_L",
      M: "viseme_M",   m: "viseme_M",
      N: "viseme_N",   n: "viseme_N",
      O: "viseme_O",   o: "viseme_O",
      P: "viseme_O",   p: "viseme_O",
      Q: "viseme_Q",   q: "viseme_Q",
      R: "viseme_R",   r: "viseme_R",
      S: "viseme_S",   s: "viseme_S",
      T: "viseme_T",   t: "viseme_T",
      U: "viseme_U",   u: "viseme_U",
      V: "viseme_V",   v: "viseme_V",
      W: "viseme_W",   w: "viseme_W",
      X: "viseme_X",   x: "viseme_X",
      Y: "viseme_Y",   y: "viseme_Y",
      Z: "viseme_Z",   z: "viseme_Z",
      sil: "viseme_X",
      th: "viseme_TH", dh: "viseme_TH",
      ng: "viseme_nn", ch: "viseme_ch",
      sh: "viseme_SS", zh: "viseme_SS",
      aw: "viseme_AA", oy: "viseme_AA",
      er: "viseme_R",  ah: "viseme_AA",
      uh: "viseme_U",  aa: "viseme_AA",
      ae: "viseme_AA", ao: "viseme_AA",
      ay: "viseme_AA", eh: "viseme_E",
      ey: "viseme_E",  ih: "viseme_I",
      iy: "viseme_ee", ow: "viseme_O",
      uw: "viseme_U",
    };

    /* ──────────────────────────────────────────────
       Sample lipsync data (replace with your real data)
    ────────────────────────────────────────────── */
    const lipsync = {
      mouthCues: [
        { start: 0.006, end: 0.061, value: "k" },
        { start: 0.061, end: 0.102, value: "a" },
        { start: 0.102, end: 0.160, value: "t" },
        { start: 0.160, end: 0.221, value: "i" },
        { start: 0.221, end: 0.265, value: "u" },
        { start: 0.265, end: 0.329, value: "t" },
        { start: 0.329, end: 0.378, value: "i" },
        { start: 0.378, end: 0.465, value: "s" },
        { start: 0.465, end: 0.520, value: "k" },
        { start: 0.520, end: 0.588, value: "r" },
        { start: 0.588, end: 0.671, value: "a" },
        { start: 0.671, end: 0.723, value: "p" },
        { start: 0.723, end: 0.772, value: "sil" },
        { start: 0.772, end: 0.896, value: "s" },
        { start: 0.896, end: 0.938, value: "i" },
        { start: 0.938, end: 1.008, value: "t" },
        { start: 1.008, end: 1.066, value: "E" },
        { start: 1.066, end: 1.189, value: "r" },
        { start: 1.189, end: 1.262, value: "i" },
        { start: 1.262, end: 1.359, value: "o" },
        { start: 1.359, end: 1.472, value: "u" },
        { start: 1.472, end: 1.522, value: "E" },
        { start: 1.522, end: 1.588, value: "r" },
        { start: 1.588, end: 1.673, value: "i" },
        { start: 1.673, end: 1.746, value: "u" },
        { start: 1.746, end: 1.828, value: "k" },
        { start: 1.828, end: 1.900, value: "a" },
        { start: 1.900, end: 1.936, value: "t" },
        { start: 1.936, end: 2.052, value: "u" },
        { start: 2.052, end: 2.180, value: "a" },
        { start: 2.180, end: 2.302, value: "p" },
        { start: 2.302, end: 2.400, value: "sil" },
        { start: 2.400, end: 2.529, value: "a" },
        { start: 2.529, end: 2.636, value: "s" },
        { start: 2.636, end: 2.815, value: "k" },
        { start: 2.815, end: 2.945, value: "p" },
        { start: 2.945, end: 3.063, value: "t" },
        { start: 3.063, end: 3.214, value: "s" },
        { start: 3.214, end: 3.341, value: "e" },
        { start: 3.341, end: 3.494, value: "t" },
        { start: 3.494, end: 3.611, value: "e" },
        { start: 3.611, end: 3.823, value: "s" },
        { start: 3.823, end: 3.984, value: "k" },
        { start: 3.984, end: 4.125, value: "i" },
        { start: 4.125, end: 4.319, value: "t" },
        { start: 4.319, end: 4.547, value: "E" },
        { start: 4.547, end: 4.698, value: "k" },
        { start: 4.698, end: 4.828, value: "t" },
        { start: 4.828, end: 4.943, value: "i" },
        { start: 4.943, end: 5.060, value: "a" },
        { start: 5.060, end: 5.218, value: "r" },
        { start: 5.218, end: 5.388, value: "t" },
        { start: 5.388, end: 5.883, value: "sil" },
      ]
    };

    /* ──────────────────────────────────────────────
       Renderer & Camera setup
    ────────────────────────────────────────────── */
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding   = THREE.sRGBEncoding;
    renderer.toneMapping      = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type   = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("avatar-canvas").appendChild(renderer.domElement);

    /* ──────────────────────────────────────────────
       Lighting
    ────────────────────────────────────────────── */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);

    const keyLight = new THREE.DirectionalLight(0xfff4e6, 0.9);
    keyLight.position.set(1.5, 3, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width  = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;

    const fillLight = new THREE.DirectionalLight(0xa0c8ff, 0.25);
    fillLight.position.set(-2, 1, -1);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.15);
    rimLight.position.set(0, 2, -3);

    scene.add(ambientLight, keyLight, fillLight, rimLight);

    /* ──────────────────────────────────────────────
       Avatar loading
    ────────────────────────────────────────────── */
    const gltfLoader = new THREE.GLTFLoader();
    loadAvatar(AVATAR_URL);

    function loadAvatar(url) {
      $scope.avatarReady = false;
      showLoading(true);
      headMesh  = null;
      teethMesh = null;
      clearBlinking();

      if (model) {
        disposeHierarchy(model, disposeNode);
        scene.remove(model);
        model = null;
      }

      gltfLoader.load(
        url,
        onAvatarLoaded,
        undefined,
        (error) => {
          console.error("GLB load error:", error);
          showLoading(false);
          document.querySelector(".loader-text").textContent = "Failed to load avatar.";
        }
      );
    }

    function onAvatarLoaded(gltf) {
      console.log("✅ GLB loaded:", AVATAR_URL);
      model = gltf.scene;
      scene.add(model);

      /* ── 1. Auto-fit bounding box ──────────────── */
      const box    = new THREE.Box3().setFromObject(model);
      const size   = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      // Centre the model at origin
      // After this: top of model = +size.y/2, bottom = -size.y/2
      model.position.sub(center);

      // The face/head is near the TOP of the bounding box.
      // For a half-body avatar in T-pose the arms spread the X width,
      // pulling the geometric center DOWN into the torso.
      // We want to look at the face, which is at roughly +40% of half-height.
      // i.e. about 90% of the way from center to the top.
      const faceY = size.y * 0.4; // world-space Y of the face after centering

      // Camera distance: base it on the Y height we want visible
      // (show roughly top 60% of model — head + chest)
      const fovRad     = camera.fov * (Math.PI / 180);
      const visibleH   = size.y * 0.65; // how much vertical space to frame
      let   camDist    = Math.abs((visibleH / 2) / Math.tan(fovRad / 2)) * 1.6;

      // Position camera at face height, looking straight at the face
      camera.position.set(0, faceY, camDist);
      camera.lookAt(0, faceY, 0);

      camera.near = camDist / 100;
      camera.far  = camDist * 100;
      camera.updateProjectionMatrix();

      console.log("📐 Bounding box size:", size);
      console.log("📷 Camera distance:", camDist.toFixed(3));
      console.log("🎯 Looking at faceY:", faceY.toFixed(3));

      /* ── 2. Shadows & materials ────────────────── */
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow    = true;
          child.receiveShadow = true;
          if (child.material) {
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach((mat) => {
              if (mat.name && (mat.name.toLowerCase().includes("skin") || mat.name.toLowerCase().includes("head"))) {
                mat.roughness = 0.65;
                mat.metalness = 0.0;
              }
            });
          }
        }
      });

      /* ── 3. Dynamic mesh detection ─────────────── */
      // Don't rely on hardcoded RPM names ("Wolf3D_Head" etc.)
      // Instead scan all meshes for the viseme morph targets we need.
      resolveLipSyncMeshes();

      /* ── 4. Debug output ───────────────────────── */
      buildDebugInfo();

      /* ── 5. Animations ─────────────────────────── */
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });

      /* ── 6. Done ───────────────────────────────── */
      setupBlinking();
      showLoading(false);
      $scope.$apply(() => { $scope.avatarReady = true; });

      animate();
    }

    /* ──────────────────────────────────────────────
       Dynamic mesh resolver
       Scans every mesh for morph targets that contain
       "viseme_" or "eyeBlink". Picks the best candidates
       for head (most viseme targets) and teeth.
    ────────────────────────────────────────────── */
    function resolveLipSyncMeshes() {
      let bestHeadScore  = -1;
      let bestTeethScore = -1;

      model.traverse((child) => {
        if (!child.isMesh || !child.morphTargetDictionary) return;

        const keys    = Object.keys(child.morphTargetDictionary);
        const visemes = keys.filter((k) => k.startsWith("viseme_")).length;
        const name    = child.name.toLowerCase();

        // Prefer mesh explicitly named with head/face keywords
        if (visemes > 0) {
          if (
            name.includes("head") ||
            name.includes("face") ||
            name.includes("skin")
          ) {
            if (visemes > bestHeadScore) {
              bestHeadScore = visemes;
              headMesh = child;
            }
          } else if (
            name.includes("teeth") ||
            name.includes("tooth") ||
            name.includes("mouth")
          ) {
            if (visemes > bestTeethScore) {
              bestTeethScore = visemes;
              teethMesh = child;
            }
          } else if (visemes > bestHeadScore) {
            // Fallback: highest viseme count wins
            bestHeadScore = visemes;
            headMesh = child;
          }
        }
      });

      // If we found a head but no teeth, reuse head for teeth too
      // (some rigs combine them on one mesh)
      if (headMesh && !teethMesh) {
        teethMesh = headMesh;
      }

      if (headMesh) {
        console.log("✅ Head mesh resolved:", headMesh.name);
        console.log("   Morph targets:", Object.keys(headMesh.morphTargetDictionary));
      } else {
        console.warn("⚠️ No viseme morph targets found on any mesh. Lip sync disabled.");
      }

      if (teethMesh && teethMesh !== headMesh) {
        console.log("✅ Teeth mesh resolved:", teethMesh.name);
      }
    }

    /* ──────────────────────────────────────────────
       Debug info builder — writes to UI panel
    ────────────────────────────────────────────── */
    function buildDebugInfo() {
      const lines = [];
      model.traverse((child) => {
        if (child.isMesh) {
          const keys = child.morphTargetDictionary
            ? Object.keys(child.morphTargetDictionary)
            : [];
          lines.push(
            `<b>${child.name || "(unnamed)"}</b> — ${keys.length} morph targets` +
            (keys.length ? `<br>&nbsp;&nbsp;${keys.join(", ")}` : "")
          );
        }
      });
      document.getElementById("debugContent").innerHTML =
        lines.length ? lines.join("<br><br>") : "No meshes found.";
    }

    /* ──────────────────────────────────────────────
       Lip sync
    ────────────────────────────────────────────── */
    let currentCueIndex    = 0;
    const activeMorphTargets = {};
    const SMOOTH = 0.2;

    function updateLipSync(currentTime) {
      if (!headMesh) return;

      // Decay all active morph targets
      Object.keys(activeMorphTargets).forEach((idxStr) => {
        const idx = parseInt(idxStr, 10);
        headMesh.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
          headMesh.morphTargetInfluences[idx], 0, SMOOTH
        );
        if (teethMesh !== headMesh) {
          teethMesh.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
            teethMesh.morphTargetInfluences[idx], 0, SMOOTH
          );
        }
        if (headMesh.morphTargetInfluences[idx] < 0.01) {
          headMesh.morphTargetInfluences[idx] = 0;
          if (teethMesh !== headMesh) teethMesh.morphTargetInfluences[idx] = 0;
          delete activeMorphTargets[idx];
        }
      });

      // Reset cue index if audio restarted
      if (currentCueIndex > 0 &&
          currentTime < lipsync.mouthCues[currentCueIndex - 1].start) {
        currentCueIndex = 0;
      }

      // Advance to current cue
      while (
        currentCueIndex < lipsync.mouthCues.length &&
        currentTime > lipsync.mouthCues[currentCueIndex].end
      ) {
        currentCueIndex++;
      }

      // Apply active cue
      if (
        currentCueIndex < lipsync.mouthCues.length &&
        currentTime >= lipsync.mouthCues[currentCueIndex].start &&
        currentTime <= lipsync.mouthCues[currentCueIndex].end
      ) {
        const visemeName = corresponding[lipsync.mouthCues[currentCueIndex].value];
        if (visemeName && headMesh.morphTargetDictionary[visemeName] !== undefined) {
          const idx = headMesh.morphTargetDictionary[visemeName];
          headMesh.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
            headMesh.morphTargetInfluences[idx], 1, SMOOTH
          );
          if (teethMesh !== headMesh) {
            teethMesh.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
              teethMesh.morphTargetInfluences[idx], 1, SMOOTH
            );
          }
          activeMorphTargets[idx] = true;
        }
      }
    }

    function resetLipSync() {
      currentCueIndex = 0;
      if (!headMesh) return;
      Object.values(corresponding).forEach((visemeName) => {
        if (headMesh.morphTargetDictionary[visemeName] !== undefined) {
          const idx = headMesh.morphTargetDictionary[visemeName];
          headMesh.morphTargetInfluences[idx] = 0;
          if (teethMesh !== headMesh) teethMesh.morphTargetInfluences[idx] = 0;
        }
      });
      Object.keys(activeMorphTargets).forEach((k) => delete activeMorphTargets[k]);
    }

    /* ──────────────────────────────────────────────
       Blinking
    ────────────────────────────────────────────── */
    function setupBlinking() {
      if (blinkingInterval) return;
      blinkingInterval = setInterval(() => {
        if (!headMesh || !headMesh.morphTargetDictionary) return;
        const dict = headMesh.morphTargetDictionary;
        const inf  = headMesh.morphTargetInfluences;

        // Support both ARKit ("eyeBlinkLeft") and Streamoji naming variants
        const leftKey  = findKey(dict, ["eyeBlinkLeft",  "EyeBlinkLeft",  "eye_blink_left",  "blinkLeft"]);
        const rightKey = findKey(dict, ["eyeBlinkRight", "EyeBlinkRight", "eye_blink_right", "blinkRight"]);

        if (leftKey !== null && rightKey !== null) {
          inf[dict[leftKey]]  = 1;
          inf[dict[rightKey]] = 1;
          setTimeout(() => {
            inf[dict[leftKey]]  = 0;
            inf[dict[rightKey]] = 0;
          }, 150);
        }
      }, THREE.MathUtils.randInt(2000, 5000));
    }

    function clearBlinking() {
      if (blinkingInterval) {
        clearInterval(blinkingInterval);
        blinkingInterval = null;
      }
    }

    // Helper: find first matching key from a list of candidates
    function findKey(dict, candidates) {
      for (const c of candidates) {
        if (dict[c] !== undefined) return c;
      }
      return null;
    }

    /* ──────────────────────────────────────────────
       Audio playback + lip sync loop
    ────────────────────────────────────────────── */
    $scope.speakQuestion = function () {
      if ($scope.isSpeaking || !$scope.avatarReady) return;

      const audioFile = "output.ogg"; // ← swap for your audio file
      const audio = new Audio(audioFile);
      let   animFrameId;
      let   lastLipSyncTime = Date.now();
      const lipSyncInterval = 1000 / 30;

      $scope.$apply(() => { $scope.isSpeaking = true; });

      audio.onplay = function () {
        const startTime = audio.currentTime;
        function update() {
          if (!audio.paused && !audio.ended) {
            animFrameId = requestAnimationFrame(update);
          }
          const now     = Date.now();
          const elapsed = now - lastLipSyncTime;
          if (elapsed > lipSyncInterval) {
            lastLipSyncTime = now - (elapsed % lipSyncInterval);
            updateLipSync(audio.currentTime - startTime);
          }
        }
        update();
      };

      const onDone = () => {
        cancelAnimationFrame(animFrameId);
        resetLipSync();
        $scope.$apply(() => { $scope.isSpeaking = false; });
      };

      audio.onended = onDone;
      audio.onerror = (e) => {
        console.error("Audio error:", e);
        onDone();
      };

      audio.play().catch((err) => {
        console.error("Audio play() failed:", err);
        onDone();
      });
    };

    /* ──────────────────────────────────────────────
       Scope helpers
    ────────────────────────────────────────────── */
    $scope.reloadAvatar = function () {
      loadAvatar(AVATAR_URL);
    };

    $scope.toggleDebug = function () {
      $scope.showDebug = !$scope.showDebug;
      const panel = document.getElementById("debugPanel");
      panel.classList.toggle("visible", $scope.showDebug);
    };

    /* ──────────────────────────────────────────────
       Render loop — capped at 30 FPS
    ────────────────────────────────────────────── */
    let then = Date.now();
    const RENDER_INTERVAL = 1000 / 30;
    let animStarted = false;

    function animate() {
      if (!animStarted) animStarted = true;
      requestAnimationFrame(animate);

      const now     = Date.now();
      const elapsed = now - then;
      if (elapsed > RENDER_INTERVAL) {
        then = now - (elapsed % RENDER_INTERVAL);
        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);
        renderer.render(scene, camera);
      }
    }

    /* ──────────────────────────────────────────────
       Loading overlay
    ────────────────────────────────────────────── */
    function showLoading(visible) {
      const overlay = document.getElementById("loadingOverlay");
      if (visible) {
        overlay.classList.remove("hidden");
      } else {
        overlay.classList.add("hidden");
      }
    }

    /* ──────────────────────────────────────────────
       Resize handler
    ────────────────────────────────────────────── */
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    /* ──────────────────────────────────────────────
       Memory cleanup
    ────────────────────────────────────────────── */
    function disposeNode(node) {
      if (node instanceof THREE.Mesh) {
        if (node.geometry) node.geometry.dispose();
        if (node.material) {
          const mats = Array.isArray(node.material) ? node.material : [node.material];
          mats.forEach((m) => m.dispose());
        }
      }
    }

    function disposeHierarchy(node, cb) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        const child = node.children[i];
        disposeHierarchy(child, cb);
        cb(child);
      }
    }

    $scope.$on("$destroy", () => {
      resetLipSync();
      clearBlinking();
      if (model) disposeHierarchy(model, disposeNode);
      renderer.dispose();
    });

  });
