angular
  .module("InterviewBotApp", [])
  .controller("InterviewController", function ($scope) {
    let model,
      mixer,
      clock = new THREE.Clock();
    const scene = new THREE.Scene();
    let speech;
    let blinkingInterval = null;
    // let url ="brunette.glb";
    let url = "av.glb";

    const corresponding = {
      A: "viseme_PP", // Open jaw, wide mouth
      a: "viseme_PP",

      // B/b
      B: "viseme_kk", // Lips pressed together
      b: "viseme_kk",

      // C/c
      C: "viseme_I", // Teeth close together
      c: "viseme_I",

      // D/d
      D: "viseme_AA", // Tongue touches the alveolar ridge
      d: "viseme_T",

      // E/e
      E: "viseme_O", // Wide mouth, lips spread
      e: "viseme_O",

      // F/f
      F: "viseme_U", // Teeth on lower lip
      f: "viseme_FF",

      // G/g
      G: "viseme_FF", // Back of tongue against velum
      g: "viseme_kk",

      // H/h
      H: "viseme_TH", // Open mouth, gentle airflow
      h: "viseme_TH",

      // I/i
      I: "viseme_ee", // Wide mouth, lips spread
      i: "viseme_ee",

      // J/j
      J: "viseme_ch", // Tongue touches the roof of the mouth
      j: "viseme_ch",

      // K/k
      K: "viseme_kk", // Back of tongue against velum
      k: "viseme_kk",

      // L/l
      L: "viseme_L", // Tongue touches the roof of the mouth
      l: "viseme_L",

      // M/m
      M: "viseme_M", // Lips pressed together
      m: "viseme_M",

      // N/n
      N: "viseme_N", // Tongue touches the alveolar ridge
      n: "viseme_N",

      // O/o
      O: "viseme_O", // Rounded lips
      o: "viseme_O",

      // P/p
      P: "viseme_O", // Lips pressed together
      p: "viseme_O",

      // Q/q
      Q: "viseme_Q", // Similar to P, lips pressed together
      q: "viseme_Q",

      // R/r
      R: "viseme_R", // Tongue curled slightly back
      r: "viseme_R",

      // S/s
      S: "viseme_S", // Teeth together, airflow through
      s: "viseme_S",

      // T/t
      T: "viseme_T", // Tongue touches the alveolar ridge
      t: "viseme_T",

      // U/u
      U: "viseme_U", // Rounded lips
      u: "viseme_U",

      // V/v
      V: "viseme_V", // Teeth on lower lip
      v: "viseme_V",

      // W/w
      W: "viseme_W", // Rounded lips
      w: "viseme_W",

      // X/x
      X: "viseme_X", // Back of tongue against velum
      x: "viseme_X",

      // Y/y
      Y: "viseme_Y", // Wide mouth, lips spread
      y: "viseme_Y",

      sil: "viseme_X",

      // Z/z
      Z: "viseme_Z", // Teeth together, airflow through
      z: "viseme_Z",
      // p: "viseme_PP", // Voiceless bilabial plosive
      // b: "viseme_PP", // Voiced bilabial plosive
      // m: "viseme_M", // Bilabial nasal
      // a : "viseme_AA",
      // f: "viseme_U", // Voiceless labiodental fricative
      // v: "viseme_V", // Voiced labiodental fricative

      // t: "viseme_T", // Voiceless alveolar plosive
      // d: "viseme_T", // Voiced alveolar plosive
      // s: "viseme_S", // Voiceless alveolar fricative
      // z: "viseme_S", // Voiced alveolar fricative
      th: "viseme_TH", // Voiceless dental fricative
      dh: "viseme_TH", // Voiced dental fricative
      // n: "viseme_N", // Alveolar nasal
      // l: "viseme_L", // Alveolar lateral approximant

      // k: "viseme_kk", // Voiceless velar plosive
      // g: "viseme_kk", // Voiced velar plosive
      ng: "viseme_nn", // Velar nasal

      ch: "viseme_ch", // Voiceless postalveolar affricate
      // j: "viseme_ch", // Voiced postalveolar affricate
      sh: "viseme_SS", // Voiceless postalveolar fricative
      zh: "viseme_SS", // Voiced postalveolar fricative

      aw: "viseme_AA", // Rounded back vowel
      oy: "viseme_AA", // Rounded back vowel
      er: "viseme_R", // Mid central r-colored vowel
      ah: "viseme_AA", // Open central vowel
      uh: "viseme_U", // Near-close back rounded vowel

      aa: "viseme_AA", // Open back unrounded vowel
      ae: "viseme_AA", // Near-open front unrounded vowel
      ao: "viseme_AA", // Open-mid back rounded vowel
      ay: "viseme_AA", // Diphthong
      eh: "viseme_E", // Open-mid front unrounded vowel
      ey: "viseme_E", // Diphthong
      ih: "viseme_I", // Near-close front unrounded vowel
      iy: "viseme_ee", // Close front unrounded vowel
      ow: "viseme_O", // Rounded mid-back vowel
      uw: "viseme_U", // Rounded back vowel

      d͡ʒ: "viseme_ch", // Voiced postalveolar affricate
      t͡ʃ: "viseme_ch",
      ʃ: "viseme_sh",
      ʒ: "viseme_sh",
      ð: "viseme_TH",
      Θ: "viseme_TH",
      ŋ: "viseme_k",
      ɹ: "viseme_R",
      aɪ: "viseme_aa",
      aʊ: "viseme_aa",
      ɔɪ: "viseme_aa",
      eɪ: "viseme_ee",
      oʊ: "viseme_O",
      ə: "viseme_aw",
      ɚ: "viseme_R",
      æ: "viseme_aa",
      ɑ: "viseme_aa",
      ɛ: "viseme_ee",
      ɪ: "viseme_ee",
      ʌ: "viseme_aw",

      ð: "viseme_TH", // Voiced dental fricative
      ŋ: "viseme_nn", // Velar nasal
      ɹ: "viseme_R", // Alveolar approximant
      ʃ: "viseme_SS", // Voiceless postalveolar fricative
      t͡ʃ: "viseme_ch", // Voiceless postalveolar affricate
      Θ: "viseme_TH", // Voiceless dental fricative
      w: "viseme_W", // Labial-velar approximant
      ʒ: "viseme_SS", // Voiced postalveolar fricativ
    };

    const lipsync = {
      mouthCues: [
        {
          start: 0.006,
          end: 0.061,
          value: "k",
        },
        {
          start: 0.061,
          end: 0.102,
          value: "a",
        },
        {
          start: 0.102,
          end: 0.16,
          value: "t",
        },
        {
          start: 0.16,
          end: 0.221,
          value: "i",
        },
        {
          start: 0.221,
          end: 0.265,
          value: "u",
        },
        {
          start: 0.265,
          end: 0.329,
          value: "t",
        },
        {
          start: 0.329,
          end: 0.378,
          value: "i",
        },
        {
          start: 0.378,
          end: 0.465,
          value: "s",
        },
        {
          start: 0.465,
          end: 0.52,
          value: "k",
        },
        {
          start: 0.52,
          end: 0.588,
          value: "r",
        },
        {
          start: 0.588,
          end: 0.671,
          value: "a",
        },
        {
          start: 0.671,
          end: 0.723,
          value: "p",
        },
        {
          start: 0.723,
          end: 0.772,
          value: "@",
        },
        {
          start: 0.772,
          end: 0.896,
          value: "s",
        },
        {
          start: 0.896,
          end: 0.938,
          value: "i",
        },
        {
          start: 0.938,
          end: 1.008,
          value: "t",
        },
        {
          start: 1.008,
          end: 1.066,
          value: "E",
        },
        {
          start: 1.066,
          end: 1.189,
          value: "r",
        },
        {
          start: 1.189,
          end: 1.262,
          value: "i",
        },
        {
          start: 1.262,
          end: 1.359,
          value: "o",
        },
        {
          start: 1.359,
          end: 1.472,
          value: "u",
        },
        {
          start: 1.472,
          end: 1.522,
          value: "E",
        },
        {
          start: 1.522,
          end: 1.588,
          value: "r",
        },
        {
          start: 1.588,
          end: 1.673,
          value: "i",
        },
        {
          start: 1.673,
          end: 1.746,
          value: "u",
        },
        {
          start: 1.746,
          end: 1.828,
          value: "k",
        },
        {
          start: 1.828,
          end: 1.9,
          value: "a",
        },
        {
          start: 1.9,
          end: 1.936,
          value: "t",
        },
        {
          start: 1.936,
          end: 1.973,
          value: "t",
        },
        {
          start: 1.973,
          end: 2.052,
          value: "u",
        },
        {
          start: 2.052,
          end: 2.18,
          value: "a",
        },
        {
          start: 2.18,
          end: 2.241,
          value: "p",
        },
        {
          start: 2.241,
          end: 2.302,
          value: "t",
        },
        {
          start: 2.302,
          end: 2.333,
          value: "@",
        },
        {
          start: 2.333,
          end: 2.4,
          value: "p",
        },
        {
          start: 2.4,
          end: 2.529,
          value: "a",
        },
        {
          start: 2.529,
          end: 2.604,
          value: "s",
        },
        {
          start: 2.604,
          end: 2.636,
          value: "@",
        },
        {
          start: 2.636,
          end: 2.725,
          value: "k",
        },
        {
          start: 2.725,
          end: 2.771,
          value: "@",
        },
        {
          start: 2.771,
          end: 2.815,
          value: "p",
        },
        {
          start: 2.815,
          end: 2.893,
          value: "p",
        },
        {
          start: 2.893,
          end: 2.945,
          value: "t",
        },
        {
          start: 2.945,
          end: 2.994,
          value: "E",
        },
        {
          start: 2.994,
          end: 3.063,
          value: "k",
        },
        {
          start: 3.063,
          end: 3.152,
          value: "s",
        },
        {
          start: 3.152,
          end: 3.214,
          value: "t",
        },
        {
          start: 3.214,
          end: 3.341,
          value: "e",
        },
        {
          start: 3.341,
          end: 3.377,
          value: "t",
        },
        {
          start: 3.377,
          end: 3.434,
          value: "@",
        },
        {
          start: 3.434,
          end: 3.494,
          value: "p",
        },
        {
          start: 3.494,
          end: 3.611,
          value: "e",
        },
        {
          start: 3.611,
          end: 3.708,
          value: "s",
        },
        {
          start: 3.708,
          end: 3.823,
          value: "k",
        },
        {
          start: 3.823,
          end: 3.873,
          value: "u",
        },
        {
          start: 3.873,
          end: 3.91,
          value: "i",
        },
        {
          start: 3.91,
          end: 3.984,
          value: "r",
        },
        {
          start: 3.984,
          end: 4.087,
          value: "i",
        },
        {
          start: 4.087,
          end: 4.125,
          value: "i",
        },
        {
          start: 4.125,
          end: 4.173,
          value: "t",
        },
        {
          start: 4.173,
          end: 4.214,
          value: "@",
        },
        {
          start: 4.214,
          end: 4.319,
          value: "p",
        },
        {
          start: 4.319,
          end: 4.359,
          value: "r",
        },
        {
          start: 4.359,
          end: 4.397,
          value: "@",
        },
        {
          start: 4.397,
          end: 4.445,
          value: "t",
        },
        {
          start: 4.445,
          end: 4.547,
          value: "E",
        },
        {
          start: 4.547,
          end: 4.607,
          value: "k",
        },
        {
          start: 4.607,
          end: 4.698,
          value: "S",
        },
        {
          start: 4.698,
          end: 4.776,
          value: "t",
        },
        {
          start: 4.776,
          end: 4.828,
          value: "i",
        },
        {
          start: 4.828,
          end: 4.893,
          value: "t",
        },
        {
          start: 4.893,
          end: 4.943,
          value: "f",
        },
        {
          start: 4.943,
          end: 5.06,
          value: "a",
        },
        {
          start: 5.06,
          end: 5.137,
          value: "r",
        },
        {
          start: 5.137,
          end: 5.179,
          value: "@",
        },
        {
          start: 5.179,
          end: 5.218,
          value: "t",
        },
        {
          start: 5.218,
          end: 5.275,
          value: "p",
        },
        {
          start: 5.275,
          end: 5.316,
          value: "@",
        },
        {
          start: 5.316,
          end: 5.388,
          value: "t",
        },
        {
          start: 5.388,
          end: 5.489,
          value: "t",
        },
        {
          start: 5.489,
          end: 5.883,
          value: "sil",
        },
        {
          start: 5.883,
          end: 5.919,
          value: "p",
        },
        {
          start: 5.919,
          end: 5.969,
          value: "t",
        },
        {
          start: 5.969,
          end: 6.068,
          value: "i",
        },
        {
          start: 6.068,
          end: 6.155,
          value: "s",
        },
        {
          start: 6.155,
          end: 6.189,
          value: "i",
        },
        {
          start: 6.189,
          end: 6.285,
          value: "t",
        },
        {
          start: 6.285,
          end: 6.37,
          value: "a",
        },
        {
          start: 6.37,
          end: 6.434,
          value: "p",
        },
        {
          start: 6.434,
          end: 6.564,
          value: "E",
        },
        {
          start: 6.564,
          end: 6.676,
          value: "e",
        },
        {
          start: 6.676,
          end: 6.738,
          value: "t",
        },
        {
          start: 6.738,
          end: 6.803,
          value: "a",
        },
        {
          start: 6.803,
          end: 6.846,
          value: "t",
        },
        {
          start: 6.846,
          end: 6.876,
          value: "T",
        },
        {
          start: 6.876,
          end: 6.917,
          value: "@",
        },
        {
          start: 6.917,
          end: 7.027,
          value: "s",
        },
        {
          start: 7.027,
          end: 7.08,
          value: "t",
        },
        {
          start: 7.08,
          end: 7.158,
          value: "E",
        },
        {
          start: 7.158,
          end: 7.207,
          value: "p",
        },
        {
          start: 7.207,
          end: 7.283,
          value: "s",
        },
        {
          start: 7.283,
          end: 7.335,
          value: "i",
        },
        {
          start: 7.335,
          end: 7.384,
          value: "u",
        },
        {
          start: 7.384,
          end: 7.479,
          value: "t",
        },
        {
          start: 7.479,
          end: 7.534,
          value: "u",
        },
        {
          start: 7.534,
          end: 7.597,
          value: "k",
        },
        {
          start: 7.597,
          end: 7.644,
          value: "t",
        },
        {
          start: 7.644,
          end: 7.688,
          value: "u",
        },
        {
          start: 7.688,
          end: 7.743,
          value: "t",
        },
        {
          start: 7.743,
          end: 7.863,
          value: "a",
        },
        {
          start: 7.863,
          end: 7.897,
          value: "@",
        },
        {
          start: 7.897,
          end: 7.966,
          value: "k",
        },
        {
          start: 7.966,
          end: 8.054,
          value: "t",
        },
        {
          start: 8.054,
          end: 8.156,
          value: "o",
        },
        {
          start: 8.156,
          end: 8.229,
          value: "s",
        },
        {
          start: 8.229,
          end: 8.276,
          value: "T",
        },
        {
          start: 8.276,
          end: 8.319,
          value: "@",
        },
        {
          start: 8.319,
          end: 8.403,
          value: "p",
        },
        {
          start: 8.403,
          end: 8.465,
          value: "E",
        },
        {
          start: 8.465,
          end: 8.574,
          value: "f",
        },
        {
          start: 8.574,
          end: 8.643,
          value: "O",
        },
        {
          start: 8.643,
          end: 8.685,
          value: "r",
        },
        {
          start: 8.685,
          end: 8.752,
          value: "p",
        },
        {
          start: 8.752,
          end: 8.8,
          value: "@",
        },
        {
          start: 8.8,
          end: 8.869,
          value: "t",
        },
        {
          start: 8.869,
          end: 8.973,
          value: "s",
        },
        {
          start: 8.973,
          end: 9.048,
          value: "i",
        },
        {
          start: 9.048,
          end: 9.176,
          value: "S",
        },
        {
          start: 9.176,
          end: 9.378,
          value: "u",
        },
        {
          start: 9.378,
          end: 9.771,
          value: "sil",
        },
        {
          start: 9.771,
          end: 9.821,
          value: "T",
        },
        {
          start: 9.821,
          end: 9.86,
          value: "@",
        },
        {
          start: 9.86,
          end: 9.989,
          value: "t",
        },
        {
          start: 9.989,
          end: 10.126,
          value: "u",
        },
        {
          start: 10.126,
          end: 10.241,
          value: "t",
        },
        {
          start: 10.241,
          end: 10.329,
          value: "s",
        },
        {
          start: 10.329,
          end: 10.392,
          value: "i",
        },
        {
          start: 10.392,
          end: 10.438,
          value: "u",
        },
        {
          start: 10.438,
          end: 10.54,
          value: "i",
        },
        {
          start: 10.54,
          end: 10.631,
          value: "u",
        },
        {
          start: 10.631,
          end: 10.695,
          value: "s",
        },
        {
          start: 10.695,
          end: 10.738,
          value: "t",
        },
        {
          start: 10.738,
          end: 10.8,
          value: "f",
        },
        {
          start: 10.8,
          end: 10.852,
          value: "O",
        },
        {
          start: 10.852,
          end: 10.911,
          value: "r",
        },
        {
          start: 10.911,
          end: 10.951,
          value: "@",
        },
        {
          start: 10.951,
          end: 11.023,
          value: "t",
        },
        {
          start: 11.023,
          end: 11.127,
          value: "a",
        },
        {
          start: 11.127,
          end: 11.235,
          value: "t",
        },
        {
          start: 11.235,
          end: 11.27,
          value: "@",
        },
        {
          start: 11.27,
          end: 11.395,
          value: "s",
        },
        {
          start: 11.395,
          end: 11.51,
          value: "i",
        },
        {
          start: 11.51,
          end: 11.687,
          value: "s",
        },
        {
          start: 11.687,
          end: 11.881,
          value: "sil",
        },
        {
          start: 11.881,
          end: 11.927,
          value: "a",
        },
        {
          start: 11.927,
          end: 11.956,
          value: "t",
        },
        {
          start: 11.956,
          end: 11.986,
          value: "t",
        },
        {
          start: 11.986,
          end: 12.016,
          value: "T",
        },
        {
          start: 12.016,
          end: 12.104,
          value: "i",
        },
        {
          start: 12.104,
          end: 12.255,
          value: "a",
        },
        {
          start: 12.255,
          end: 12.321,
          value: "p",
        },
        {
          start: 12.321,
          end: 12.365,
          value: "t",
        },
        {
          start: 12.365,
          end: 12.394,
          value: "@",
        },
        {
          start: 12.394,
          end: 12.453,
          value: "p",
        },
        {
          start: 12.453,
          end: 12.502,
          value: "@",
        },
        {
          start: 12.502,
          end: 12.592,
          value: "s",
        },
        {
          start: 12.592,
          end: 12.704,
          value: "e",
        },
        {
          start: 12.704,
          end: 12.822,
          value: "S",
        },
        {
          start: 12.822,
          end: 12.892,
          value: "t",
        },
        {
          start: 12.892,
          end: 12.968,
          value: "t",
        },
        {
          start: 12.968,
          end: 13.045,
          value: "E",
        },
        {
          start: 13.045,
          end: 13.114,
          value: "k",
        },
        {
          start: 13.114,
          end: 13.18,
          value: "t",
        },
        {
          start: 13.18,
          end: 13.298,
          value: "i",
        },
        {
          start: 13.298,
          end: 13.36,
          value: "k",
        },
        {
          start: 13.36,
          end: 13.444,
          value: "s",
        },
        {
          start: 13.444,
          end: 13.516,
          value: "i",
        },
        {
          start: 13.516,
          end: 13.599,
          value: "u",
        },
        {
          start: 13.599,
          end: 13.644,
          value: "@",
        },
        {
          start: 13.644,
          end: 13.766,
          value: "p",
        },
        {
          start: 13.766,
          end: 13.825,
          value: "t",
        },
        {
          start: 13.825,
          end: 13.957,
          value: "a",
        },
        {
          start: 13.957,
          end: 13.997,
          value: "t",
        },
        {
          start: 13.997,
          end: 14.037,
          value: "t",
        },
        {
          start: 14.037,
          end: 14.109,
          value: "u",
        },
        {
          start: 14.109,
          end: 14.15,
          value: "i",
        },
        {
          start: 14.15,
          end: 14.216,
          value: "p",
        },
        {
          start: 14.216,
          end: 14.312,
          value: "p",
        },
        {
          start: 14.312,
          end: 14.356,
          value: "r",
        },
        {
          start: 14.356,
          end: 14.417,
          value: "u",
        },
        {
          start: 14.417,
          end: 14.481,
          value: "f",
        },
        {
          start: 14.481,
          end: 14.517,
          value: "T",
        },
        {
          start: 14.517,
          end: 14.554,
          value: "@",
        },
        {
          start: 14.554,
          end: 14.692,
          value: "k",
        },
        {
          start: 14.692,
          end: 14.737,
          value: "u",
        },
        {
          start: 14.737,
          end: 14.816,
          value: "i",
        },
        {
          start: 14.816,
          end: 14.906,
          value: "r",
        },
        {
          start: 14.906,
          end: 14.964,
          value: "i",
        },
        {
          start: 14.964,
          end: 15.053,
          value: "s",
        },
        {
          start: 15.053,
          end: 15.098,
          value: "i",
        },
        {
          start: 15.098,
          end: 15.193,
          value: "f",
        },
        {
          start: 15.193,
          end: 15.255,
          value: "i",
        },
        {
          start: 15.255,
          end: 15.37,
          value: "S",
        },
        {
          start: 15.37,
          end: 15.463,
          value: "t",
        },
        {
          start: 15.463,
          end: 15.57,
          value: "s",
        },
        {
          start: 15.57,
          end: 15.63,
          value: "i",
        },
        {
          start: 15.63,
          end: 15.697,
          value: "u",
        },
        {
          start: 15.697,
          end: 15.741,
          value: "i",
        },
        {
          start: 15.741,
          end: 15.807,
          value: "T",
        },
        {
          start: 15.807,
          end: 15.944,
          value: "a",
        },
        {
          start: 15.944,
          end: 15.99,
          value: "t",
        },
        {
          start: 15.99,
          end: 16.103,
          value: "k",
        },
        {
          start: 16.103,
          end: 16.177,
          value: "a",
        },
        {
          start: 16.177,
          end: 16.202,
          value: "p",
        },
        {
          start: 16.202,
          end: 16.274,
          value: "p",
        },
        {
          start: 16.274,
          end: 16.315,
          value: "r",
        },
        {
          start: 16.315,
          end: 16.343,
          value: "@",
        },
        {
          start: 16.343,
          end: 16.427,
          value: "p",
        },
        {
          start: 16.427,
          end: 16.549,
          value: "a",
        },
        {
          start: 16.549,
          end: 16.622,
          value: "s",
        },
        {
          start: 16.622,
          end: 16.663,
          value: "i",
        },
        {
          start: 16.663,
          end: 16.74,
          value: "k",
        },
        {
          start: 16.74,
          end: 16.803,
          value: "t",
        },
        {
          start: 16.803,
          end: 16.924,
          value: "e",
        },
        {
          start: 16.924,
          end: 16.965,
          value: "t",
        },
        {
          start: 16.965,
          end: 16.994,
          value: "@",
        },
        {
          start: 16.994,
          end: 17.05,
          value: "i",
        },
        {
          start: 17.05,
          end: 17.105,
          value: "t",
        },
        {
          start: 17.105,
          end: 17.2,
          value: "t",
        },
        {
          start: 17.2,
          end: 17.302,
          value: "E",
        },
        {
          start: 17.302,
          end: 17.38,
          value: "k",
        },
        {
          start: 17.38,
          end: 17.435,
          value: "r",
        },
        {
          start: 17.435,
          end: 17.475,
          value: "@",
        },
        {
          start: 17.475,
          end: 17.509,
          value: "t",
        },
        {
          start: 17.509,
          end: 17.576,
          value: "i",
        },
        {
          start: 17.576,
          end: 17.679,
          value: "O",
        },
        {
          start: 17.679,
          end: 17.725,
          value: "r",
        },
        {
          start: 17.725,
          end: 17.844,
          value: "k",
        },
        {
          start: 17.844,
          end: 17.946,
          value: "O",
        },
        {
          start: 17.946,
          end: 18.032,
          value: "s",
        },
        {
          start: 18.032,
          end: 18.078,
          value: "i",
        },
        {
          start: 18.078,
          end: 18.167,
          value: "k",
        },
        {
          start: 18.167,
          end: 18.229,
          value: "t",
        },
        {
          start: 18.229,
          end: 18.421,
          value: "a",
        },
        {
          start: 18.421,
          end: 18.464,
          value: "t",
        },
        {
          start: 18.464,
          end: 18.569,
          value: "t",
        },
        {
          start: 18.569,
          end: 18.746,
          value: "a",
        },
        {
          start: 18.746,
          end: 18.875,
          value: "p",
        },
        {
          start: 18.875,
          end: 18.875,
          value: "sil",
        },
      ],
    };

    console.log("Controller initialized");

    // Three.js Scene Initialization
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("3d-avatar").appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.load(
      "bg2.jpg",
      (texture) => {
        console.log("Background texture loaded successfully.");
        scene.background = texture;
      },
      undefined,
      (error) => {
        console.error("Error loading background texture:", error);
      }
    );

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(ambientLight, directionalLight);

    // GLB Model Loading
    const gltfLoader = new THREE.GLTFLoader();
    launchAvatar(url);

    function launchAvatar(url) {
      gltfLoader.load(
        url,
        (gltf) => {
          console.log("GLB model loaded.");
          model = gltf.scene;
          scene.add(model);
          model.position.set(0, -2.35, 0);
          model.scale.set(1.5, 1.5, 1.5);
          camera.position.set(0, 0, 1);

          mixer = new THREE.AnimationMixer(model);

          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
          });

          animate();
          setupBlinking();
        },
        undefined,
        (error) => {
          console.error("Error loading GLB model:", error.message || error);
        }
      );
    }

    function updateLipSync(currentTime) {
      if (!model) {
        console.warn("Model not initialized yet.");
        return;
      }

      const head = model.getObjectByName("Wolf3D_Head");
      const teeth = model.getObjectByName("Wolf3D_Teeth");

      if (!head || !teeth) {
        console.warn("Head or Teeth object not found in model.");
        return;
      }

      //   const morphTargetSmoothing = 0.19;

      const morphTargetSmoothing = 0.2;
      Object.values(corresponding).forEach((viseme) => {
        if (head.morphTargetDictionary[viseme] !== undefined) {
          const index = head.morphTargetDictionary[viseme];
          head.morphTargetInfluences[index] = THREE.MathUtils.lerp(
            head.morphTargetInfluences[index],
            0,
            morphTargetSmoothing
          );
          teeth.morphTargetInfluences[index] = THREE.MathUtils.lerp(
            teeth.morphTargetInfluences[index],
            0,
            morphTargetSmoothing
          );
        }
      });

      lipsync.mouthCues.forEach((cue) => {
        if (currentTime >= cue.start && currentTime <= cue.end) {
          const target = corresponding[cue.value];
          if (head.morphTargetDictionary[target] !== undefined) {
            //   console.log("viseme mapping : " +  cue.value + "  correspondig : " + corresponding[cue.value]);
            const index = head.morphTargetDictionary[target];
            head.morphTargetInfluences[index] = THREE.MathUtils.lerp(
              head.morphTargetInfluences[index],
              1,
              morphTargetSmoothing
            );
            teeth.morphTargetInfluences[index] = THREE.MathUtils.lerp(
              teeth.morphTargetInfluences[index],
              1,
              morphTargetSmoothing
            );
          }
        }
      });
    }

    function resetLipSync() {
      if (!model) {
        console.warn("Model not initialized yet.");
        return;
      }

      const head = model.getObjectByName("Wolf3D_Head");
      const teeth = model.getObjectByName("Wolf3D_Teeth");

      if (!head || !teeth) {
        console.warn("Head or Teeth object not found in model.");
        return;
      }

      Object.values(corresponding).forEach((viseme) => {
        if (head.morphTargetDictionary[viseme] !== undefined) {
          head.morphTargetInfluences[head.morphTargetDictionary[viseme]] = 0;
          teeth.morphTargetInfluences[teeth.morphTargetDictionary[viseme]] = 0;
        }
      });
    }

    // function for model to look like a human

    function setupBlinking() {
      if (blinkingInterval !== null) return; // Don't start a new interval if one is already running

      blinkingInterval = setInterval(() => {
        const head = model.getObjectByName("Wolf3D_Head");
        if (!head) return;

        const morphTargets = head.morphTargetDictionary;
        const influences = head.morphTargetInfluences;

        // Check if both blink morph targets exist
        if (
          morphTargets["eyeBlinkLeft"] !== undefined &&
          morphTargets["eyeBlinkRight"] !== undefined
        ) {
          const blinkLeftIndex = morphTargets["eyeBlinkLeft"];
          const blinkRightIndex = morphTargets["eyeBlinkRight"];

          // Set both eyes to blink
          influences[blinkLeftIndex] = 1;
          influences[blinkRightIndex] = 1;

          // Reset both eyes after blinking
          setTimeout(() => {
            influences[blinkLeftIndex] = 0;
            influences[blinkRightIndex] = 0;
          }, 200); // Duration of the blink
        }
      }, THREE.MathUtils.randInt(1000, 5000)); // Random interval for natural blinking
    }
    // Optionally clear the blinking interval when done (e.g., if model is removed from scene)
    function clearBlinking() {
      if (blinkingInterval !== null) {
        clearInterval(blinkingInterval);
        blinkingInterval = null;
      }
    }

    $scope.speakQuestion = function () {
      //   const audioFile = "audio2.wav"; // Path to your audio file

      const audioFile = "output.ogg";
      const audio = new Audio(audioFile);
      console.log("Playing audio:", audioFile);

      // This will keep track of the animation frame loop
      let animationFrameId;

      audio.onplay = function () {
        console.log("Audio playback started.");
        const startTime = audio.currentTime; // Track the start time of the audio

        function update() {
          const currentTime = audio.currentTime - startTime; // Calculate elapsed time since start

          // Call the lip-sync update function
          updateLipSync(currentTime);

          // If the audio is still playing, request the next frame
          if (!audio.paused && !audio.ended) {
            animationFrameId = requestAnimationFrame(update); // Recursive call to update next frame
          }
        }

        update(); // Start the update loop when audio starts playing
      };

      audio.onended = function () {
        console.log("Audio playback ended.");
        cancelAnimationFrame(animationFrameId); // Stop the animation loop
        resetLipSync();
      };

      audio.onerror = function (event) {
        console.error("Audio playback error:", event);
        cancelAnimationFrame(animationFrameId); // Stop the animation loop
        resetLipSync();
      };

      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        resetLipSync();
      });
    };

    $scope.nextQuestion = function () {
      console.log("Next question triggered.");

      $scope.speakQuestion(); // Play the audio file for the next question
    };

    $scope.changeAvatar = function (url) {
      // Remove the existing avatar from the scene if it exists
      if (model) {
        console.log("model changed");
        clearBlinking();
        scene.remove(model);
        model = null; // Clear the reference to the old avatar
      }
      clearBlinking();
      launchAvatar(url);
    };

    function animate() {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());
      renderer.render(scene, camera);
    }

    function loadGLBModel(url) {
      return new Promise((resolve, reject) => {
        gltfLoader.load(
          url,
          (gltf) => resolve(gltf),
          undefined,
          (error) => reject(error)
        );
      });
    }

    const modelUrls = [
      "brunette.glb",
      "final.glb",
      "final2.glb",
      "final3.glb",
      "final4.glb",
    ];

    function preloadModels(urls) {
      return Promise.all(urls.map(loadGLBModel));
    }

    preloadModels(modelUrls)
      .then((models) => {
        console.log("All models preloaded.", models);
        // Start rendering
        animate();
      })
      .catch((error) => {
        console.error("Error preloading models:", error.message || error);
      });

    const mixers = [];

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      mixers.forEach((mixer) => mixer.update(delta));

      renderer.render(scene, camera);
    }

    $scope.$on("$destroy", function () {
      console.log("Cleaning up resources.");
      if (speech) {
        window.speechSynthesis.cancel();
      }
      resetLipSync();
      clearBlinking();
      renderer.dispose();
    });
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  });
