var vwec1 = {
  "fileType": "Euchre Game Notation",
  "version": "1.2.1",
  "metadata": {
    "title": "VWEC Finals - Hand 1",
    "description": "First deal of the Virtual World Euchre Championship Finals. Standard order-up.",
    "players": [
      "WWMM",
      "Llama",
      "Euchrazy1",
      "LeftyKnavey"
    ],
    "initialScore": [
      0,
      0
    ],
    "ruleset": {
      "std": true,
      "canadian": false,
      "loner_lead": "LEFT_OF_LONER"
    }
  },
  "deals": [
    {
      "dealNumber": 0,
      "initialState": {
        "dealer": 2,
        "upCard": "Kc"
      },
      "phases": [
        {
          "phaseNumber": 0,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Pass",
            "Pass",
            "Pass",
            "Order"
          ],
          "isAlone": false
        },
        {
          "phaseNumber": 1,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "Ad",
              "9d",
              "Qd",
              "9c"
            ],
            [
              "Ks",
              "As",
              "Ac",
              "Js"
            ],
            [
              "Kh",
              "Qh",
              "Ah",
              "Tc"
            ],
            [
              "Kd",
              "9h",
              "Kc",
              "9s"
            ],
            [
              "Jc",
              "Qs",
              "Jd",
              "Jh"
            ]
          ]
        }
      ]
    }
  ]
};

var vwec2 = {
  "fileType": "Euchre Game Notation",
  "version": "1.2.1",
  "metadata": {
    "title": "VWEC Finals - Hand 2",
    "description": "Second deal of the VWEC Finals. All pass on Round 1, called Clubs in Round 2.",
    "players": [
      "WWMM",
      "Llama",
      "Euchrazy1",
      "LeftyKnavey"
    ],
    "initialScore": [
      0,
      0
    ],
    "ruleset": {
      "std": true,
      "canadian": false,
      "loner_lead": "LEFT_OF_LONER"
    }
  },
  "deals": [
    {
      "dealNumber": 1,
      "initialState": {
        "dealer": 3,
        "upCard": "9s"
      },
      "phases": [
        {
          "phaseNumber": 0,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Pass",
            "Pass",
            "Pass",
            "Pass",
            "c"
          ],
          "isAlone": false
        },
        {
          "phaseNumber": 1,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "Tc",
              "Kc",
              "Jc",
              "Ac"
            ],
            [
              "Qd",
              "9d",
              "Td",
              "Ad"
            ],
            [
              "Ks",
              "Qs",
              "Jh",
              "As"
            ],
            [
              "Ts",
              "9h",
              "9c",
              "Js"
            ],
            [
              "Kh",
              "Kd",
              "Th",
              "Qc"
            ]
          ]
        }
      ]
    }
  ]
};

var vwec8 = {
  "fileType": "Euchre Game Notation",
  "version": "1.2.1",
  "metadata": {
    "title": "VWEC Finals - Hand 8",
    "description": "Eighth deal of the VWEC Finals. Llama goes alone on Spades.",
    "players": [
      "WWMM",
      "Llama",
      "Euchrazy1",
      "LeftyKnavey"
    ],
    "initialScore": [
      0,
      0
    ],
    "ruleset": {
      "std": true,
      "canadian": false,
      "loner_lead": "LEFT_OF_LONER"
    }
  },
  "deals": [
    {
      "dealNumber": 7,
      "initialState": {
        "dealer": 1,
        "upCard": "Ts"
      },
      "phases": [
        {
          "phaseNumber": 0,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Pass",
            "Pass",
            "Pass",
            "Order"
          ],
          "isAlone": true
        },
        {
          "phaseNumber": 1,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "9d",
              "Qd",
              "Ts"
            ],
            [
              "Js",
              "Qs",
              "9s"
            ],
            [
              "Ah",
              "Ks",
              "Th"
            ],
            [
              "9c",
              "Qc",
              "Ac"
            ],
            [
              "Qh",
              "Tc",
              "Jh"
            ]
          ]
        }
      ]
    }
  ]
};

