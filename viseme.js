const corresponding = {

    A: "viseme_PP", // Open jaw, wide mouth
    a: "viseme_PP",

    // B/b
    B: "viseme_kk", // Lips pressed together
    b: "viseme_PP",

    // C/c
    C: "viseme_I", // Teeth close together
    c: "viseme_I",

    // D/d
    D: "viseme_T", // Tongue touches the alveolar ridge
    d: "viseme_T",

    // E/e
    E: "viseme_ee", // Wide mouth, lips spread
    e: "viseme_ee",

    // F/f
    F: "viseme_UU", // Teeth on lower lip
    f: "viseme_UU",

    // G/g
    G: "viseme_FF", // Back of tongue against velum
    g: "viseme_FF",

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
    M: "viseme_PP", // Lips pressed together
    m: "viseme_PP",

    // N/n
    N: "viseme_T", // Tongue touches the alveolar ridge
    n: "viseme_T",

    // O/o
    O: "viseme_OO", // Rounded lips
    o: "viseme_OO",

    // P/p
    P: "viseme_PP", // Lips pressed together
    p: "viseme_PP",

    // Q/q
    Q: "viseme_PP", // Similar to P, lips pressed together
    q: "viseme_PP",

    // R/r
    R: "viseme_RR", // Tongue curled slightly back
    r: "viseme_RR",

    // S/s
    S: "viseme_S", // Teeth together, airflow through
    s: "viseme_S",

    // T/t
    T: "viseme_T", // Tongue touches the alveolar ridge
    t: "viseme_T",

    // U/u
    U: "viseme_OO", // Rounded lips
    u: "viseme_OO",

    // V/v
    V: "viseme_FF", // Teeth on lower lip
    v: "viseme_FF",

    // W/w
    W: "viseme_U", // Rounded lips
    w: "viseme_U",

    // X/x
    X: "viseme_K", // Back of tongue against velum
    x: "viseme_K",

    // Y/y
    Y: "viseme_ee", // Wide mouth, lips spread
    y: "viseme_ee",

    // Z/z
    Z: "viseme_S", // Teeth together, airflow through
    z: "viseme_S",
    p: "viseme_PP", // Voiceless bilabial plosive
    b: "viseme_PP", // Voiced bilabial plosive
    m: "viseme_M", // Bilabial nasal
    a : "viseme_AA",
    f: "viseme_U", // Voiceless labiodental fricative
    v: "viseme_V", // Voiced labiodental fricative
  
    t: "viseme_T", // Voiceless alveolar plosive
    d: "viseme_T", // Voiced alveolar plosive
    s: "viseme_S", // Voiceless alveolar fricative
    z: "viseme_S", // Voiced alveolar fricative
    th: "viseme_TH", // Voiceless dental fricative
    dh: "viseme_TH", // Voiced dental fricative
    n: "viseme_N", // Alveolar nasal
    l: "viseme_L", // Alveolar lateral approximant
  
    k: "viseme_kk", // Voiceless velar plosive
    g: "viseme_kk", // Voiced velar plosive
    ng: "viseme_nn", // Velar nasal
  
    ch: "viseme_ch", // Voiceless postalveolar affricate
    j: "viseme_ch", // Voiced postalveolar affricate
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

    d͡ʒ : "viseme_ch", // Voiced postalveolar affricate
    t͡ʃ: "viseme_ch",
    ʃ : "viseme_sh",
    ʒ : "viseme_sh",
    ð : "viseme_TH",
    Θ : "viseme_TH",
    ŋ : "viseme_k",
    ɹ : "viseme_R",
    aɪ: "viseme_aa",
    aʊ: "viseme_aa",
    ɔɪ: "viseme_aa",
    eɪ: "viseme_ee",
    oʊ: "viseme_oo",
    ə: "viseme_aw",
    ɚ : "viseme_R",
    æ: "viseme_aa",
    ɑ : "viseme_aa",
    ɛ : "viseme_ee",
    ɪ : "viseme_ee",
    ʌ : "viseme_aw",


    ð: "viseme_TH", // Voiced dental fricative
    ŋ: "viseme_nn", // Velar nasal
    ɹ: "viseme_R", // Alveolar approximant
    ʃ: "viseme_SS", // Voiceless postalveolar fricative
    t͡ʃ: "viseme_ch", // Voiceless postalveolar affricate
    Θ: "viseme_TH", // Voiceless dental fricative
    w: "viseme_W", // Labial-velar approximant
    ʒ: "viseme_SS", // Voiced postalveolar fricativ
  };




    // Viseme mapping (same as before
    const corresponding2 = {
      A: "viseme_PP",
      AE1: "viseme_AA",
      AY1: "viseme_AA",
      AH0: "viseme_I",
      AA1: "viseme_O",
      AY2: "viseme_AA",
      AO1: "viseme_O",
      AW1: "viseme_AA", 

      B: "viseme_kk",
      C: "viseme_I",

      D: "viseme_AA",
      DH: "viseme_TH",

      E: "viseme_O",
      EH1: "viseme_E", 
      EY1: "viseme_E", 
      EY2: "viseme_E",
      ER0: "viseme_RR",

      F: "viseme_U",
      G: "viseme_FF",

      H: "viseme_TH",
      HH: "viseme_TH",

      I: "viseme_ee", // Viseme for 'ee' (mouth wide)
      IH0: "viseme_I",
      IY1: "viseme_ee",
      IH1: "viseme_I",
      IH2: "viseme_I",

      J: "viseme_ch", // Viseme for 'ch' (tongue behind teeth)
      K: "viseme_kk", // Viseme for 'k' (closed lips)
      L: "viseme_L", // Viseme for 'l' (mouth slightly open)
      M: "viseme_M", // Viseme for 'm' (mouth closed)

      N: "viseme_N", // Viseme for 'n' (mouth open, tongue up)
      NG: "viseme_nn",

      O: "viseme_O", // Viseme for 'oh' (rounded lips)
      OW0: "viseme_O", 
      OW1: "viseme_O", 

      P: "viseme_PP", // Viseme for 'p' (lips pressed together)
      Q: "viseme_Q", // Viseme for 'qu' (mouth slightly open, tongue down)
      R: "viseme_R", // Viseme for 'r' (tongue curled)

      S: "viseme_S", // Viseme for 's' (teeth together)
      SH: "viseme_SS",

      T: "viseme_T", // Viseme for 't' (tongue behind teeth)

      U: "viseme_U", // Viseme for 'oo' (rounded lips)
      UW1: "viseme_U",

      V: "viseme_V", // Viseme for 'v' (teeth on lower lip)
      W: "viseme_W", // Viseme for 'w' (rounded lips)
      X: "viseme_X", // Viseme for 'x' (mouth closed, lips slightly apart)
      Y: "viseme_Y", // Viseme for 'y' (lips slightly spread)
      Z: "viseme_Z", // Viseme for 'z' (teeth together, lips spread)
    };



     // Viseme mapping (same as before
    // const corresponding = {
    //   A: "viseme_PP",
    //   AE1: "viseme_AA",
    //   AY1: "viseme_AA",
    //   AH0: "viseme_I",
    //   AA1: "viseme_O",
    //   AY2: "viseme_AA",
    //   AO1: "viseme_O",
    //   AW1: "viseme_AA", 

    //   B: "viseme_kk",
    //   C: "viseme_I",

    //   D: "viseme_AA",
    //   DH: "viseme_TH",

    //   E: "viseme_O",
    //   EH1: "viseme_E", 
    //   EY1: "viseme_E", 
    //   EY2: "viseme_E",
    //   ER0: "viseme_RR",

    //   F: "viseme_U",
    //   G: "viseme_FF",

    //   H: "viseme_TH",
    //   HH: "viseme_TH",

    //   I: "viseme_ee", // Viseme for 'ee' (mouth wide)
    //   IH0: "viseme_I",
    //   IY1: "viseme_ee",
    //   IH1: "viseme_I",
    //   IH2: "viseme_I",

    //   J: "viseme_ch", // Viseme for 'ch' (tongue behind teeth)
    //   K: "viseme_kk", // Viseme for 'k' (closed lips)
    //   L: "viseme_L", // Viseme for 'l' (mouth slightly open)
    //   M: "viseme_M", // Viseme for 'm' (mouth closed)

    //   N: "viseme_N", // Viseme for 'n' (mouth open, tongue up)
    //   NG: "viseme_nn",

    //   O: "viseme_O", // Viseme for 'oh' (rounded lips)
    //   OW0: "viseme_O", 
    //   OW1: "viseme_O", 

    //   P: "viseme_PP", // Viseme for 'p' (lips pressed together)
    //   Q: "viseme_Q", // Viseme for 'qu' (mouth slightly open, tongue down)
    //   R: "viseme_R", // Viseme for 'r' (tongue curled)

    //   S: "viseme_S", // Viseme for 's' (teeth together)
    //   SH: "viseme_SS",

    //   T: "viseme_T", // Viseme for 't' (tongue behind teeth)

    //   U: "viseme_U", // Viseme for 'oo' (rounded lips)
    //   UW1: "viseme_U",

    //   V: "viseme_V", // Viseme for 'v' (teeth on lower lip)
    //   W: "viseme_W", // Viseme for 'w' (rounded lips)
    //   X: "viseme_X", // Viseme for 'x' (mouth closed, lips slightly apart)
    //   Y: "viseme_Y", // Viseme for 'y' (lips slightly spread)
    //   Z: "viseme_Z", // Viseme for 'z' (teeth together, lips spread)
    // };

    // const corresponding = {
    //       // Consonants
    // b: "viseme_PP", // Lips pressed together
    // B: "viseme_PP",
    // d: "viseme_T", // Tongue behind teeth
    // D: "viseme_T",
    // dʒ: "viseme_S", // Teeth close together
    // ð: "viseme_T", // Tongue between teeth
    // f: "viseme_F", // Teeth on lip
    // F: "viseme_F",
    // g: "viseme_K", // Back of tongue raised
    // G: "viseme_K",
    // h: "viseme_K", // Open mouth, breathy
    // H: "viseme_K",
    // j: "viseme_I", // Lips spread, slight protrusion
    // J: "viseme_I",
    // k: "viseme_K", // Back of tongue raised
    // K: "viseme_K",
    // l: "viseme_T", // Tongue touches alveolar ridge
    // ɫ: "viseme_T",
    // m: "viseme_PP", // Lips pressed together
    // M: "viseme_PP",
    // m̩: "viseme_PP", // Syllabic bilabial nasal
    // n: "viseme_T", // Tongue touches alveolar ridge
    // n̩: "viseme_T", // Syllabic alveolar nasal
    // ŋ: "viseme_K", // Back of tongue touches soft palate
    // ŋ̩: "viseme_K", // Syllabic nasal
    // p: "viseme_PP", // Lips pressed together
    // P: "viseme_PP",
    // ɹ: "viseme_R", // Lips rounded, tongue curled
    // s: "viseme_S", // Teeth close together
    // ʃ: "viseme_S", // Teeth close, lips slightly rounded
    // t: "viseme_T", // Tongue touches alveolar ridge
    // tʃ: "viseme_S", // Teeth close, lips slightly rounded
    // θ: "viseme_T", // Tongue between teeth
    // v: "viseme_F", // Teeth on lip
    // V: "viseme_F",
    // w: "viseme_U", // Rounded lips, slight protrusion
    // z: "viseme_S", // Teeth close together
    // ʒ: "viseme_S", // Teeth close, lips slightly rounded

    // // Vowels
    // ə: "viseme_@", // Mid central vowel
    // æ: "viseme_AA", // Near-open front unrounded
    // aɪ: "viseme_AA", // Diphthong
    // aʊ: "viseme_AA", // Diphthong
    // ɑː: "viseme_AA", // Long open-back unrounded
    // eɪ: "viseme_E", // Face
    // ɛ: "viseme_E", // Open-mid front unrounded
    // eə: "viseme_E", // Diphthong
    // i: "viseme_I", // Long close front unrounded
    // ɪ: "viseme_I", // Near-close near-front
    // ɪə: "viseme_I", // Diphthong
    // ɔː: "viseme_O", // Long open-mid back rounded
    // ɔɪ: "viseme_O", // Diphthong
    // ɒ: "viseme_O", // Open back rounded
    // oʊ: "viseme_O", // Rounded lips
    // uː: "viseme_U", // Long close back rounded
    // ʊ: "viseme_U", // Near-close near-back
    // ʊə: "viseme_U", // Diphthong
    // ʌ: "viseme_E", // Open-mid back unrounded
    // ɜː: "viseme_E", // Long open-mid central unrounded
    // ɛə: "viseme_E", // Square diphthong

    // // Additional symbols
    // ".": "viseme_boundary", // Syllable boundary
    // '"': "viseme_primary_stress", // Primary stress
    // "%": "viseme_secondary_stress", // Secondary stress
    // }



  // working lipsync cues using rhubarb

     // const lipsync = {
    //   mouthCues : [
    //     {
    //         "start": 0,
    //         "end": 0.02,
    //         "value": "X"
    //     },
    //     {
    //         "start": 0.02,
    //         "end": 0.61,
    //         "value": "B"
    //     },
    //     {
    //         "start": 0.61,
    //         "end": 0.68,
    //         "value": "C"
    //     },
    //     {
    //         "start": 0.68,
    //         "end": 0.76,
    //         "value": "A"
    //     },
    //     {
    //         "start": 0.76,
    //         "end": 0.96,
    //         "value": "B"
    //     },
    //     {
    //         "start": 0.96,
    //         "end": 1.17,
    //         "value": "C"
    //     },
    //     {
    //         "start": 1.17,
    //         "end": 1.31,
    //         "value": "B"
    //     },
    //     {
    //         "start": 1.31,
    //         "end": 1.45,
    //         "value": "E"
    //     },
    //     {
    //         "start": 1.45,
    //         "end": 1.52,
    //         "value": "F"
    //     },
    //     {
    //         "start": 1.52,
    //         "end": 1.68,
    //         "value": "B"
    //     },
    //     {
    //         "start": 1.68,
    //         "end": 1.79,
    //         "value": "E"
    //     },
    //     {
    //         "start": 1.79,
    //         "end": 1.86,
    //         "value": "F"
    //     },
    //     {
    //         "start": 1.86,
    //         "end": 2,
    //         "value": "C"
    //     },
    //     {
    //         "start": 2,
    //         "end": 2.21,
    //         "value": "F"
    //     },
    //     {
    //         "start": 2.21,
    //         "end": 2.28,
    //         "value": "D"
    //     },
    //     {
    //         "start": 2.28,
    //         "end": 2.41,
    //         "value": "A"
    //     },
    //     {
    //         "start": 2.41,
    //         "end": 2.54,
    //         "value": "B"
    //     },
    //     {
    //         "start": 2.54,
    //         "end": 2.63,
    //         "value": "A"
    //     },
    //     {
    //         "start": 2.63,
    //         "end": 2.7,
    //         "value": "C"
    //     },
    //     {
    //         "start": 2.7,
    //         "end": 2.9,
    //         "value": "B"
    //     },
    //     {
    //         "start": 2.9,
    //         "end": 2.97,
    //         "value": "C"
    //     },
    //     {
    //         "start": 2.97,
    //         "end": 3.11,
    //         "value": "D"
    //     },
    //     {
    //         "start": 3.11,
    //         "end": 3.18,
    //         "value": "C"
    //     },
    //     {
    //         "start": 3.18,
    //         "end": 3.26,
    //         "value": "A"
    //     },
    //     {
    //         "start": 3.26,
    //         "end": 3.4,
    //         "value": "H"
    //     },
    //     {
    //         "start": 3.4,
    //         "end": 3.47,
    //         "value": "C"
    //     },
    //     {
    //         "start": 3.47,
    //         "end": 3.61,
    //         "value": "B"
    //     },
    //     {
    //         "start": 3.61,
    //         "end": 3.68,
    //         "value": "C"
    //     },
    //     {
    //         "start": 3.68,
    //         "end": 3.75,
    //         "value": "B"
    //     },
    //     {
    //         "start": 3.75,
    //         "end": 3.83,
    //         "value": "A"
    //     },
    //     {
    //         "start": 3.83,
    //         "end": 3.92,
    //         "value": "C"
    //     },
    //     {
    //         "start": 3.92,
    //         "end": 4.2,
    //         "value": "B"
    //     },
    //     {
    //         "start": 4.2,
    //         "end": 4.27,
    //         "value": "F"
    //     },
    //     {
    //         "start": 4.27,
    //         "end": 4.75,
    //         "value": "B"
    //     },
    //     {
    //         "start": 4.75,
    //         "end": 4.88,
    //         "value": "A"
    //     },
    //     {
    //         "start": 4.88,
    //         "end": 4.93,
    //         "value": "B"
    //     },
    //     {
    //         "start": 4.93,
    //         "end": 5.04,
    //         "value": "C"
    //     },
    //     {
    //         "start": 5.04,
    //         "end": 5.39,
    //         "value": "B"
    //     },
    //     {
    //         "start": 5.39,
    //         "end": 5.46,
    //         "value": "G"
    //     },
    //     {
    //         "start": 5.46,
    //         "end": 5.53,
    //         "value": "C"
    //     },
    //     {
    //         "start": 5.53,
    //         "end": 5.67,
    //         "value": "B"
    //     },
    //     {
    //         "start": 5.67,
    //         "end": 5.75,
    //         "value": "A"
    //     },
    //     {
    //         "start": 5.75,
    //         "end": 5.84,
    //         "value": "B"
    //     },
    //     {
    //         "start": 5.84,
    //         "end": 5.99,
    //         "value": "X"
    //     },
    //     {
    //         "start": 5.99,
    //         "end": 6.1,
    //         "value": "B"
    //     },
    //     {
    //         "start": 6.1,
    //         "end": 7.1,
    //         "value": "X"
    //     },
    //     {
    //         "start": 7.1,
    //         "end": 7.22,
    //         "value": "A"
    //     },
    //     {
    //         "start": 7.22,
    //         "end": 7.52,
    //         "value": "B"
    //     },
    //     {
    //         "start": 7.52,
    //         "end": 7.59,
    //         "value": "H"
    //     },
    //     {
    //         "start": 7.59,
    //         "end": 7.66,
    //         "value": "C"
    //     },
    //     {
    //         "start": 7.66,
    //         "end": 7.74,
    //         "value": "A"
    //     },
    //     {
    //         "start": 7.74,
    //         "end": 7.89,
    //         "value": "E"
    //     },
    //     {
    //         "start": 7.89,
    //         "end": 7.96,
    //         "value": "C"
    //     },
    //     {
    //         "start": 7.96,
    //         "end": 8.1,
    //         "value": "D"
    //     },
    //     {
    //         "start": 8.1,
    //         "end": 8.17,
    //         "value": "C"
    //     },
    //     {
    //         "start": 8.17,
    //         "end": 8.31,
    //         "value": "B"
    //     },
    //     {
    //         "start": 8.31,
    //         "end": 8.45,
    //         "value": "C"
    //     },
    //     {
    //         "start": 8.45,
    //         "end": 8.57,
    //         "value": "A"
    //     },
    //     {
    //         "start": 8.57,
    //         "end": 9.12,
    //         "value": "F"
    //     },
    //     {
    //         "start": 9.12,
    //         "end": 9.33,
    //         "value": "B"
    //     },
    //     {
    //         "start": 9.33,
    //         "end": 9.54,
    //         "value": "C"
    //     },
    //     {
    //         "start": 9.54,
    //         "end": 9.61,
    //         "value": "B"
    //     },
    //     {
    //         "start": 9.61,
    //         "end": 9.68,
    //         "value": "C"
    //     },
    //     {
    //         "start": 9.68,
    //         "end": 9.75,
    //         "value": "B"
    //     },
    //     {
    //         "start": 9.75,
    //         "end": 9.82,
    //         "value": "C"
    //     },
    //     {
    //         "start": 9.82,
    //         "end": 9.89,
    //         "value": "E"
    //     },
    //     {
    //         "start": 9.89,
    //         "end": 10.1,
    //         "value": "F"
    //     },
    //     {
    //         "start": 10.1,
    //         "end": 10.18,
    //         "value": "A"
    //     },
    //     {
    //         "start": 10.18,
    //         "end": 10.31,
    //         "value": "E"
    //     },
    //     {
    //         "start": 10.31,
    //         "end": 10.45,
    //         "value": "G"
    //     },
    //     {
    //         "start": 10.45,
    //         "end": 10.52,
    //         "value": "E"
    //     },
    //     {
    //         "start": 10.52,
    //         "end": 10.6,
    //         "value": "A"
    //     },
    //     {
    //         "start": 10.6,
    //         "end": 10.85,
    //         "value": "B"
    //     },
    //     {
    //         "start": 10.85,
    //         "end": 11.2,
    //         "value": "F"
    //     },
    //     {
    //         "start": 11.2,
    //         "end": 11.69,
    //         "value": "X"
    //     },
    //     {
    //         "start": 11.69,
    //         "end": 12.56,
    //         "value": "F"
    //     },
    //     {
    //         "start": 12.56,
    //         "end": 12.63,
    //         "value": "B"
    //     },
    //     {
    //         "start": 12.63,
    //         "end": 12.7,
    //         "value": "G"
    //     },
    //     {
    //         "start": 12.7,
    //         "end": 12.77,
    //         "value": "B"
    //     },
    //     {
    //         "start": 12.77,
    //         "end": 12.98,
    //         "value": "C"
    //     },
    //     {
    //         "start": 12.98,
    //         "end": 13.05,
    //         "value": "H"
    //     },
    //     {
    //         "start": 13.05,
    //         "end": 13.26,
    //         "value": "B"
    //     },
    //     {
    //         "start": 13.26,
    //         "end": 13.33,
    //         "value": "C"
    //     },
    //     {
    //         "start": 13.33,
    //         "end": 13.61,
    //         "value": "B"
    //     },
    //     {
    //         "start": 13.61,
    //         "end": 14.08,
    //         "value": "X"
    //     },
    //     {
    //         "start": 14.08,
    //         "end": 14.12,
    //         "value": "C"
    //     },
    //     {
    //         "start": 14.12,
    //         "end": 14.3,
    //         "value": "B"
    //     },
    //     {
    //         "start": 14.3,
    //         "end": 14.37,
    //         "value": "D"
    //     },
    //     {
    //         "start": 14.37,
    //         "end": 14.46,
    //         "value": "A"
    //     },
    //     {
    //         "start": 14.46,
    //         "end": 14.54,
    //         "value": "B"
    //     },
    //     {
    //         "start": 14.54,
    //         "end": 14.62,
    //         "value": "A"
    //     },
    //     {
    //         "start": 14.62,
    //         "end": 14.72,
    //         "value": "C"
    //     },
    //     {
    //         "start": 14.72,
    //         "end": 14.79,
    //         "value": "B"
    //     },
    //     {
    //         "start": 14.79,
    //         "end": 14.86,
    //         "value": "C"
    //     },
    //     {
    //         "start": 14.86,
    //         "end": 15.14,
    //         "value": "B"
    //     },
    //     {
    //         "start": 15.14,
    //         "end": 15.21,
    //         "value": "C"
    //     },
    //     {
    //         "start": 15.21,
    //         "end": 15.56,
    //         "value": "B"
    //     },
    //     {
    //         "start": 15.56,
    //         "end": 15.84,
    //         "value": "F"
    //     },
    //     {
    //         "start": 15.84,
    //         "end": 16,
    //         "value": "A"
    //     },
    //     {
    //         "start": 16,
    //         "end": 16.14,
    //         "value": "H"
    //     },
    //     {
    //         "start": 16.14,
    //         "end": 16.21,
    //         "value": "D"
    //     },
    //     {
    //         "start": 16.21,
    //         "end": 16.28,
    //         "value": "B"
    //     },
    //     {
    //         "start": 16.28,
    //         "end": 16.49,
    //         "value": "F"
    //     },
    //     {
    //         "start": 16.49,
    //         "end": 16.56,
    //         "value": "B"
    //     },
    //     {
    //         "start": 16.56,
    //         "end": 16.64,
    //         "value": "A"
    //     },
    //     {
    //         "start": 16.64,
    //         "end": 16.88,
    //         "value": "F"
    //     },
    //     {
    //         "start": 16.88,
    //         "end": 16.95,
    //         "value": "G"
    //     },
    //     {
    //         "start": 16.95,
    //         "end": 17.16,
    //         "value": "B"
    //     },
    //     {
    //         "start": 17.16,
    //         "end": 17.23,
    //         "value": "F"
    //     },
    //     {
    //         "start": 17.23,
    //         "end": 17.58,
    //         "value": "B"
    //     },
    //     {
    //         "start": 17.58,
    //         "end": 17.65,
    //         "value": "G"
    //     },
    //     {
    //         "start": 17.65,
    //         "end": 18.4,
    //         "value": "B"
    //     },
    //     {
    //         "start": 18.4,
    //         "end": 18.45,
    //         "value": "F"
    //     },
    //     {
    //         "start": 18.45,
    //         "end": 18.5,
    //         "value": "B"
    //     },
    //     {
    //         "start": 18.5,
    //         "end": 18.57,
    //         "value": "C"
    //     },
    //     {
    //         "start": 18.57,
    //         "end": 18.64,
    //         "value": "B"
    //     },
    //     {
    //         "start": 18.64,
    //         "end": 18.78,
    //         "value": "D"
    //     },
    //     {
    //         "start": 18.78,
    //         "end": 18.85,
    //         "value": "C"
    //     },
    //     {
    //         "start": 18.85,
    //         "end": 18.93,
    //         "value": "A"
    //     },
    //     {
    //         "start": 18.93,
    //         "end": 19.01,
    //         "value": "B"
    //     },
    //     {
    //         "start": 19.01,
    //         "end": 19.09,
    //         "value": "A"
    //     },
    //     {
    //         "start": 19.09,
    //         "end": 19.14,
    //         "value": "C"
    //     },
    //     {
    //         "start": 19.14,
    //         "end": 19.4,
    //         "value": "B"
    //     },
    //     {
    //         "start": 19.4,
    //         "end": 19.47,
    //         "value": "C"
    //     },
    //     {
    //         "start": 19.47,
    //         "end": 19.54,
    //         "value": "B"
    //     },
    //     {
    //         "start": 19.54,
    //         "end": 19.68,
    //         "value": "C"
    //     },
    //     {
    //         "start": 19.68,
    //         "end": 19.75,
    //         "value": "B"
    //     },
    //     {
    //         "start": 19.75,
    //         "end": 19.96,
    //         "value": "C"
    //     },
    //     {
    //         "start": 19.96,
    //         "end": 20.53,
    //         "value": "B"
    //     },
    //     {
    //         "start": 20.53,
    //         "end": 20.59,
    //         "value": "E"
    //     },
    //     {
    //         "start": 20.59,
    //         "end": 20.84,
    //         "value": "D"
    //     },
    //     {
    //         "start": 20.84,
    //         "end": 20.89,
    //         "value": "C"
    //     },
    //     {
    //         "start": 20.89,
    //         "end": 21.07,
    //         "value": "B"
    //     },
    //     {
    //         "start": 21.07,
    //         "end": 21.21,
    //         "value": "C"
    //     },
    //     {
    //         "start": 21.21,
    //         "end": 21.28,
    //         "value": "E"
    //     },
    //     {
    //         "start": 21.28,
    //         "end": 21.35,
    //         "value": "B"
    //     },
    //     {
    //         "start": 21.35,
    //         "end": 21.49,
    //         "value": "C"
    //     },
    //     {
    //         "start": 21.49,
    //         "end": 21.56,
    //         "value": "B"
    //     },
    //     {
    //         "start": 21.56,
    //         "end": 21.66,
    //         "value": "A"
    //     },
    //     {
    //         "start": 21.66,
    //         "end": 21.81,
    //         "value": "B"
    //     },
    //     {
    //         "start": 21.81,
    //         "end": 21.84,
    //         "value": "X"
    //     },
    //     {
    //         "start": 21.84,
    //         "end": null,
    //         "value": "X"
    //     }
    // ]
    // }