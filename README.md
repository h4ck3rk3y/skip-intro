# Skip Intro

Do you like me listen to podcasts and videos on Youtube?
Do you like me get annoyed by the intros and the advertisements for AG-1?

Look no further. This repository solves your problem, or at least tries to.

https://www.loom.com/share/1b689b96392a479c89125c3fff39e0b9

# Instructions

1. Clone the Repository
1. You will need a `.env` file in the root of the repository with "OPENAI_API_KEY=" set
1. I am using poetry, use it to install all dependencies
1. Get the backend running using `uvicorn main:app --reload`
1. Load the extension into Chrome after enabling developer mode in the extensions page
1. Load any Youtube video of choice


# Known weirdness

This was written in very little time and with GPTs help. All of the chrome extension is me using GPT-3 via chat.

As of now it works when you open a video in a new page but it doesn't quite work when you navigate from one
video to another; because of how YouTube handles page navigations. Hopefully this isn't true after
I release this.

The skipping is best effort!

# Contributions
Just create an issue or a PR; it will be reviewed swiftly
