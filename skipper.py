from openai import OpenAI
from dotenv import load_dotenv
import requests
import os
from youtube_transcript_api import YouTubeTranscriptApi
from functools import cache


load_dotenv()

SYSTEM_PROMPT = """Your job is to analyze transcripts that are sent over and find the exact point in the video where the 
advertisements end and the actual content begins. The transcript is a list of dictionary that looks like \{'text': 'Content', 'start': floating_pointg_number, 'end': floating_point_number}. Note in some videos there might be multiple sections of advertisements.
There are some videos where there are no advertisemenmts at all. Most of these videos will have a main narrator that eventually introduces the guest; the content is when the guest starts speaking.
If the transcript is from the Kill Tony show it will mention Tony Hinchcliffe, RedBan etc; this is a bit different as they have two layers of advertisements before the actual content begins; in this case find where the guest is introduced. Wait for Tony Hincliffe to speak and introduce the guest or guests.
Answer in nothing more than the timestamp in seconds like '322'"""


def get_timestamp(transcript):
    transcript = transcript[:350]
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    completion = client.chat.completions.create(
        messages = [
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": f"Please find the exact timestamp where the content begins in: {transcript}"
            }
        ],
        # this is a bit janky as it uses a really fat model, if i had time and more coffee i'd cleanup line 15
        model="gpt-4-1106-preview",
    )
    return completion.choices[0].message.content


def get_transcript(video_id):
    return YouTubeTranscriptApi.get_transcript(video_id)


def get_intro_timestamp(video_id):
    timestamp = get_timestamp(get_transcript(video_id))
    timestamp = int(float(timestamp))
    return timestamp