var meAndBears = {
  "fileType": "Euchre Game Notation",
  "version": "1.2.1",
  "metadata": {
    "title": "WWMM and Bears",
    "description": "",
    "date": "2026-06-27T04:29",
    "players": [
      "Bears",
      "Robert ed",
      "WWMM",
      "Peejyluigi"
    ],
    "initialScore": [
      0,
      0
    ],
    "ruleset": {
      "std": true,
      "canadian": false,
      "loner_lead": "LEFT_OF_DEALER"
    }
  },
  "deals": [
    {
      "dealNumber": 0,
      "initialState": {
        "dealer": 1,
        "upCard": "Js"
      },
      "phases": [
        {
          "phaseNumber": 1,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Pass",
            "Pass",
            "Pass",
            "Order"
          ],
          "isAlone": false
        },
        {
          "phaseNumber": 2,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "Ah",
              "Qh",
              "9d",
              "Th"
            ],
            [
              "Jd",
              "Ad",
              "Ks",
              "Qd"
            ],
            [
              "Qc",
              "Jc",
              "Kc",
              "Tc"
            ],
            [
              "Js",
              "Ts",
              "Ac",
              "9s"
            ],
            [
              "Kh",
              "Kd",
              "Jh",
              "As"
            ]
          ],
          "isAlone": false,
        }
      ]
    },
    {
      "dealNumber": 1,
      "initialState": {
        "dealer": 2,
        "upCard": "Jh"
      },
      "phases": [
        {
          "phaseNumber": 1,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Pass",
            "Pass",
            "Pass",
            "Order"
          ],
          "isAlone": false,
          "discard": "Qc"
        },
        {
          "phaseNumber": 2,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "Ad",
              "Qh",
              "9d",
              "Kd"
            ],
            [
              "Qs",
              "Jd",
              "9s",
              "Qd"
            ],
            [
              "Ac",
              "Th",
              "Kh",
              "9c"
            ],
            [
              "9h",
              "Tc",
              "Td",
              "Jh"
            ],
            [
              "Js",
              "Ah",
              "Kc",
              "Jc"
            ]
          ],
          "isAlone": false,
        }
      ]
    },
    {
      "dealNumber": 2,
      "initialState": {
        "dealer": 3,
        "upCard": "Ah"
      },
      "phases": [
        {
          "phaseNumber": 1,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Pass",
            "Pass",
            "Order"
          ],
          "isAlone": false
        },
        {
          "phaseNumber": 2,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "Kh",
              "Jc",
              "Jh",
              "9h"
            ],
            [
              "Jd",
              "Th",
              "Qh",
              "Td"
            ],
            [
              "As",
              "Ah",
              "Ts",
              "Qs"
            ],
            [
              "Kc",
              "Ac",
              "Qd",
              "9c"
            ],
            [
              "Tc",
              "Ks",
              "9d",
              "Qc"
            ]
          ],
          "isAlone": false,
        }
      ]
    },
    {
      "dealNumber": 3,
      "initialState": {
        "dealer": 0,
        "upCard": "Tc"
      },
      "phases": [
        {
          "phaseNumber": 1,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Pass",
            "Order"
          ],
          "isAlone": false
        },
        {
          "phaseNumber": 2,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "Ad",
              "Kd",
              "Td",
              "Tc"
            ],
            [
              "As",
              "Ts",
              "9s",
              "Qs"
            ],
            [
              "Ac",
              "9d",
              "Qc",
              "Jc"
            ],
            [
              "Kh",
              "Th",
              "Jd",
              "Qh"
            ],
            [
              "Qd",
              "Jh",
              "Ks",
              "Kc"
            ]
          ],
          "isAlone": false,
        }
      ]
    },
    {
      "dealNumber": 4,
      "initialState": {
        "dealer": 1,
        "upCard": "Qd"
      },
      "phases": [
        {
          "phaseNumber": 1,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Order"
          ],
          "isAlone": true
        },
        {
          "phaseNumber": 2,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "Jd",
              "Th",
              "9d"
            ],
            [
              "Jh",
              "Ts",
              "Qd"
            ],
            [
              "Ac",
              "Qc",
              "9s"
            ],
            [
              "Kd",
              "As",
              "Js"
            ],
            [
              "9h",
              "Ks",
              "Ah"
            ]
          ],
          "isAlone": true,
        }
      ],
      "alternativeLines": [
        {
          "branchIndex": 0,
          "phases": [
            {
              "phaseNumber": 1,
              "type": "EUCHRE_BIDDING",
              "calls": [
                "Pass",
                "Pass",
                "Pass",
                "Pass",
                "h"
              ],
              "isAlone": true
            },
            {
              "phaseNumber": 2,
              "type": "TRICK_PLAY",
              "tricks": [
                [
                  "Jh",
                  "Th",
                  "Ah"
                ],
                [
                  "Jd",
                  "Ts",
                  "9d"
                ],
                [
                  "9h",
                  "Ks",
                  "9s"
                ],
                [
                  "Ac",
                  "Qc",
                  "Js"
                ],
                [
                  "Kd",
                  "As",
                  "Td"
                ]
              ],
              "isAlone": true,
            }
          ]
        }
      ]
    },
    {
      "dealNumber": 5,
      "initialState": {
        "dealer": 2,
        "upCard": "9d"
      },
      "phases": [
        {
          "phaseNumber": 1,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Pass",
            "Pass",
            "Pass",
            "Pass",
            "h"
          ],
          "isAlone": false
        },
        {
          "phaseNumber": 2,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "Jh",
              "9h",
              "Td",
              "Ah"
            ],
            [
              "Th",
              "Tc",
              "Qs",
              "9s"
            ],
            [
              "Qd",
              "Qc",
              "Kd",
              "Ad"
            ],
            [
              "Ks",
              "Js",
              "As",
              "9c"
            ],
            [
              "Ac",
              "Kc",
              "Ts",
              "Jc"
            ]
          ],
          "isAlone": false,
        }
      ],
      "alternativeLines": [
        {
          "branchIndex": 4,
          "phases": [
            {
              "phaseNumber": 1,
              "type": "EUCHRE_BIDDING",
              "calls": [
                "Pass",
                "c"
              ],
              "isAlone": false
            },
            {
              "phaseNumber": 2,
              "type": "TRICK_PLAY",
              "tricks": [
                [
                  "Th",
                  "9h",
                  "9c",
                  "Ah"
                ],
                [
                  "Qs",
                  "Ks",
                  "Js",
                  "As"
                ],
                [
                  "Jc",
                  "Tc",
                  "Kc",
                  "9s"
                ],
                [
                  "Qd",
                  "Qc",
                  "Td",
                  "Ad"
                ],
                [
                  "Ac",
                  "Kd",
                  "Ts",
                  "Jh"
                ]
              ],
              "isAlone": false,
            }
          ]
        },
        {
          "branchIndex": 5,
          "phases": [
            {
              "phaseNumber": 1,
              "type": "TRICK_PLAY",
              "tricks": [
                [
                  "Jc",
                  "Ac",
                  "9c",
                  "9s"
                ],
                [
                  "As",
                  "Qs",
                  "Ts",
                  "Js"
                ],
                [
                  "Qc",
                  "Kc",
                  "Ah",
                  "Jh"
                ],
                [
                  "Th",
                  "9h",
                  "Td",
                  "Ks"
                ],
                [
                  "Qd",
                  "Tc",
                  "Kd",
                  "Ad"
                ]
              ],
              "isAlone": false,
            }
          ]
        }
      ]
    },
    {
      "dealNumber": 6,
      "initialState": {
        "dealer": 3,
        "upCard": "Th"
      },
      "phases": [
        {
          "phaseNumber": 1,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Order"
          ],
          "isAlone": false
        },
        {
          "phaseNumber": 2,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "Jh",
              "9h",
              "9d",
              "Th"
            ],
            [
              "Qs",
              "Ts",
              "9s",
              "Qh"
            ],
            [
              "Jd",
              "Kh",
              "Js",
              "Ks"
            ],
            [
              "Ad",
              "Ah",
              "Qd",
              "Qc"
            ],
            [
              "9c",
              "Kd",
              "Ac",
              "Td"
            ]
          ],
          "isAlone": false,
        }
      ]
    },
    {
      "dealNumber": 7,
      "initialState": {
        "dealer": 0,
        "upCard": "Ac"
      },
      "phases": [
        {
          "phaseNumber": 1,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Pass",
            "Order"
          ],
          "isAlone": false
        },
        {
          "phaseNumber": 2,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "9s",
              "Td",
              "Th",
              "Qs"
            ],
            [
              "Ah",
              "9h",
              "Qd",
              "Qh"
            ],
            [
              "Kc",
              "9d",
              "Qc",
              "Jc"
            ],
            [
              "9c",
              "Ac",
              "Ts",
              "Js"
            ],
            [
              "Ad",
              "Tc",
              "Jh",
              "Ks"
            ]
          ],
          "isAlone": false,
        }
      ],
      "alternativeLines": [
        {
          "branchIndex": 4,
          "phases": [
            {
              "phaseNumber": 1,
              "type": "TRICK_PLAY",
              "tricks": [
                [
                  "9c",
                  "Qs"
                ],
                [
                  "Th",
                  "Ah",
                  "9h",
                  "Qd"
                ],
                [
                  "Kc",
                  "9d",
                  "Qc",
                  "Jc"
                ],
                [
                  "Tc",
                  "Ac",
                  "Ts",
                  "Js"
                ],
                [
                  "Ad",
                  "Qh",
                  "Jh",
                  "Ks"
                ]
              ],
              "isAlone": false,
            }
          ]
        }
      ]
    },
    {
      "dealNumber": 8,
      "initialState": {
        "dealer": 1,
        "upCard": "9d"
      },
      "phases": [
        {
          "phaseNumber": 1,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Pass",
            "Pass",
            "Pass",
            "Order"
          ],
          "isAlone": false
        },
        {
          "phaseNumber": 2,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "9s",
              "Ks",
              "Ts",
              "As"
            ],
            [
              "9d",
              "Jd",
              "Td",
              "9h"
            ],
            [
              "Js",
              "Kd",
              "Qs",
              "Kc"
            ],
            [
              "9c",
              "Jc",
              "Ac",
              "Tc"
            ],
            [
              "Ad",
              "Kh",
              "Qc",
              "Qh"
            ]
          ],
          "isAlone": false,
        }
      ]
    },
    {
      "dealNumber": 9,
      "initialState": {
        "dealer": 2,
        "upCard": "9d"
      },
      "phases": [
        {
          "phaseNumber": 1,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Pass",
            "Pass",
            "Pass",
            "Order"
          ],
          "isAlone": false,
          "discard": "Tc"
        },
        {
          "phaseNumber": 2,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "Kh",
              "Td",
              "Jh",
              "9h"
            ],
            [
              "Kc",
              "9d",
              "Jc",
              "9c"
            ],
            [
              "Ah",
              "Ad",
              "Js",
              "Qs"
            ],
            [
              "Qc",
              "Ac",
              "Jd",
              "Qh"
            ],
            [
              "Ks",
              "Qd",
              "9s",
              "Kd"
            ]
          ],
          "isAlone": false,
        }
      ],
      "alternativeLines": [
        {
          "branchIndex": 3,
          "phases": [
            {
              "phaseNumber": 1,
              "type": "EUCHRE_BIDDING",
              "calls": [
                "Pass",
                "c"
              ],
              "isAlone": false
            },
            {
              "phaseNumber": 2,
              "type": "TRICK_PLAY",
              "tricks": [
                [
                  "Jc",
                  "9c",
                  "Kc",
                  "Tc"
                ],
                [
                  "Ad",
                  "Td",
                  "Jd",
                  "Qd"
                ],
                [
                  "Kh",
                  "Ac",
                  "Jh",
                  "9h"
                ],
                [
                  "Js",
                  "Qs",
                  "Qh",
                  "Qc"
                ],
                [
                  "Kd",
                  "Ks",
                  "Ah",
                  "9s"
                ]
              ],
              "isAlone": false,
            }
          ]
        }
      ]
    },
    {
      "dealNumber": 10,
      "initialState": {
        "dealer": 3,
        "upCard": "Qc"
      },
      "phases": [
        {
          "phaseNumber": 1,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Pass",
            "Pass",
            "Pass",
            "Order"
          ],
          "isAlone": true
        },
        {
          "phaseNumber": 2,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "Qd",
              "9d",
              "9c"
            ],
            [
              "Js",
              "Ac",
              "Kc"
            ],
            [
              "Ah",
              "9h",
              "Td"
            ],
            [
              "Qc",
              "9s",
              "Kd"
            ],
            [
              "Jh",
              "Th",
              "As"
            ]
          ],
          "isAlone": true,
        }
      ]
    },
    {
      "dealNumber": 11,
      "initialState": {
        "dealer": 0,
        "upCard": "Jd"
      },
      "phases": [
        {
          "phaseNumber": 1,
          "type": "EUCHRE_BIDDING",
          "calls": [
            "Pass",
            "Pass",
            "Pass",
            "Order"
          ],
          "isAlone": false
        },
        {
          "phaseNumber": 2,
          "type": "TRICK_PLAY",
          "tricks": [
            [
              "As",
              "9s",
              "Qs",
              "9d"
            ],
            [
              "Jd",
              "Qd",
              "Ad",
              "Td"
            ],
            [
              "Ah",
              "Kh",
              "Qh",
              "Th"
            ],
            [
              "Kd",
              "Tc",
              "9c",
              "Jh"
            ],
            [
              "Ac",
              "9h",
              "Js",
              "Kc"
            ]
          ],
          "isAlone": false,
        }
      ]
    }
  ]
};