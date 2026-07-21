/*
 * Copyright 2026 Write Words - Make Magic, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var vwec1 = {
  "fileType": "Euchre Game Notation",
  "version": "1.4",
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
  "version": "1.4",
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
  "version": "1.4",
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
  "version": "1.4",
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

var moteW5Match = {
  "fileType": "Euchre Match Notation",
  "version": "1.0",
  "metadata": {
    "title": "MotE Week 5 Match",
    "date": "2026-07-21T03:47:33.103Z",
    "players": [
      {
        "id": "p-01",
        "name": "Dad of Carl",
        "playerIds": [
          {
            "id": "p-01",
            "source": "emn-combine"
          }
        ]
      },
      {
        "id": "p-02",
        "name": "Jen-Eye",
        "playerIds": [
          {
            "id": "p-02",
            "source": "emn-combine"
          }
        ]
      },
      {
        "id": "p-03",
        "name": "Chach",
        "playerIds": [
          {
            "id": "p-03",
            "source": "emn-combine"
          }
        ]
      },
      {
        "id": "p-04",
        "name": "WWMM",
        "playerIds": [
          {
            "id": "p-04",
            "source": "emn-combine"
          }
        ]
      }
    ],
    "matchFormat": {
      "type": "FIXED_GAMES",
      "target": 6
    }
  },
  "games": [
    {
      "gameIndex": 0,
      "players": [
        "p-01",
        "p-02",
        "p-03",
        "p-04"
      ],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": {
          "title": "MotE W5 G1",
          "description": "",
          "date": "2026-07-16T22:24",
          "players": [
            "Dad of Carl",
            "Jen-Eye",
            "Chach",
            "WWMM"
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
              "dealer": 0,
              "upCard": "Kh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "As",
                    "Ts",
                    "Jd",
                    "Ks"
                  ],
                  [
                    "Ad",
                    "Ah",
                    "9c",
                    "9d"
                  ],
                  [
                    "9h",
                    "Jc",
                    "Jh",
                    "Td"
                  ],
                  [
                    "Js",
                    "Qd",
                    "Kh",
                    "Qs"
                  ],
                  [
                    "Th",
                    "Ac",
                    "Qh",
                    "Qc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 1,
            "initialState": {
              "dealer": 1,
              "upCard": "Ac",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "s"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "As",
                    "Js",
                    "Ks",
                    "Td"
                  ],
                  [
                    "Ts",
                    "9c",
                    "Th",
                    "Jc"
                  ],
                  [
                    "9h",
                    "Ah",
                    "Tc",
                    "Kh"
                  ],
                  [
                    "Kd",
                    "Ad",
                    "Jd",
                    "Qh"
                  ],
                  [
                    "Qd",
                    "Qc",
                    "9s",
                    "Qs"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 2,
            "initialState": {
              "dealer": 2,
              "upCard": "Qc",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": false,
                "discard": "Qs"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ah",
                    "Jh",
                    "Th",
                    "9c"
                  ],
                  [
                    "Tc",
                    "Ac",
                    "Jd",
                    "Js"
                  ],
                  [
                    "Qd",
                    "Qc",
                    "Kd",
                    "Ts"
                  ],
                  [
                    "Ks",
                    "9h",
                    "As",
                    "9d"
                  ],
                  [
                    "Kh",
                    "Td",
                    "Kc",
                    "Qh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 3,
            "initialState": {
              "dealer": 3,
              "upCard": "Td",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "Pass",
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "Qh",
                    "9h",
                    "Tc"
                  ],
                  [
                    "9c",
                    "Kh",
                    "Kc",
                    "Jc"
                  ],
                  [
                    "Ad",
                    "Ac",
                    "Kd",
                    "9d"
                  ],
                  [
                    "Ks",
                    "As",
                    "Js",
                    "Ts"
                  ],
                  [
                    "Jh",
                    "Qs",
                    "Qc",
                    "9s"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 4,
            "initialState": {
              "dealer": 0,
              "upCard": "Td",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "Pass",
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9h",
                    "Jd",
                    "Kh",
                    "Th"
                  ],
                  [
                    "As",
                    "Qs",
                    "Js",
                    "Ts"
                  ],
                  [
                    "9s",
                    "Ah",
                    "Qd",
                    "Ks"
                  ],
                  [
                    "Ac",
                    "9c",
                    "Ad",
                    "Tc"
                  ],
                  [
                    "9d",
                    "Jc",
                    "Qh",
                    "Kc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 5,
            "initialState": {
              "dealer": 1,
              "upCard": "Th",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "Jd",
                    "Qh",
                    "9h"
                  ],
                  [
                    "Jc",
                    "Tc",
                    "9c",
                    "Kc"
                  ],
                  [
                    "Ac",
                    "Ah",
                    "9s",
                    "Ts"
                  ],
                  [
                    "Kh",
                    "Qd",
                    "Ad",
                    "Th"
                  ],
                  [
                    "9d",
                    "Kd",
                    "As",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 6,
            "initialState": {
              "dealer": 2,
              "upCard": "9s",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": false,
                "discard": "9c"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Qd",
                    "Ad",
                    "Th",
                    "Jd"
                  ],
                  [
                    "Ks",
                    "Jh",
                    "Jc",
                    "Qs"
                  ],
                  [
                    "Js",
                    "As",
                    "9h",
                    "Qc"
                  ],
                  [
                    "Ts",
                    "Kd",
                    "Td",
                    "Qh"
                  ],
                  [
                    "9s",
                    "Kh",
                    "Tc",
                    "Ac"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 7,
            "initialState": {
              "dealer": 3,
              "upCard": "Ks",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Js",
                    "Qs",
                    "Jh",
                    "Ks"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "Qh",
                    "Ts"
                  ],
                  [
                    "Jc",
                    "9s",
                    "Td",
                    "9d"
                  ],
                  [
                    "9c",
                    "As",
                    "Tc",
                    "Ac"
                  ],
                  [
                    "Jd",
                    "Kd",
                    "Ad",
                    "Qd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 8,
            "initialState": {
              "dealer": 0,
              "upCard": "Ah",
              "playerCards": [
                [],
                [],
                [
                  "Kh",
                  "As",
                  "Js",
                  "Ts",
                  "9c"
                ],
                []
              ]
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
                    "Ac",
                    "Jc",
                    "Jh"
                  ],
                  [
                    "Ah",
                    "Td",
                    "Qh"
                  ],
                  [
                    "Jd",
                    "Qd",
                    "Th"
                  ],
                  [
                    "Kd",
                    "9s",
                    "9d"
                  ],
                  [
                    "Ad",
                    "Ks",
                    "9h"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 9,
            "initialState": {
              "dealer": 1,
              "upCard": "Jd",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9h",
                    "Ah",
                    "Qh",
                    "Th"
                  ],
                  [
                    "Td",
                    "Kd",
                    "9d",
                    "Ad"
                  ],
                  [
                    "As",
                    "Ts",
                    "Js",
                    "Tc"
                  ],
                  [
                    "Jc",
                    "9c",
                    "Kc",
                    "Ac"
                  ],
                  [
                    "Qc",
                    "Kh",
                    "Qs",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 10,
            "initialState": {
              "dealer": 2,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Pass",
                  "Order"
                ],
                "isAlone": false,
                "discard": "Kh"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "Td",
                    "Qd",
                    "9d"
                  ],
                  [
                    "Qh",
                    "Ah",
                    "Jd",
                    "9c"
                  ],
                  [
                    "Kc",
                    "Ac",
                    "9h",
                    "Qc"
                  ],
                  [
                    "As",
                    "Qs",
                    "9s",
                    "Ts"
                  ],
                  [
                    "Jc",
                    "Th",
                    "Ad",
                    "Js"
                  ]
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "gameIndex": 1,
      "players": [
        "p-01",
        "p-02",
        "p-03",
        "p-04"
      ],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": {
          "title": "MotE W5 G2",
          "description": "",
          "date": "2026-07-16T22:48",
          "players": [
            "Dad of Carl",
            "Jen-Eye",
            "Chach",
            "WWMM"
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
              "upCard": "Jd",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "s"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Qh",
                    "Th",
                    "Ah",
                    "Jh"
                  ],
                  [
                    "9h",
                    "Kh",
                    "Td",
                    "Tc"
                  ],
                  [
                    "9s",
                    "Js",
                    "Qs",
                    "Jc"
                  ],
                  [
                    "Qd",
                    "Ad",
                    "Ac",
                    "9c"
                  ],
                  [
                    "Ks",
                    "As",
                    "Qc",
                    "Kd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 1,
            "initialState": {
              "dealer": 2,
              "upCard": "Qs",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "d"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "Ad",
                    "Jc",
                    "9d"
                  ],
                  [
                    "Kh",
                    "Ah",
                    "9h",
                    "Qh"
                  ],
                  [
                    "Th",
                    "9s",
                    "Qd",
                    "Kd"
                  ],
                  [
                    "Js",
                    "Ks",
                    "Qc",
                    "Ts"
                  ],
                  [
                    "Tc",
                    "Ac",
                    "Kc",
                    "Td"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 2,
            "initialState": {
              "dealer": 3,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "As",
                    "Js",
                    "9d"
                  ],
                  [
                    "Jd",
                    "Td",
                    "Kd"
                  ],
                  [
                    "Kh",
                    "Qh",
                    "9h"
                  ],
                  [
                    "Qd",
                    "Jh",
                    "Jc"
                  ],
                  [
                    "Ac",
                    "Kc",
                    "Ah"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 3,
            "initialState": {
              "dealer": 0,
              "upCard": "Td",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "s"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Kd",
                    "Ad",
                    "Qd",
                    "Jd"
                  ],
                  [
                    "Qs",
                    "Tc",
                    "Jc",
                    "9s"
                  ],
                  [
                    "Th",
                    "Qh",
                    "Ah",
                    "Jh"
                  ],
                  [
                    "Qc",
                    "Ac",
                    "Ks",
                    "9c"
                  ],
                  [
                    "Ts",
                    "9h",
                    "As",
                    "Kc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 4,
            "initialState": {
              "dealer": 1,
              "upCard": "Ts",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ad",
                    "Jd",
                    "9d",
                    "9c"
                  ],
                  [
                    "Qs",
                    "9s",
                    "Ac",
                    "Ks"
                  ],
                  [
                    "Kh",
                    "Qc",
                    "Jh",
                    "9h"
                  ],
                  [
                    "As",
                    "Kc",
                    "Td",
                    "Js"
                  ],
                  [
                    "Jc",
                    "Qd",
                    "Qh",
                    "Th"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 5,
            "initialState": {
              "dealer": 2,
              "upCard": "9s",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Pass",
                  "Order"
                ],
                "isAlone": false,
                "discard": "Jh"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ac",
                    "Jc",
                    "9d",
                    "Kc"
                  ],
                  [
                    "Td",
                    "Ts",
                    "Qd",
                    "Kd"
                  ],
                  [
                    "Th",
                    "As",
                    "Kh",
                    "Qh"
                  ],
                  [
                    "Qc",
                    "9c",
                    "Ah",
                    "Qs"
                  ],
                  [
                    "9h",
                    "9s",
                    "Ad",
                    "Js"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 6,
            "initialState": {
              "dealer": 3,
              "upCard": "Jd",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ac",
                    "9c",
                    "Tc",
                    "Qc"
                  ],
                  [
                    "Jc",
                    "Kc",
                    "Qd",
                    "Jh"
                  ],
                  [
                    "Jd",
                    "As",
                    "Ad",
                    "Td"
                  ],
                  [
                    "Th",
                    "Ks",
                    "9s",
                    "Kh"
                  ],
                  [
                    "Ah",
                    "9d",
                    "Qs",
                    "Ts"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 7,
            "initialState": {
              "dealer": 0,
              "upCard": "Ts",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ah",
                    "Th",
                    "Kc",
                    "Qh"
                  ],
                  [
                    "Ad",
                    "Tc",
                    "9d",
                    "Jd"
                  ],
                  [
                    "Qc",
                    "Ac",
                    "As",
                    "Js"
                  ],
                  [
                    "Qs",
                    "Jc",
                    "Jh",
                    "Ks"
                  ],
                  [
                    "Td",
                    "Kh",
                    "Kd",
                    "Ts"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 8,
            "initialState": {
              "dealer": 1,
              "upCard": "Js",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Ah",
                    "Jh",
                    "Th",
                    "Qh"
                  ],
                  [
                    "Ad",
                    "Td",
                    "Kd",
                    "Js"
                  ],
                  [
                    "Qc",
                    "Qs",
                    "As",
                    "Ac"
                  ],
                  [
                    "Ts",
                    "Ks",
                    "9c",
                    "9s"
                  ],
                  [
                    "Kc",
                    "Tc",
                    "9d",
                    "Kh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 9,
            "initialState": {
              "dealer": 2,
              "upCard": "Js",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": true,
                "discard": "Td"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "Kd",
                    "Qs"
                  ],
                  [
                    "Js",
                    "9c",
                    "Ad"
                  ],
                  [
                    "Jc",
                    "Qd",
                    "Kh"
                  ],
                  [
                    "Ah",
                    "Th",
                    "Qc"
                  ],
                  [
                    "Kc",
                    "Qh",
                    "Ac"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 10,
            "initialState": {
              "dealer": 3,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Qd",
                    "Jh",
                    "9s",
                    "9d"
                  ],
                  [
                    "Jd",
                    "9h",
                    "Kd",
                    "9c"
                  ],
                  [
                    "As",
                    "Ts",
                    "Th",
                    "Jc"
                  ],
                  [
                    "Tc",
                    "Kc",
                    "Ac",
                    "Ah"
                  ],
                  [
                    "Qh",
                    "Kh",
                    "Td",
                    "Qs"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 11,
            "initialState": {
              "dealer": 0,
              "upCard": "Jd",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Kc",
                    "Jc",
                    "Ac",
                    "Jd"
                  ],
                  [
                    "Jh",
                    "9d",
                    "9h",
                    "Td"
                  ],
                  [
                    "As",
                    "Ad",
                    "Js",
                    "9c"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "Qd",
                    "9s"
                  ],
                  [
                    "Tc",
                    "Qs",
                    "Th",
                    "Ks"
                  ]
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "gameIndex": 2,
      "players": [
        "p-02",
        "p-01",
        "p-03",
        "p-04"
      ],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": {
          "title": "MotE W5 G3",
          "description": "",
          "date": "2026-07-16T22:59",
          "players": [
            "Jen-Eye",
            "Dad of Carl",
            "Chach",
            "WWMM"
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
              "dealer": 0,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "Ah",
                    "9h",
                    "Th"
                  ],
                  [
                    "As",
                    "9s",
                    "Qs",
                    "Kh"
                  ],
                  [
                    "Td",
                    "Kd",
                    "Ad",
                    "Qd"
                  ],
                  [
                    "Ac",
                    "Tc",
                    "Jc",
                    "9c"
                  ],
                  [
                    "Js",
                    "Ks",
                    "Kc",
                    "Ts"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 1,
            "initialState": {
              "dealer": 1,
              "upCard": "Jh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Jc",
                    "9c",
                    "Ac"
                  ],
                  [
                    "Jh",
                    "Th",
                    "Kh"
                  ],
                  [
                    "Qh",
                    "Jd",
                    "Ah"
                  ],
                  [
                    "Kc",
                    "Js",
                    "Tc"
                  ],
                  [
                    "Ad",
                    "Qs",
                    "9h"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 2,
            "initialState": {
              "dealer": 2,
              "upCard": "Ks",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "9c",
                    "Tc",
                    "Kc",
                    "Ac"
                  ],
                  [
                    "Td",
                    "Qd",
                    "9d",
                    "Kd"
                  ],
                  [
                    "9s",
                    "Ts",
                    "Qs",
                    "Qc"
                  ],
                  [
                    "Jh",
                    "9h",
                    "Th",
                    "Kh"
                  ],
                  [
                    "Ad",
                    "Js",
                    "Qh",
                    "Jd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 3,
            "initialState": {
              "dealer": 3,
              "upCard": "Ad",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ts",
                    "Td",
                    "Ks",
                    "As"
                  ],
                  [
                    "Js",
                    "Jc",
                    "Ac",
                    "9s"
                  ],
                  [
                    "Kd",
                    "9h",
                    "9d",
                    "Tc"
                  ],
                  [
                    "Qs",
                    "Qd",
                    "Qc",
                    "Jd"
                  ],
                  [
                    "Kc",
                    "Ah",
                    "Kh",
                    "Qh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 4,
            "initialState": {
              "dealer": 0,
              "upCard": "Ah",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "d"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9d",
                    "Ad",
                    "Jd",
                    "Ts"
                  ],
                  [
                    "Qh",
                    "Kh",
                    "Td",
                    "Th"
                  ],
                  [
                    "Kc",
                    "Tc",
                    "9c",
                    "9h"
                  ],
                  [
                    "Jh",
                    "Qd",
                    "Kd",
                    "Js"
                  ],
                  [
                    "Qs",
                    "Qc",
                    "Jc",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 5,
            "initialState": {
              "dealer": 1,
              "upCard": "Qs",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Qh",
                    "9h",
                    "Th",
                    "Ah"
                  ],
                  [
                    "Tc",
                    "Kc",
                    "Jc",
                    "Qc"
                  ],
                  [
                    "As",
                    "Ts",
                    "9s",
                    "Ks"
                  ],
                  [
                    "9d",
                    "Ad",
                    "Td",
                    "Jd"
                  ],
                  [
                    "Ac",
                    "Kd",
                    "Qd",
                    "9c"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 6,
            "initialState": {
              "dealer": 2,
              "upCard": "9c",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": false,
                "discard": "9h"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ah",
                    "Th",
                    "Jh",
                    "9c"
                  ],
                  [
                    "9d",
                    "Ad",
                    "Js",
                    "Qd"
                  ],
                  [
                    "As",
                    "Ks",
                    "Jd",
                    "9s"
                  ],
                  [
                    "Ts",
                    "Kc",
                    "Ac",
                    "Kh"
                  ],
                  [
                    "Qc",
                    "Tc",
                    "Qh",
                    "Jc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 7,
            "initialState": {
              "dealer": 3,
              "upCard": "Ac",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Th",
                    "Jh",
                    "Ah",
                    "Ac"
                  ],
                  [
                    "Ad",
                    "Td",
                    "Qd",
                    "Kc"
                  ],
                  [
                    "Ks",
                    "As",
                    "9c",
                    "9s"
                  ],
                  [
                    "Kd",
                    "Qc",
                    "Js",
                    "Jd"
                  ],
                  [
                    "Qh",
                    "Ts",
                    "Tc",
                    "Jc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 8,
            "initialState": {
              "dealer": 0,
              "upCard": "Ad",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Kh",
                    "Jd",
                    "9h",
                    "Qh"
                  ],
                  [
                    "Ts",
                    "9s",
                    "Qd",
                    "Qs"
                  ],
                  [
                    "Jh",
                    "9d",
                    "9c",
                    "Kd"
                  ],
                  [
                    "Ad",
                    "Jc",
                    "Tc",
                    "Qc"
                  ],
                  [
                    "Td",
                    "Ks",
                    "Js",
                    "Ac"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 9,
            "initialState": {
              "dealer": 1,
              "upCard": "Qh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9c",
                    "Qc",
                    "Jc",
                    "Ac"
                  ],
                  [
                    "Tc",
                    "Kh",
                    "Ah",
                    "Jh"
                  ],
                  [
                    "9h",
                    "Jd",
                    "9d",
                    "Ts"
                  ],
                  [
                    "As",
                    "Qs",
                    "Td",
                    "9s"
                  ],
                  [
                    "Qh",
                    "Ks",
                    "Ad",
                    "Js"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 10,
            "initialState": {
              "dealer": 2,
              "upCard": "Ks",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": false,
                "discard": "9d"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Tc",
                    "9c",
                    "Jc",
                    "Js"
                  ],
                  [
                    "Ah",
                    "Qh",
                    "Th",
                    "Kh"
                  ],
                  [
                    "9h",
                    "Td",
                    "9s",
                    "As"
                  ],
                  [
                    "Ad",
                    "Qs",
                    "Jd",
                    "Qd"
                  ],
                  [
                    "Ks",
                    "Kc",
                    "Ts",
                    "Kd"
                  ]
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "gameIndex": 3,
      "players": [
        "p-02",
        "p-01",
        "p-03",
        "p-04"
      ],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": {
          "title": "MotE W5 G4",
          "description": "",
          "date": "2026-07-16T23:23",
          "players": [
            "Jen-Eye",
            "Dad of Carl",
            "Chach",
            "WWMM"
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
              "dealer": 3,
              "upCard": "Qh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ad",
                    "9c",
                    "Qd",
                    "Td"
                  ],
                  [
                    "9h",
                    "Ah",
                    "Tc",
                    "Jh"
                  ],
                  [
                    "Ts",
                    "9s",
                    "Kc",
                    "As"
                  ],
                  [
                    "Jc",
                    "Ac",
                    "Jd",
                    "Js"
                  ],
                  [
                    "Th",
                    "Kd",
                    "Qs",
                    "Kh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 1,
            "initialState": {
              "dealer": 0,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "h"
                ],
                "isAlone": true
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "9s",
                    "Kh"
                  ],
                  [
                    "Jd",
                    "Qs",
                    "Jc"
                  ],
                  [
                    "As",
                    "Ks",
                    "Qc"
                  ],
                  [
                    "Qh",
                    "Qd",
                    "Ac"
                  ],
                  [
                    "9c",
                    "Kc",
                    "Kd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 2,
            "initialState": {
              "dealer": 1,
              "upCard": "Ah",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Tc",
                    "9c",
                    "9d",
                    "Ac"
                  ],
                  [
                    "Kh",
                    "9h",
                    "Js",
                    "Jh"
                  ],
                  [
                    "Ts",
                    "As",
                    "9s",
                    "Jc"
                  ],
                  [
                    "Ah",
                    "Kd",
                    "Kc",
                    "Td"
                  ],
                  [
                    "Th",
                    "Ks",
                    "Ad",
                    "Qd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 3,
            "initialState": {
              "dealer": 2,
              "upCard": "Qc",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": true,
                "discard": "Qd"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "Ah",
                    "Tc"
                  ],
                  [
                    "Jc",
                    "9c",
                    "Ts"
                  ],
                  [
                    "Js",
                    "9h",
                    "Qs"
                  ],
                  [
                    "Kc",
                    "Qh",
                    "Ad"
                  ],
                  [
                    "Qc",
                    "Jd",
                    "Kd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 4,
            "initialState": {
              "dealer": 3,
              "upCard": "As",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ad",
                    "Td",
                    "Kd",
                    "9d"
                  ],
                  [
                    "Jc",
                    "Ac",
                    "9c",
                    "Tc"
                  ],
                  [
                    "Qs",
                    "Js",
                    "9s",
                    "Ks"
                  ],
                  [
                    "Ts",
                    "Ah",
                    "Qc",
                    "Qh"
                  ],
                  [
                    "Jh",
                    "Kc",
                    "Kh",
                    "9h"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 5,
            "initialState": {
              "dealer": 0,
              "upCard": "Jh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "d"
                ],
                "isAlone": true
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "9d",
                    "Qd"
                  ],
                  [
                    "As",
                    "9s",
                    "Qs"
                  ],
                  [
                    "Ah",
                    "9c",
                    "9h"
                  ],
                  [
                    "Td",
                    "Ts",
                    "Ks"
                  ],
                  [
                    "Tc",
                    "Qc",
                    "Ac"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 6,
            "initialState": {
              "dealer": 1,
              "upCard": "Ad",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "9s",
                    "As",
                    "Ts",
                    "Js"
                  ],
                  [
                    "9c",
                    "Tc",
                    "Ad",
                    "Th"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "Jc",
                    "Kd"
                  ],
                  [
                    "Jh",
                    "9d",
                    "Qd",
                    "Jd"
                  ],
                  [
                    "Td",
                    "Qs",
                    "Qh",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 7,
            "initialState": {
              "dealer": 2,
              "upCard": "Tc",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Pass",
                  "Pass",
                  "Order"
                ],
                "isAlone": false,
                "discard": "Jh"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Qh",
                    "Kh",
                    "Th",
                    "Ah"
                  ],
                  [
                    "Ad",
                    "Td",
                    "9d",
                    "As"
                  ],
                  [
                    "Qd",
                    "Kd",
                    "Qc",
                    "Jc"
                  ],
                  [
                    "Ac",
                    "Tc",
                    "Jd",
                    "9s"
                  ],
                  [
                    "Js",
                    "Kc",
                    "Ks",
                    "Ts"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 8,
            "initialState": {
              "dealer": 3,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Jh",
                    "Ts",
                    "Td",
                    "9d"
                  ],
                  [
                    "Qs",
                    "9h",
                    "As",
                    "Js"
                  ],
                  [
                    "Jd",
                    "Tc",
                    "9c",
                    "Th"
                  ],
                  [
                    "Kd",
                    "Qc",
                    "Kc",
                    "Qh"
                  ],
                  [
                    "Ks",
                    "Ah",
                    "Ac",
                    "Kh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 9,
            "initialState": {
              "dealer": 0,
              "upCard": "Td",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "h"
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
                    "Ac",
                    "Jc"
                  ],
                  [
                    "Qd",
                    "Th",
                    "Ah",
                    "9d"
                  ],
                  [
                    "Jh",
                    "9h",
                    "9c",
                    "Qh"
                  ],
                  [
                    "Qc",
                    "Kh",
                    "Ts",
                    "Js"
                  ],
                  [
                    "Ad",
                    "Ks",
                    "Qs",
                    "9s"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 10,
            "initialState": {
              "dealer": 1,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "9c",
                    "Ac",
                    "Tc",
                    "Qc"
                  ],
                  [
                    "Td",
                    "Kd",
                    "Ad",
                    "Jd"
                  ],
                  [
                    "Ah",
                    "9s",
                    "Kh",
                    "9d"
                  ],
                  [
                    "As",
                    "Js",
                    "Qs",
                    "Ts"
                  ],
                  [
                    "Kc",
                    "Qd",
                    "Ks",
                    "Jh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 11,
            "initialState": {
              "dealer": 2,
              "upCard": "Js",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false,
                "discard": "Ac"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Qs",
                    "9d",
                    "9s",
                    "Ks"
                  ],
                  [
                    "Js",
                    "Tc",
                    "9c",
                    "9h"
                  ],
                  [
                    "As",
                    "Ah",
                    "Th",
                    "Qd"
                  ],
                  [
                    "Ad",
                    "Kd",
                    "Td",
                    "Kc"
                  ],
                  [
                    "Jd",
                    "Kh",
                    "Qh",
                    "Qc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 12,
            "initialState": {
              "dealer": 3,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ad",
                    "Qc",
                    "Td",
                    "Jd"
                  ],
                  [
                    "Kc",
                    "9c",
                    "Js",
                    "9s"
                  ],
                  [
                    "Qs",
                    "Ks",
                    "As",
                    "Ts"
                  ],
                  [
                    "Ac",
                    "Th",
                    "Tc",
                    "Qh"
                  ],
                  [
                    "Kh",
                    "Qd",
                    "9h",
                    "Ah"
                  ]
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "gameIndex": 4,
      "players": [
        "p-04",
        "p-01",
        "p-03",
        "p-02"
      ],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": {
          "title": "MotE W5 G5",
          "description": "",
          "date": "2026-07-17T00:04",
          "players": [
            "WWMM",
            "Dad of Carl",
            "Chach",
            "Jen-Eye"
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
              "dealer": 3,
              "upCard": "Js",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "Kh",
                    "Th",
                    "Qh"
                  ],
                  [
                    "Jd",
                    "Td",
                    "9c",
                    "Ah"
                  ],
                  [
                    "As",
                    "Qs",
                    "Tc",
                    "9d"
                  ],
                  [
                    "Jc",
                    "Ac",
                    "Kd",
                    "Kc"
                  ],
                  [
                    "Qc",
                    "Ad",
                    "Qd",
                    "Ts"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 1,
            "initialState": {
              "dealer": 0,
              "upCard": "Ad",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "9d",
                    "Jh",
                    "Ad"
                  ],
                  [
                    "As",
                    "Js",
                    "9s",
                    "Ts"
                  ],
                  [
                    "9h",
                    "Kh",
                    "Ah",
                    "Qs"
                  ],
                  [
                    "Jc",
                    "Ac",
                    "Td",
                    "Qc"
                  ],
                  [
                    "Qd",
                    "Kd",
                    "9c",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 2,
            "initialState": {
              "dealer": 1,
              "upCard": "Ks",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Ah",
                    "Ts",
                    "9h",
                    "Qh"
                  ],
                  [
                    "Td",
                    "Ad",
                    "As",
                    "Kd"
                  ],
                  [
                    "Qc",
                    "Tc",
                    "9c",
                    "Ac"
                  ],
                  [
                    "Qd",
                    "Ks",
                    "Js",
                    "Qs"
                  ],
                  [
                    "Jh",
                    "Jc",
                    "Jd",
                    "Kc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 3,
            "initialState": {
              "dealer": 2,
              "upCard": "Kh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": true,
                "discard": "9d"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Qc",
                    "Kc",
                    "Ac"
                  ],
                  [
                    "Jh",
                    "9s",
                    "Ah"
                  ],
                  [
                    "Kh",
                    "Td",
                    "Ks"
                  ],
                  [
                    "Qh",
                    "Ts",
                    "Kd"
                  ],
                  [
                    "9c",
                    "Js",
                    "Qd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 4,
            "initialState": {
              "dealer": 3,
              "upCard": "Qs",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9d",
                    "Jc",
                    "Kd",
                    "Td"
                  ],
                  [
                    "Qd",
                    "9c",
                    "Jd",
                    "Ac"
                  ],
                  [
                    "Qc",
                    "As",
                    "Kc",
                    "Qh"
                  ],
                  [
                    "Jh",
                    "9h",
                    "Ah",
                    "9s"
                  ],
                  [
                    "Js",
                    "Th",
                    "Kh",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 5,
            "initialState": {
              "dealer": 0,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [
                  "Td",
                  "Tc",
                  "Th",
                  "Ts",
                  "Jh"
                ],
                []
              ]
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
                  "Pass",
                  "Pass",
                  "Pass",
                  "s"
                ],
                "isAlone": true
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Qc",
                    "9c",
                    "Ac"
                  ],
                  [
                    "Js",
                    "Qs",
                    "Ks"
                  ],
                  [
                    "As",
                    "Jc",
                    "9h"
                  ],
                  [
                    "Qh",
                    "Kc",
                    "Ah"
                  ],
                  [
                    "9s",
                    "Jd",
                    "Ad"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 6,
            "initialState": {
              "dealer": 1,
              "upCard": "Th",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "9s",
                    "Ks",
                    "Js"
                  ],
                  [
                    "Td",
                    "9h",
                    "Qd"
                  ],
                  [
                    "Th",
                    "9c",
                    "Qh"
                  ],
                  [
                    "Ac",
                    "Jd",
                    "Jc"
                  ],
                  [
                    "Jh",
                    "Ts",
                    "Qc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 7,
            "initialState": {
              "dealer": 2,
              "upCard": "9c",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Pass",
                  "Order"
                ],
                "isAlone": false,
                "discard": "9s"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9h",
                    "Jd",
                    "Kh",
                    "Th"
                  ],
                  [
                    "Jh",
                    "Jc",
                    "Td",
                    "Tc"
                  ],
                  [
                    "9c",
                    "Ac",
                    "Js",
                    "9d"
                  ],
                  [
                    "Kc",
                    "Qd",
                    "Kd",
                    "Ts"
                  ],
                  [
                    "Qc",
                    "Ks",
                    "Ad",
                    "As"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 8,
            "initialState": {
              "dealer": 3,
              "upCard": "Td",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "Jd",
                    "9h",
                    "Td"
                  ],
                  [
                    "9s",
                    "Tc",
                    "As",
                    "Ts"
                  ],
                  [
                    "Ad",
                    "Qd",
                    "Qs",
                    "Jc"
                  ],
                  [
                    "Kc",
                    "Kd",
                    "Ks",
                    "Ac"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "Qh",
                    "Qc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 9,
            "initialState": {
              "dealer": 0,
              "upCard": "Ac",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Jh",
                    "Qc",
                    "Ah"
                  ],
                  [
                    "Js",
                    "Tc",
                    "Jd"
                  ],
                  [
                    "Kc",
                    "Kh",
                    "Qd"
                  ],
                  [
                    "Ks",
                    "Qh",
                    "Kd"
                  ],
                  [
                    "Qs",
                    "Th",
                    "Ad"
                  ]
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "gameIndex": 5,
      "players": [
        "p-04",
        "p-01",
        "p-03",
        "p-02"
      ],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": {
          "title": "MotE W5 G6",
          "description": "",
          "date": "2026-07-17T00:25",
          "players": [
            "WWMM",
            "Dad of Carl",
            "Chach",
            "Jen-Eye"
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
              "dealer": 3,
              "upCard": "Jh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Qc",
                    "Js",
                    "9c",
                    "Tc"
                  ],
                  [
                    "Ah",
                    "Th",
                    "9h",
                    "Kh"
                  ],
                  [
                    "Qd",
                    "Ad",
                    "Ac",
                    "9s"
                  ],
                  [
                    "Ks",
                    "As",
                    "Jd",
                    "Ts"
                  ],
                  [
                    "Kc",
                    "9d",
                    "Kd",
                    "Qs"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 1,
            "initialState": {
              "dealer": 0,
              "upCard": "Qs",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "9h",
                    "Qc",
                    "Kc"
                  ],
                  [
                    "Jc",
                    "Ac",
                    "9s",
                    "9c"
                  ],
                  [
                    "As",
                    "Qh",
                    "Ks",
                    "Js"
                  ],
                  [
                    "Ah",
                    "Jh",
                    "Qd",
                    "Kh"
                  ],
                  [
                    "Th",
                    "9d",
                    "Ad",
                    "Td"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 2,
            "initialState": {
              "dealer": 1,
              "upCard": "Jh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Js",
                    "Ks",
                    "Ah",
                    "Ts"
                  ],
                  [
                    "Td",
                    "9d",
                    "Ad",
                    "Kd"
                  ],
                  [
                    "9c",
                    "Kc",
                    "Jc",
                    "9s"
                  ],
                  [
                    "Qh",
                    "9h",
                    "Jh",
                    "Kh"
                  ],
                  [
                    "Qs",
                    "Tc",
                    "Jd",
                    "Th"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 3,
            "initialState": {
              "dealer": 2,
              "upCard": "Td",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ks",
                    "As",
                    "Js",
                    "Qs"
                  ],
                  [
                    "9h",
                    "9d",
                    "Ah",
                    "Jd"
                  ],
                  [
                    "9c",
                    "9s",
                    "Kc",
                    "Jc"
                  ],
                  [
                    "Ac",
                    "Qc",
                    "Kd",
                    "Qh"
                  ],
                  [
                    "Ad",
                    "Qd",
                    "Kh",
                    "Th"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 4,
            "initialState": {
              "dealer": 3,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "9s",
                    "Td",
                    "As",
                    "Ts"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "Jh",
                    "Th"
                  ],
                  [
                    "Qh",
                    "Js",
                    "9c",
                    "9h"
                  ],
                  [
                    "Ad",
                    "Qd",
                    "Qc",
                    "Jd"
                  ],
                  [
                    "Ac",
                    "Kc",
                    "Kd",
                    "Jc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 5,
            "initialState": {
              "dealer": 0,
              "upCard": "9s",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ts",
                    "Kd",
                    "9h"
                  ],
                  [
                    "Th",
                    "Kh",
                    "Qh",
                    "Jd"
                  ],
                  [
                    "Ah",
                    "Qs",
                    "Jc",
                    "Jh"
                  ],
                  [
                    "Td",
                    "Tc",
                    "Ks",
                    "As"
                  ],
                  [
                    "9s",
                    "9d",
                    "Qc",
                    "Ac"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 6,
            "initialState": {
              "dealer": 1,
              "upCard": "Js",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jc",
                    "Ts",
                    "Qs",
                    "Js"
                  ],
                  [
                    "Ah",
                    "9s",
                    "Th",
                    "Qh"
                  ],
                  [
                    "Ks",
                    "Jh",
                    "9d",
                    "Tc"
                  ],
                  [
                    "As",
                    "Td",
                    "Qc",
                    "9c"
                  ],
                  [
                    "Jd",
                    "Kh",
                    "Qd",
                    "Ac"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 7,
            "initialState": {
              "dealer": 2,
              "upCard": "Qc",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Pass",
                  "Order"
                ],
                "isAlone": false,
                "discard": "Qh"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "Ad",
                    "Td",
                    "Kd"
                  ],
                  [
                    "9h",
                    "Jh",
                    "Qc",
                    "Js"
                  ],
                  [
                    "As",
                    "Kc",
                    "Qs",
                    "9s"
                  ],
                  [
                    "9d",
                    "9c",
                    "Tc",
                    "Jc"
                  ],
                  [
                    "Ts",
                    "Ac",
                    "Kh",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 8,
            "initialState": {
              "dealer": 3,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Qd",
                    "Jd",
                    "Th",
                    "9d"
                  ],
                  [
                    "Ac",
                    "Tc",
                    "9h",
                    "Kc"
                  ],
                  [
                    "Qc",
                    "Jc",
                    "Kd",
                    "Qh"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "9c",
                    "Qs"
                  ],
                  [
                    "Js",
                    "As",
                    "Td",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 9,
            "initialState": {
              "dealer": 0,
              "upCard": "Tc",
              "playerCards": [
                [],
                [],
                [
                  "As",
                  "Ts",
                  "9s",
                  "Ac",
                  "Jh"
                ],
                []
              ]
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
                    "Ah",
                    "Qh",
                    "Tc"
                  ],
                  [
                    "Jc",
                    "9h",
                    "9c"
                  ],
                  [
                    "Kc",
                    "Kd",
                    "Kh"
                  ],
                  [
                    "Qc",
                    "9d",
                    "Qd"
                  ],
                  [
                    "Td",
                    "Ad",
                    "Qs"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 10,
            "initialState": {
              "dealer": 1,
              "upCard": "9h",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "9s",
                    "As",
                    "Ks",
                    "Tc"
                  ],
                  [
                    "Ts",
                    "Kh",
                    "Ah",
                    "Js"
                  ],
                  [
                    "9h",
                    "Jh",
                    "Jd",
                    "Qh"
                  ],
                  [
                    "Ac",
                    "9d",
                    "Kc",
                    "Jc"
                  ],
                  [
                    "9c",
                    "Td",
                    "Qd",
                    "Th"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 11,
            "initialState": {
              "dealer": 2,
              "upCard": "Qd",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "s"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ad",
                    "Td",
                    "Kd",
                    "9s"
                  ],
                  [
                    "Ts",
                    "Qs",
                    "Js",
                    "Jc"
                  ],
                  [
                    "Kh",
                    "Jh",
                    "Ah",
                    "Qh"
                  ],
                  [
                    "Tc",
                    "9c",
                    "Ks",
                    "Ac"
                  ],
                  [
                    "9h",
                    "Th",
                    "Kc",
                    "Jd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 12,
            "initialState": {
              "dealer": 3,
              "upCard": "Qc",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9s",
                    "Qs",
                    "As",
                    "Qc"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "Th",
                    "Tc"
                  ],
                  [
                    "Kd",
                    "Jd",
                    "9c",
                    "Td"
                  ],
                  [
                    "Jc",
                    "9d",
                    "Ts",
                    "Js"
                  ],
                  [
                    "Ac",
                    "Jh",
                    "Ks",
                    "Qd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 13,
            "initialState": {
              "dealer": 0,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": true
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "9h",
                    "Td"
                  ],
                  [
                    "Jh",
                    "Qh",
                    "Qd"
                  ],
                  [
                    "Ad",
                    "Ac",
                    "9d"
                  ],
                  [
                    "As",
                    "Ks",
                    "9c"
                  ],
                  [
                    "Tc",
                    "Kc",
                    "Kh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 14,
            "initialState": {
              "dealer": 1,
              "upCard": "Ah",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Ac",
                    "9h",
                    "Tc",
                    "Kc"
                  ],
                  [
                    "Th",
                    "Jh",
                    "Jd",
                    "9d"
                  ],
                  [
                    "Jc",
                    "Td",
                    "Qd",
                    "Qh"
                  ],
                  [
                    "Js",
                    "9s",
                    "Ad",
                    "Ks"
                  ],
                  [
                    "As",
                    "Kh",
                    "Kd",
                    "Ah"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 15,
            "initialState": {
              "dealer": 2,
              "upCard": "Ad",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": false,
                "discard": "Js"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ac",
                    "Jc",
                    "9c",
                    "Qd"
                  ],
                  [
                    "Jd",
                    "Th",
                    "Kd",
                    "9d"
                  ],
                  [
                    "Ah",
                    "Kc",
                    "9h",
                    "Qh"
                  ],
                  [
                    "Ad",
                    "Qs",
                    "Qc",
                    "Jh"
                  ],
                  [
                    "Ts",
                    "Kh",
                    "As",
                    "Ks"
                  ]
                ]
              }
            ]
          }
        ]
      }
    }
  ]
};

var moteW5Match = {
  "fileType": "Euchre Match Notation",
  "version": "1.0",
  "metadata": {
    "title": "MotE Week 5 Match",
    "date": "2026-07-21T03:47:33.103Z",
    "players": [
      {
        "id": "p-01",
        "name": "Dad of Carl",
        "playerIds": [
          {
            "id": "p-01",
            "source": "emn-combine"
          }
        ]
      },
      {
        "id": "p-02",
        "name": "Jen-Eye",
        "playerIds": [
          {
            "id": "p-02",
            "source": "emn-combine"
          }
        ]
      },
      {
        "id": "p-03",
        "name": "Chach",
        "playerIds": [
          {
            "id": "p-03",
            "source": "emn-combine"
          }
        ]
      },
      {
        "id": "p-04",
        "name": "WWMM",
        "playerIds": [
          {
            "id": "p-04",
            "source": "emn-combine"
          }
        ]
      }
    ],
    "matchFormat": {
      "type": "FIXED_GAMES",
      "target": 6
    }
  },
  "games": [
    {
      "gameIndex": 0,
      "players": [
        "p-01",
        "p-02",
        "p-03",
        "p-04"
      ],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": {
          "title": "MotE W5 G1",
          "description": "",
          "date": "2026-07-16T22:24",
          "players": [
            "Dad of Carl",
            "Jen-Eye",
            "Chach",
            "WWMM"
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
              "dealer": 0,
              "upCard": "Kh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "As",
                    "Ts",
                    "Jd",
                    "Ks"
                  ],
                  [
                    "Ad",
                    "Ah",
                    "9c",
                    "9d"
                  ],
                  [
                    "9h",
                    "Jc",
                    "Jh",
                    "Td"
                  ],
                  [
                    "Js",
                    "Qd",
                    "Kh",
                    "Qs"
                  ],
                  [
                    "Th",
                    "Ac",
                    "Qh",
                    "Qc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 1,
            "initialState": {
              "dealer": 1,
              "upCard": "Ac",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "s"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "As",
                    "Js",
                    "Ks",
                    "Td"
                  ],
                  [
                    "Ts",
                    "9c",
                    "Th",
                    "Jc"
                  ],
                  [
                    "9h",
                    "Ah",
                    "Tc",
                    "Kh"
                  ],
                  [
                    "Kd",
                    "Ad",
                    "Jd",
                    "Qh"
                  ],
                  [
                    "Qd",
                    "Qc",
                    "9s",
                    "Qs"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 2,
            "initialState": {
              "dealer": 2,
              "upCard": "Qc",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": false,
                "discard": "Qs"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ah",
                    "Jh",
                    "Th",
                    "9c"
                  ],
                  [
                    "Tc",
                    "Ac",
                    "Jd",
                    "Js"
                  ],
                  [
                    "Qd",
                    "Qc",
                    "Kd",
                    "Ts"
                  ],
                  [
                    "Ks",
                    "9h",
                    "As",
                    "9d"
                  ],
                  [
                    "Kh",
                    "Td",
                    "Kc",
                    "Qh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 3,
            "initialState": {
              "dealer": 3,
              "upCard": "Td",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "Pass",
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "Qh",
                    "9h",
                    "Tc"
                  ],
                  [
                    "9c",
                    "Kh",
                    "Kc",
                    "Jc"
                  ],
                  [
                    "Ad",
                    "Ac",
                    "Kd",
                    "9d"
                  ],
                  [
                    "Ks",
                    "As",
                    "Js",
                    "Ts"
                  ],
                  [
                    "Jh",
                    "Qs",
                    "Qc",
                    "9s"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 4,
            "initialState": {
              "dealer": 0,
              "upCard": "Td",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "Pass",
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9h",
                    "Jd",
                    "Kh",
                    "Th"
                  ],
                  [
                    "As",
                    "Qs",
                    "Js",
                    "Ts"
                  ],
                  [
                    "9s",
                    "Ah",
                    "Qd",
                    "Ks"
                  ],
                  [
                    "Ac",
                    "9c",
                    "Ad",
                    "Tc"
                  ],
                  [
                    "9d",
                    "Jc",
                    "Qh",
                    "Kc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 5,
            "initialState": {
              "dealer": 1,
              "upCard": "Th",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "Jd",
                    "Qh",
                    "9h"
                  ],
                  [
                    "Jc",
                    "Tc",
                    "9c",
                    "Kc"
                  ],
                  [
                    "Ac",
                    "Ah",
                    "9s",
                    "Ts"
                  ],
                  [
                    "Kh",
                    "Qd",
                    "Ad",
                    "Th"
                  ],
                  [
                    "9d",
                    "Kd",
                    "As",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 6,
            "initialState": {
              "dealer": 2,
              "upCard": "9s",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": false,
                "discard": "9c"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Qd",
                    "Ad",
                    "Th",
                    "Jd"
                  ],
                  [
                    "Ks",
                    "Jh",
                    "Jc",
                    "Qs"
                  ],
                  [
                    "Js",
                    "As",
                    "9h",
                    "Qc"
                  ],
                  [
                    "Ts",
                    "Kd",
                    "Td",
                    "Qh"
                  ],
                  [
                    "9s",
                    "Kh",
                    "Tc",
                    "Ac"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 7,
            "initialState": {
              "dealer": 3,
              "upCard": "Ks",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Js",
                    "Qs",
                    "Jh",
                    "Ks"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "Qh",
                    "Ts"
                  ],
                  [
                    "Jc",
                    "9s",
                    "Td",
                    "9d"
                  ],
                  [
                    "9c",
                    "As",
                    "Tc",
                    "Ac"
                  ],
                  [
                    "Jd",
                    "Kd",
                    "Ad",
                    "Qd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 8,
            "initialState": {
              "dealer": 0,
              "upCard": "Ah",
              "playerCards": [
                [],
                [],
                [
                  "Kh",
                  "As",
                  "Js",
                  "Ts",
                  "9c"
                ],
                []
              ]
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
                    "Ac",
                    "Jc",
                    "Jh"
                  ],
                  [
                    "Ah",
                    "Td",
                    "Qh"
                  ],
                  [
                    "Jd",
                    "Qd",
                    "Th"
                  ],
                  [
                    "Kd",
                    "9s",
                    "9d"
                  ],
                  [
                    "Ad",
                    "Ks",
                    "9h"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 9,
            "initialState": {
              "dealer": 1,
              "upCard": "Jd",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9h",
                    "Ah",
                    "Qh",
                    "Th"
                  ],
                  [
                    "Td",
                    "Kd",
                    "9d",
                    "Ad"
                  ],
                  [
                    "As",
                    "Ts",
                    "Js",
                    "Tc"
                  ],
                  [
                    "Jc",
                    "9c",
                    "Kc",
                    "Ac"
                  ],
                  [
                    "Qc",
                    "Kh",
                    "Qs",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 10,
            "initialState": {
              "dealer": 2,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Pass",
                  "Order"
                ],
                "isAlone": false,
                "discard": "Kh"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "Td",
                    "Qd",
                    "9d"
                  ],
                  [
                    "Qh",
                    "Ah",
                    "Jd",
                    "9c"
                  ],
                  [
                    "Kc",
                    "Ac",
                    "9h",
                    "Qc"
                  ],
                  [
                    "As",
                    "Qs",
                    "9s",
                    "Ts"
                  ],
                  [
                    "Jc",
                    "Th",
                    "Ad",
                    "Js"
                  ]
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "gameIndex": 1,
      "players": [
        "p-01",
        "p-02",
        "p-03",
        "p-04"
      ],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": {
          "title": "MotE W5 G2",
          "description": "",
          "date": "2026-07-16T22:48",
          "players": [
            "Dad of Carl",
            "Jen-Eye",
            "Chach",
            "WWMM"
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
              "upCard": "Jd",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "s"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Qh",
                    "Th",
                    "Ah",
                    "Jh"
                  ],
                  [
                    "9h",
                    "Kh",
                    "Td",
                    "Tc"
                  ],
                  [
                    "9s",
                    "Js",
                    "Qs",
                    "Jc"
                  ],
                  [
                    "Qd",
                    "Ad",
                    "Ac",
                    "9c"
                  ],
                  [
                    "Ks",
                    "As",
                    "Qc",
                    "Kd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 1,
            "initialState": {
              "dealer": 2,
              "upCard": "Qs",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "d"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "Ad",
                    "Jc",
                    "9d"
                  ],
                  [
                    "Kh",
                    "Ah",
                    "9h",
                    "Qh"
                  ],
                  [
                    "Th",
                    "9s",
                    "Qd",
                    "Kd"
                  ],
                  [
                    "Js",
                    "Ks",
                    "Qc",
                    "Ts"
                  ],
                  [
                    "Tc",
                    "Ac",
                    "Kc",
                    "Td"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 2,
            "initialState": {
              "dealer": 3,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "As",
                    "Js",
                    "9d"
                  ],
                  [
                    "Jd",
                    "Td",
                    "Kd"
                  ],
                  [
                    "Kh",
                    "Qh",
                    "9h"
                  ],
                  [
                    "Qd",
                    "Jh",
                    "Jc"
                  ],
                  [
                    "Ac",
                    "Kc",
                    "Ah"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 3,
            "initialState": {
              "dealer": 0,
              "upCard": "Td",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "s"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Kd",
                    "Ad",
                    "Qd",
                    "Jd"
                  ],
                  [
                    "Qs",
                    "Tc",
                    "Jc",
                    "9s"
                  ],
                  [
                    "Th",
                    "Qh",
                    "Ah",
                    "Jh"
                  ],
                  [
                    "Qc",
                    "Ac",
                    "Ks",
                    "9c"
                  ],
                  [
                    "Ts",
                    "9h",
                    "As",
                    "Kc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 4,
            "initialState": {
              "dealer": 1,
              "upCard": "Ts",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ad",
                    "Jd",
                    "9d",
                    "9c"
                  ],
                  [
                    "Qs",
                    "9s",
                    "Ac",
                    "Ks"
                  ],
                  [
                    "Kh",
                    "Qc",
                    "Jh",
                    "9h"
                  ],
                  [
                    "As",
                    "Kc",
                    "Td",
                    "Js"
                  ],
                  [
                    "Jc",
                    "Qd",
                    "Qh",
                    "Th"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 5,
            "initialState": {
              "dealer": 2,
              "upCard": "9s",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Pass",
                  "Order"
                ],
                "isAlone": false,
                "discard": "Jh"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ac",
                    "Jc",
                    "9d",
                    "Kc"
                  ],
                  [
                    "Td",
                    "Ts",
                    "Qd",
                    "Kd"
                  ],
                  [
                    "Th",
                    "As",
                    "Kh",
                    "Qh"
                  ],
                  [
                    "Qc",
                    "9c",
                    "Ah",
                    "Qs"
                  ],
                  [
                    "9h",
                    "9s",
                    "Ad",
                    "Js"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 6,
            "initialState": {
              "dealer": 3,
              "upCard": "Jd",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ac",
                    "9c",
                    "Tc",
                    "Qc"
                  ],
                  [
                    "Jc",
                    "Kc",
                    "Qd",
                    "Jh"
                  ],
                  [
                    "Jd",
                    "As",
                    "Ad",
                    "Td"
                  ],
                  [
                    "Th",
                    "Ks",
                    "9s",
                    "Kh"
                  ],
                  [
                    "Ah",
                    "9d",
                    "Qs",
                    "Ts"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 7,
            "initialState": {
              "dealer": 0,
              "upCard": "Ts",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ah",
                    "Th",
                    "Kc",
                    "Qh"
                  ],
                  [
                    "Ad",
                    "Tc",
                    "9d",
                    "Jd"
                  ],
                  [
                    "Qc",
                    "Ac",
                    "As",
                    "Js"
                  ],
                  [
                    "Qs",
                    "Jc",
                    "Jh",
                    "Ks"
                  ],
                  [
                    "Td",
                    "Kh",
                    "Kd",
                    "Ts"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 8,
            "initialState": {
              "dealer": 1,
              "upCard": "Js",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Ah",
                    "Jh",
                    "Th",
                    "Qh"
                  ],
                  [
                    "Ad",
                    "Td",
                    "Kd",
                    "Js"
                  ],
                  [
                    "Qc",
                    "Qs",
                    "As",
                    "Ac"
                  ],
                  [
                    "Ts",
                    "Ks",
                    "9c",
                    "9s"
                  ],
                  [
                    "Kc",
                    "Tc",
                    "9d",
                    "Kh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 9,
            "initialState": {
              "dealer": 2,
              "upCard": "Js",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": true,
                "discard": "Td"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "Kd",
                    "Qs"
                  ],
                  [
                    "Js",
                    "9c",
                    "Ad"
                  ],
                  [
                    "Jc",
                    "Qd",
                    "Kh"
                  ],
                  [
                    "Ah",
                    "Th",
                    "Qc"
                  ],
                  [
                    "Kc",
                    "Qh",
                    "Ac"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 10,
            "initialState": {
              "dealer": 3,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Qd",
                    "Jh",
                    "9s",
                    "9d"
                  ],
                  [
                    "Jd",
                    "9h",
                    "Kd",
                    "9c"
                  ],
                  [
                    "As",
                    "Ts",
                    "Th",
                    "Jc"
                  ],
                  [
                    "Tc",
                    "Kc",
                    "Ac",
                    "Ah"
                  ],
                  [
                    "Qh",
                    "Kh",
                    "Td",
                    "Qs"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 11,
            "initialState": {
              "dealer": 0,
              "upCard": "Jd",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Kc",
                    "Jc",
                    "Ac",
                    "Jd"
                  ],
                  [
                    "Jh",
                    "9d",
                    "9h",
                    "Td"
                  ],
                  [
                    "As",
                    "Ad",
                    "Js",
                    "9c"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "Qd",
                    "9s"
                  ],
                  [
                    "Tc",
                    "Qs",
                    "Th",
                    "Ks"
                  ]
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "gameIndex": 2,
      "players": [
        "p-02",
        "p-01",
        "p-03",
        "p-04"
      ],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": {
          "title": "MotE W5 G3",
          "description": "",
          "date": "2026-07-16T22:59",
          "players": [
            "Jen-Eye",
            "Dad of Carl",
            "Chach",
            "WWMM"
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
              "dealer": 0,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "Ah",
                    "9h",
                    "Th"
                  ],
                  [
                    "As",
                    "9s",
                    "Qs",
                    "Kh"
                  ],
                  [
                    "Td",
                    "Kd",
                    "Ad",
                    "Qd"
                  ],
                  [
                    "Ac",
                    "Tc",
                    "Jc",
                    "9c"
                  ],
                  [
                    "Js",
                    "Ks",
                    "Kc",
                    "Ts"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 1,
            "initialState": {
              "dealer": 1,
              "upCard": "Jh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Jc",
                    "9c",
                    "Ac"
                  ],
                  [
                    "Jh",
                    "Th",
                    "Kh"
                  ],
                  [
                    "Qh",
                    "Jd",
                    "Ah"
                  ],
                  [
                    "Kc",
                    "Js",
                    "Tc"
                  ],
                  [
                    "Ad",
                    "Qs",
                    "9h"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 2,
            "initialState": {
              "dealer": 2,
              "upCard": "Ks",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "9c",
                    "Tc",
                    "Kc",
                    "Ac"
                  ],
                  [
                    "Td",
                    "Qd",
                    "9d",
                    "Kd"
                  ],
                  [
                    "9s",
                    "Ts",
                    "Qs",
                    "Qc"
                  ],
                  [
                    "Jh",
                    "9h",
                    "Th",
                    "Kh"
                  ],
                  [
                    "Ad",
                    "Js",
                    "Qh",
                    "Jd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 3,
            "initialState": {
              "dealer": 3,
              "upCard": "Ad",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ts",
                    "Td",
                    "Ks",
                    "As"
                  ],
                  [
                    "Js",
                    "Jc",
                    "Ac",
                    "9s"
                  ],
                  [
                    "Kd",
                    "9h",
                    "9d",
                    "Tc"
                  ],
                  [
                    "Qs",
                    "Qd",
                    "Qc",
                    "Jd"
                  ],
                  [
                    "Kc",
                    "Ah",
                    "Kh",
                    "Qh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 4,
            "initialState": {
              "dealer": 0,
              "upCard": "Ah",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "d"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9d",
                    "Ad",
                    "Jd",
                    "Ts"
                  ],
                  [
                    "Qh",
                    "Kh",
                    "Td",
                    "Th"
                  ],
                  [
                    "Kc",
                    "Tc",
                    "9c",
                    "9h"
                  ],
                  [
                    "Jh",
                    "Qd",
                    "Kd",
                    "Js"
                  ],
                  [
                    "Qs",
                    "Qc",
                    "Jc",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 5,
            "initialState": {
              "dealer": 1,
              "upCard": "Qs",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Qh",
                    "9h",
                    "Th",
                    "Ah"
                  ],
                  [
                    "Tc",
                    "Kc",
                    "Jc",
                    "Qc"
                  ],
                  [
                    "As",
                    "Ts",
                    "9s",
                    "Ks"
                  ],
                  [
                    "9d",
                    "Ad",
                    "Td",
                    "Jd"
                  ],
                  [
                    "Ac",
                    "Kd",
                    "Qd",
                    "9c"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 6,
            "initialState": {
              "dealer": 2,
              "upCard": "9c",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": false,
                "discard": "9h"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ah",
                    "Th",
                    "Jh",
                    "9c"
                  ],
                  [
                    "9d",
                    "Ad",
                    "Js",
                    "Qd"
                  ],
                  [
                    "As",
                    "Ks",
                    "Jd",
                    "9s"
                  ],
                  [
                    "Ts",
                    "Kc",
                    "Ac",
                    "Kh"
                  ],
                  [
                    "Qc",
                    "Tc",
                    "Qh",
                    "Jc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 7,
            "initialState": {
              "dealer": 3,
              "upCard": "Ac",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Th",
                    "Jh",
                    "Ah",
                    "Ac"
                  ],
                  [
                    "Ad",
                    "Td",
                    "Qd",
                    "Kc"
                  ],
                  [
                    "Ks",
                    "As",
                    "9c",
                    "9s"
                  ],
                  [
                    "Kd",
                    "Qc",
                    "Js",
                    "Jd"
                  ],
                  [
                    "Qh",
                    "Ts",
                    "Tc",
                    "Jc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 8,
            "initialState": {
              "dealer": 0,
              "upCard": "Ad",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Kh",
                    "Jd",
                    "9h",
                    "Qh"
                  ],
                  [
                    "Ts",
                    "9s",
                    "Qd",
                    "Qs"
                  ],
                  [
                    "Jh",
                    "9d",
                    "9c",
                    "Kd"
                  ],
                  [
                    "Ad",
                    "Jc",
                    "Tc",
                    "Qc"
                  ],
                  [
                    "Td",
                    "Ks",
                    "Js",
                    "Ac"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 9,
            "initialState": {
              "dealer": 1,
              "upCard": "Qh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9c",
                    "Qc",
                    "Jc",
                    "Ac"
                  ],
                  [
                    "Tc",
                    "Kh",
                    "Ah",
                    "Jh"
                  ],
                  [
                    "9h",
                    "Jd",
                    "9d",
                    "Ts"
                  ],
                  [
                    "As",
                    "Qs",
                    "Td",
                    "9s"
                  ],
                  [
                    "Qh",
                    "Ks",
                    "Ad",
                    "Js"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 10,
            "initialState": {
              "dealer": 2,
              "upCard": "Ks",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": false,
                "discard": "9d"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Tc",
                    "9c",
                    "Jc",
                    "Js"
                  ],
                  [
                    "Ah",
                    "Qh",
                    "Th",
                    "Kh"
                  ],
                  [
                    "9h",
                    "Td",
                    "9s",
                    "As"
                  ],
                  [
                    "Ad",
                    "Qs",
                    "Jd",
                    "Qd"
                  ],
                  [
                    "Ks",
                    "Kc",
                    "Ts",
                    "Kd"
                  ]
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "gameIndex": 3,
      "players": [
        "p-02",
        "p-01",
        "p-03",
        "p-04"
      ],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": {
          "title": "MotE W5 G4",
          "description": "",
          "date": "2026-07-16T23:23",
          "players": [
            "Jen-Eye",
            "Dad of Carl",
            "Chach",
            "WWMM"
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
              "dealer": 3,
              "upCard": "Qh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ad",
                    "9c",
                    "Qd",
                    "Td"
                  ],
                  [
                    "9h",
                    "Ah",
                    "Tc",
                    "Jh"
                  ],
                  [
                    "Ts",
                    "9s",
                    "Kc",
                    "As"
                  ],
                  [
                    "Jc",
                    "Ac",
                    "Jd",
                    "Js"
                  ],
                  [
                    "Th",
                    "Kd",
                    "Qs",
                    "Kh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 1,
            "initialState": {
              "dealer": 0,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "h"
                ],
                "isAlone": true
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "9s",
                    "Kh"
                  ],
                  [
                    "Jd",
                    "Qs",
                    "Jc"
                  ],
                  [
                    "As",
                    "Ks",
                    "Qc"
                  ],
                  [
                    "Qh",
                    "Qd",
                    "Ac"
                  ],
                  [
                    "9c",
                    "Kc",
                    "Kd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 2,
            "initialState": {
              "dealer": 1,
              "upCard": "Ah",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Tc",
                    "9c",
                    "9d",
                    "Ac"
                  ],
                  [
                    "Kh",
                    "9h",
                    "Js",
                    "Jh"
                  ],
                  [
                    "Ts",
                    "As",
                    "9s",
                    "Jc"
                  ],
                  [
                    "Ah",
                    "Kd",
                    "Kc",
                    "Td"
                  ],
                  [
                    "Th",
                    "Ks",
                    "Ad",
                    "Qd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 3,
            "initialState": {
              "dealer": 2,
              "upCard": "Qc",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": true,
                "discard": "Qd"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "Ah",
                    "Tc"
                  ],
                  [
                    "Jc",
                    "9c",
                    "Ts"
                  ],
                  [
                    "Js",
                    "9h",
                    "Qs"
                  ],
                  [
                    "Kc",
                    "Qh",
                    "Ad"
                  ],
                  [
                    "Qc",
                    "Jd",
                    "Kd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 4,
            "initialState": {
              "dealer": 3,
              "upCard": "As",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ad",
                    "Td",
                    "Kd",
                    "9d"
                  ],
                  [
                    "Jc",
                    "Ac",
                    "9c",
                    "Tc"
                  ],
                  [
                    "Qs",
                    "Js",
                    "9s",
                    "Ks"
                  ],
                  [
                    "Ts",
                    "Ah",
                    "Qc",
                    "Qh"
                  ],
                  [
                    "Jh",
                    "Kc",
                    "Kh",
                    "9h"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 5,
            "initialState": {
              "dealer": 0,
              "upCard": "Jh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "d"
                ],
                "isAlone": true
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "9d",
                    "Qd"
                  ],
                  [
                    "As",
                    "9s",
                    "Qs"
                  ],
                  [
                    "Ah",
                    "9c",
                    "9h"
                  ],
                  [
                    "Td",
                    "Ts",
                    "Ks"
                  ],
                  [
                    "Tc",
                    "Qc",
                    "Ac"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 6,
            "initialState": {
              "dealer": 1,
              "upCard": "Ad",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "9s",
                    "As",
                    "Ts",
                    "Js"
                  ],
                  [
                    "9c",
                    "Tc",
                    "Ad",
                    "Th"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "Jc",
                    "Kd"
                  ],
                  [
                    "Jh",
                    "9d",
                    "Qd",
                    "Jd"
                  ],
                  [
                    "Td",
                    "Qs",
                    "Qh",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 7,
            "initialState": {
              "dealer": 2,
              "upCard": "Tc",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Pass",
                  "Pass",
                  "Order"
                ],
                "isAlone": false,
                "discard": "Jh"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Qh",
                    "Kh",
                    "Th",
                    "Ah"
                  ],
                  [
                    "Ad",
                    "Td",
                    "9d",
                    "As"
                  ],
                  [
                    "Qd",
                    "Kd",
                    "Qc",
                    "Jc"
                  ],
                  [
                    "Ac",
                    "Tc",
                    "Jd",
                    "9s"
                  ],
                  [
                    "Js",
                    "Kc",
                    "Ks",
                    "Ts"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 8,
            "initialState": {
              "dealer": 3,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Jh",
                    "Ts",
                    "Td",
                    "9d"
                  ],
                  [
                    "Qs",
                    "9h",
                    "As",
                    "Js"
                  ],
                  [
                    "Jd",
                    "Tc",
                    "9c",
                    "Th"
                  ],
                  [
                    "Kd",
                    "Qc",
                    "Kc",
                    "Qh"
                  ],
                  [
                    "Ks",
                    "Ah",
                    "Ac",
                    "Kh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 9,
            "initialState": {
              "dealer": 0,
              "upCard": "Td",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "h"
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
                    "Ac",
                    "Jc"
                  ],
                  [
                    "Qd",
                    "Th",
                    "Ah",
                    "9d"
                  ],
                  [
                    "Jh",
                    "9h",
                    "9c",
                    "Qh"
                  ],
                  [
                    "Qc",
                    "Kh",
                    "Ts",
                    "Js"
                  ],
                  [
                    "Ad",
                    "Ks",
                    "Qs",
                    "9s"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 10,
            "initialState": {
              "dealer": 1,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "9c",
                    "Ac",
                    "Tc",
                    "Qc"
                  ],
                  [
                    "Td",
                    "Kd",
                    "Ad",
                    "Jd"
                  ],
                  [
                    "Ah",
                    "9s",
                    "Kh",
                    "9d"
                  ],
                  [
                    "As",
                    "Js",
                    "Qs",
                    "Ts"
                  ],
                  [
                    "Kc",
                    "Qd",
                    "Ks",
                    "Jh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 11,
            "initialState": {
              "dealer": 2,
              "upCard": "Js",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false,
                "discard": "Ac"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Qs",
                    "9d",
                    "9s",
                    "Ks"
                  ],
                  [
                    "Js",
                    "Tc",
                    "9c",
                    "9h"
                  ],
                  [
                    "As",
                    "Ah",
                    "Th",
                    "Qd"
                  ],
                  [
                    "Ad",
                    "Kd",
                    "Td",
                    "Kc"
                  ],
                  [
                    "Jd",
                    "Kh",
                    "Qh",
                    "Qc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 12,
            "initialState": {
              "dealer": 3,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ad",
                    "Qc",
                    "Td",
                    "Jd"
                  ],
                  [
                    "Kc",
                    "9c",
                    "Js",
                    "9s"
                  ],
                  [
                    "Qs",
                    "Ks",
                    "As",
                    "Ts"
                  ],
                  [
                    "Ac",
                    "Th",
                    "Tc",
                    "Qh"
                  ],
                  [
                    "Kh",
                    "Qd",
                    "9h",
                    "Ah"
                  ]
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "gameIndex": 4,
      "players": [
        "p-04",
        "p-01",
        "p-03",
        "p-02"
      ],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": {
          "title": "MotE W5 G5",
          "description": "",
          "date": "2026-07-17T00:04",
          "players": [
            "WWMM",
            "Dad of Carl",
            "Chach",
            "Jen-Eye"
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
              "dealer": 3,
              "upCard": "Js",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "Kh",
                    "Th",
                    "Qh"
                  ],
                  [
                    "Jd",
                    "Td",
                    "9c",
                    "Ah"
                  ],
                  [
                    "As",
                    "Qs",
                    "Tc",
                    "9d"
                  ],
                  [
                    "Jc",
                    "Ac",
                    "Kd",
                    "Kc"
                  ],
                  [
                    "Qc",
                    "Ad",
                    "Qd",
                    "Ts"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 1,
            "initialState": {
              "dealer": 0,
              "upCard": "Ad",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "9d",
                    "Jh",
                    "Ad"
                  ],
                  [
                    "As",
                    "Js",
                    "9s",
                    "Ts"
                  ],
                  [
                    "9h",
                    "Kh",
                    "Ah",
                    "Qs"
                  ],
                  [
                    "Jc",
                    "Ac",
                    "Td",
                    "Qc"
                  ],
                  [
                    "Qd",
                    "Kd",
                    "9c",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 2,
            "initialState": {
              "dealer": 1,
              "upCard": "Ks",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Ah",
                    "Ts",
                    "9h",
                    "Qh"
                  ],
                  [
                    "Td",
                    "Ad",
                    "As",
                    "Kd"
                  ],
                  [
                    "Qc",
                    "Tc",
                    "9c",
                    "Ac"
                  ],
                  [
                    "Qd",
                    "Ks",
                    "Js",
                    "Qs"
                  ],
                  [
                    "Jh",
                    "Jc",
                    "Jd",
                    "Kc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 3,
            "initialState": {
              "dealer": 2,
              "upCard": "Kh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": true,
                "discard": "9d"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Qc",
                    "Kc",
                    "Ac"
                  ],
                  [
                    "Jh",
                    "9s",
                    "Ah"
                  ],
                  [
                    "Kh",
                    "Td",
                    "Ks"
                  ],
                  [
                    "Qh",
                    "Ts",
                    "Kd"
                  ],
                  [
                    "9c",
                    "Js",
                    "Qd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 4,
            "initialState": {
              "dealer": 3,
              "upCard": "Qs",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9d",
                    "Jc",
                    "Kd",
                    "Td"
                  ],
                  [
                    "Qd",
                    "9c",
                    "Jd",
                    "Ac"
                  ],
                  [
                    "Qc",
                    "As",
                    "Kc",
                    "Qh"
                  ],
                  [
                    "Jh",
                    "9h",
                    "Ah",
                    "9s"
                  ],
                  [
                    "Js",
                    "Th",
                    "Kh",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 5,
            "initialState": {
              "dealer": 0,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [
                  "Td",
                  "Tc",
                  "Th",
                  "Ts",
                  "Jh"
                ],
                []
              ]
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
                  "Pass",
                  "Pass",
                  "Pass",
                  "s"
                ],
                "isAlone": true
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Qc",
                    "9c",
                    "Ac"
                  ],
                  [
                    "Js",
                    "Qs",
                    "Ks"
                  ],
                  [
                    "As",
                    "Jc",
                    "9h"
                  ],
                  [
                    "Qh",
                    "Kc",
                    "Ah"
                  ],
                  [
                    "9s",
                    "Jd",
                    "Ad"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 6,
            "initialState": {
              "dealer": 1,
              "upCard": "Th",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "9s",
                    "Ks",
                    "Js"
                  ],
                  [
                    "Td",
                    "9h",
                    "Qd"
                  ],
                  [
                    "Th",
                    "9c",
                    "Qh"
                  ],
                  [
                    "Ac",
                    "Jd",
                    "Jc"
                  ],
                  [
                    "Jh",
                    "Ts",
                    "Qc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 7,
            "initialState": {
              "dealer": 2,
              "upCard": "9c",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Pass",
                  "Order"
                ],
                "isAlone": false,
                "discard": "9s"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9h",
                    "Jd",
                    "Kh",
                    "Th"
                  ],
                  [
                    "Jh",
                    "Jc",
                    "Td",
                    "Tc"
                  ],
                  [
                    "9c",
                    "Ac",
                    "Js",
                    "9d"
                  ],
                  [
                    "Kc",
                    "Qd",
                    "Kd",
                    "Ts"
                  ],
                  [
                    "Qc",
                    "Ks",
                    "Ad",
                    "As"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 8,
            "initialState": {
              "dealer": 3,
              "upCard": "Td",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jh",
                    "Jd",
                    "9h",
                    "Td"
                  ],
                  [
                    "9s",
                    "Tc",
                    "As",
                    "Ts"
                  ],
                  [
                    "Ad",
                    "Qd",
                    "Qs",
                    "Jc"
                  ],
                  [
                    "Kc",
                    "Kd",
                    "Ks",
                    "Ac"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "Qh",
                    "Qc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 9,
            "initialState": {
              "dealer": 0,
              "upCard": "Ac",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Jh",
                    "Qc",
                    "Ah"
                  ],
                  [
                    "Js",
                    "Tc",
                    "Jd"
                  ],
                  [
                    "Kc",
                    "Kh",
                    "Qd"
                  ],
                  [
                    "Ks",
                    "Qh",
                    "Kd"
                  ],
                  [
                    "Qs",
                    "Th",
                    "Ad"
                  ]
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "gameIndex": 5,
      "players": [
        "p-04",
        "p-01",
        "p-03",
        "p-02"
      ],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": {
          "title": "MotE W5 G6",
          "description": "",
          "date": "2026-07-17T00:25",
          "players": [
            "WWMM",
            "Dad of Carl",
            "Chach",
            "Jen-Eye"
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
              "dealer": 3,
              "upCard": "Jh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Qc",
                    "Js",
                    "9c",
                    "Tc"
                  ],
                  [
                    "Ah",
                    "Th",
                    "9h",
                    "Kh"
                  ],
                  [
                    "Qd",
                    "Ad",
                    "Ac",
                    "9s"
                  ],
                  [
                    "Ks",
                    "As",
                    "Jd",
                    "Ts"
                  ],
                  [
                    "Kc",
                    "9d",
                    "Kd",
                    "Qs"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 1,
            "initialState": {
              "dealer": 0,
              "upCard": "Qs",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "9h",
                    "Qc",
                    "Kc"
                  ],
                  [
                    "Jc",
                    "Ac",
                    "9s",
                    "9c"
                  ],
                  [
                    "As",
                    "Qh",
                    "Ks",
                    "Js"
                  ],
                  [
                    "Ah",
                    "Jh",
                    "Qd",
                    "Kh"
                  ],
                  [
                    "Th",
                    "9d",
                    "Ad",
                    "Td"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 2,
            "initialState": {
              "dealer": 1,
              "upCard": "Jh",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Js",
                    "Ks",
                    "Ah",
                    "Ts"
                  ],
                  [
                    "Td",
                    "9d",
                    "Ad",
                    "Kd"
                  ],
                  [
                    "9c",
                    "Kc",
                    "Jc",
                    "9s"
                  ],
                  [
                    "Qh",
                    "9h",
                    "Jh",
                    "Kh"
                  ],
                  [
                    "Qs",
                    "Tc",
                    "Jd",
                    "Th"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 3,
            "initialState": {
              "dealer": 2,
              "upCard": "Td",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "h"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ks",
                    "As",
                    "Js",
                    "Qs"
                  ],
                  [
                    "9h",
                    "9d",
                    "Ah",
                    "Jd"
                  ],
                  [
                    "9c",
                    "9s",
                    "Kc",
                    "Jc"
                  ],
                  [
                    "Ac",
                    "Qc",
                    "Kd",
                    "Qh"
                  ],
                  [
                    "Ad",
                    "Qd",
                    "Kh",
                    "Th"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 4,
            "initialState": {
              "dealer": 3,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "9s",
                    "Td",
                    "As",
                    "Ts"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "Jh",
                    "Th"
                  ],
                  [
                    "Qh",
                    "Js",
                    "9c",
                    "9h"
                  ],
                  [
                    "Ad",
                    "Qd",
                    "Qc",
                    "Jd"
                  ],
                  [
                    "Ac",
                    "Kc",
                    "Kd",
                    "Jc"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 5,
            "initialState": {
              "dealer": 0,
              "upCard": "9s",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "Ts",
                    "Kd",
                    "9h"
                  ],
                  [
                    "Th",
                    "Kh",
                    "Qh",
                    "Jd"
                  ],
                  [
                    "Ah",
                    "Qs",
                    "Jc",
                    "Jh"
                  ],
                  [
                    "Td",
                    "Tc",
                    "Ks",
                    "As"
                  ],
                  [
                    "9s",
                    "9d",
                    "Qc",
                    "Ac"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 6,
            "initialState": {
              "dealer": 1,
              "upCard": "Js",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jc",
                    "Ts",
                    "Qs",
                    "Js"
                  ],
                  [
                    "Ah",
                    "9s",
                    "Th",
                    "Qh"
                  ],
                  [
                    "Ks",
                    "Jh",
                    "9d",
                    "Tc"
                  ],
                  [
                    "As",
                    "Td",
                    "Qc",
                    "9c"
                  ],
                  [
                    "Jd",
                    "Kh",
                    "Qd",
                    "Ac"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 7,
            "initialState": {
              "dealer": 2,
              "upCard": "Qc",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Pass",
                  "Order"
                ],
                "isAlone": false,
                "discard": "Qh"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "Ad",
                    "Td",
                    "Kd"
                  ],
                  [
                    "9h",
                    "Jh",
                    "Qc",
                    "Js"
                  ],
                  [
                    "As",
                    "Kc",
                    "Qs",
                    "9s"
                  ],
                  [
                    "9d",
                    "9c",
                    "Tc",
                    "Jc"
                  ],
                  [
                    "Ts",
                    "Ac",
                    "Kh",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 8,
            "initialState": {
              "dealer": 3,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Qd",
                    "Jd",
                    "Th",
                    "9d"
                  ],
                  [
                    "Ac",
                    "Tc",
                    "9h",
                    "Kc"
                  ],
                  [
                    "Qc",
                    "Jc",
                    "Kd",
                    "Qh"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "9c",
                    "Qs"
                  ],
                  [
                    "Js",
                    "As",
                    "Td",
                    "Ks"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 9,
            "initialState": {
              "dealer": 0,
              "upCard": "Tc",
              "playerCards": [
                [],
                [],
                [
                  "As",
                  "Ts",
                  "9s",
                  "Ac",
                  "Jh"
                ],
                []
              ]
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
                    "Ah",
                    "Qh",
                    "Tc"
                  ],
                  [
                    "Jc",
                    "9h",
                    "9c"
                  ],
                  [
                    "Kc",
                    "Kd",
                    "Kh"
                  ],
                  [
                    "Qc",
                    "9d",
                    "Qd"
                  ],
                  [
                    "Td",
                    "Ad",
                    "Qs"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 10,
            "initialState": {
              "dealer": 1,
              "upCard": "9h",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                    "9s",
                    "As",
                    "Ks",
                    "Tc"
                  ],
                  [
                    "Ts",
                    "Kh",
                    "Ah",
                    "Js"
                  ],
                  [
                    "9h",
                    "Jh",
                    "Jd",
                    "Qh"
                  ],
                  [
                    "Ac",
                    "9d",
                    "Kc",
                    "Jc"
                  ],
                  [
                    "9c",
                    "Td",
                    "Qd",
                    "Th"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 11,
            "initialState": {
              "dealer": 2,
              "upCard": "Qd",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                  "Pass",
                  "s"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ad",
                    "Td",
                    "Kd",
                    "9s"
                  ],
                  [
                    "Ts",
                    "Qs",
                    "Js",
                    "Jc"
                  ],
                  [
                    "Kh",
                    "Jh",
                    "Ah",
                    "Qh"
                  ],
                  [
                    "Tc",
                    "9c",
                    "Ks",
                    "Ac"
                  ],
                  [
                    "9h",
                    "Th",
                    "Kc",
                    "Jd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 12,
            "initialState": {
              "dealer": 3,
              "upCard": "Qc",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": false
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "9s",
                    "Qs",
                    "As",
                    "Qc"
                  ],
                  [
                    "Ah",
                    "Kh",
                    "Th",
                    "Tc"
                  ],
                  [
                    "Kd",
                    "Jd",
                    "9c",
                    "Td"
                  ],
                  [
                    "Jc",
                    "9d",
                    "Ts",
                    "Js"
                  ],
                  [
                    "Ac",
                    "Jh",
                    "Ks",
                    "Qd"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 13,
            "initialState": {
              "dealer": 0,
              "upCard": "9d",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
                  "Order"
                ],
                "isAlone": true
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Jd",
                    "9h",
                    "Td"
                  ],
                  [
                    "Jh",
                    "Qh",
                    "Qd"
                  ],
                  [
                    "Ad",
                    "Ac",
                    "9d"
                  ],
                  [
                    "As",
                    "Ks",
                    "9c"
                  ],
                  [
                    "Tc",
                    "Kc",
                    "Kh"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 14,
            "initialState": {
              "dealer": 1,
              "upCard": "Ah",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
            },
            "phases": [
              {
                "phaseNumber": 0,
                "type": "EUCHRE_BIDDING",
                "calls": [
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
                    "Ac",
                    "9h",
                    "Tc",
                    "Kc"
                  ],
                  [
                    "Th",
                    "Jh",
                    "Jd",
                    "9d"
                  ],
                  [
                    "Jc",
                    "Td",
                    "Qd",
                    "Qh"
                  ],
                  [
                    "Js",
                    "9s",
                    "Ad",
                    "Ks"
                  ],
                  [
                    "As",
                    "Kh",
                    "Kd",
                    "Ah"
                  ]
                ]
              }
            ]
          },
          {
            "dealNumber": 15,
            "initialState": {
              "dealer": 2,
              "upCard": "Ad",
              "playerCards": [
                [],
                [],
                [],
                []
              ]
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
                "isAlone": false,
                "discard": "Js"
              },
              {
                "phaseNumber": 1,
                "type": "TRICK_PLAY",
                "tricks": [
                  [
                    "Ac",
                    "Jc",
                    "9c",
                    "Qd"
                  ],
                  [
                    "Jd",
                    "Th",
                    "Kd",
                    "9d"
                  ],
                  [
                    "Ah",
                    "Kc",
                    "9h",
                    "Qh"
                  ],
                  [
                    "Ad",
                    "Qs",
                    "Qc",
                    "Jh"
                  ],
                  [
                    "Ts",
                    "Kh",
                    "As",
                    "Ks"
                  ]
                ]
              }
            ]
          }
        ]
      }
    }
  ]
};
