from fastapi import FastAPI, HTTPException, Response
from skipper import get_intro_timestamp
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()   

origins = [
  "http://localhost:8000",
  "http://127.0.0.1:8000"
  "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/") 
async def main_route():     
  return {"message": "Hey, I help skip intros"}


@app.get("/skip-intro/{video_id}")
def skip_intro(video_id: str, response: Response):
  response.headers["Access-Control-Allow-Origin"] = "*"
  try:
    timestamp = get_intro_timestamp(video_id)  
    return {"timestamp": timestamp}
  except Exception as e:
    print("retrying as that quite didnt work")
    timestamp = get_intro_timestamp(video_id) 
    return {"timestamp": timestamp}
  except Exception as e:
    raise HTTPException(status_code=500, detail="Couldn't find the timestamp for the given video; try again or try a different url")