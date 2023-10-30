from fastapi import FastAPI

from backend.app.routes import publications
from backend.app.utils.cors import cors

app = FastAPI()
cors(app)

api_prefix = "/api/v1"
app.include_router(publications.router, prefix=api_prefix)


@app.get("/ping", include_in_schema=False)
async def ping():
    return {"ok": True}
