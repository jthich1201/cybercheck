export const QuestionsData = [
    {
        "question_id": "0",
        "question": "This is question 0",
        "options": [
            {
                "option_text": "Option 1 c:",
                "next_question": "1"
            },
            {
                "option_text": "Option 2 c:",
                "next_question": "1"
            },
            {
                "option_text": "Option 3 c:",
                "next_question": "2"
            },
            {
                "option_text": "Option 4 c:",
                "next_question": "3"
            }
        ]
    },
    {
        "question_id": "1",
        "question": "This is question 1. You must have selected option 1, 2 in Question 0.",
        "options": [
            {
                "option_text": "Option 1",
                "next_question": "4"
            },
            {
                "option_text": "Option 2",
                "next_question": "2"
            },
            {
                "option_text": "Option 3",
                "next_question": "4"
            },
            {
                "option_text": "Option 4",
                "next_question": "4"
            }
        ]
    },
    {
        "question_id": "2",
        "question": "This is question 2. You must have selected option 3 in Question 0 or option 2 in Question 1.",
        "options": [
            {
                "option_text": "Option 1",
                "next_question": "4"
            },
            {
                "option_text": "Option 2",
                "next_question": "4"
            },
            {
                "option_text": "Option 4",
                "next_question": "4"
            }
        ]
    },
    {
        "question_id": "3",
        "question": "This is question 3. You must have selected option 4 in Question 0",
        "options": [
            {
                "option_text": "Option 1",
                "next_question": "4"
            },
            {
                "option_text": "Option 2",
                "next_question": "4"
            },
            {
                "option_text": "Option 3",
                "next_question": "4"
            },
            {
                "option_text": "Option 4",
                "next_question": "4"
            }
        ]
    },
    {
        "question_id": "4",
        "question": "This is question 4. The final question",
        "options": [
            {
                "option_text": "Option 1",
                "next_question": "-1"
            },
            {
                "option_text": "Option 2",
                "next_question": "-1"
            },
            {
                "option_text": "Option 3",
                "next_question": "-1"
            },
            {
                "option_text": "Option 4",
                "next_question": "-1"
            }
        ]
    }
    
]