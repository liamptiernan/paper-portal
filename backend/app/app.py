from fastapi import FastAPI

app = FastAPI()


@app.get("/ping", include_in_schema=False)
async def ping():
    return {"ok": True}
