"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {
            "input": [("X....XXX",
                       "X....XXX",
                       "X....XXX",
                       "X....XXX",
                       "X....XXX",
                       "X......X",
                       "X......X",
                       "X......X",
                       "X......X",
                       "XXX....X"), 0],
            "answer": 8,
            "explanation": ("XOOOOXXX",
                            "X||||XXX",
                            "X||||XXX",
                            "X||||XXX",
                            "X||||XXX",
                            "X|||>>|X",
                            "X||>>||X",
                            "X|>>|||X",
                            "X>>||||X",
                            "XXX||||X")
        },
        {
            "input": [("X....XXX",
                       "X....XXX",
                       "X....XXX",
                       "X....XXX",
                       "X....XXX",
                       "X......X",
                       "X......X",
                       "X......X",
                       "X......X",
                       "XXX....X"), 7],
            "answer": 18,
            "explanation": ("XOOOOXXX",
                            "X||||XXX",
                            "X||||XXX",
                            "X||||XXX",
                            "X||||XXX",
                            "X|||>>|X",
                            "X||>>||X",
                            "X|>>|||X",
                            "X>>||||X",
                            "XXX||||X")
        },
        {
            "input": [("X....XXX",
                       "X....XXX",
                       "X....XXX",
                       "X....XXX",
                       "X....XXX",
                       "X......X",
                       "X......X",
                       "X......X",
                       "X......X",
                       "XXX....X"), 9],
            "answer": 15,
            "explanation": ("XOOOOXXX",
                            "X||||XXX",
                            "X||||XXX",
                            "X||||XXX",
                            "X||||XXX",
                            "X|||>>|X",
                            "X||>>||X",
                            "X|>>|||X",
                            "X>>||||X",
                            "XXX||||X")
        },
    ],
    "Extra": [
        {
            "input": [6, 3],
            "answer": 9,
            "explanation": "6+3=?"
        },
        {
            "input": [6, 7],
            "answer": 13,
            "explanation": "6+7=?"
        }
    ]
}
