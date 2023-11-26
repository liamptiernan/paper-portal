import aiofiles
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

from fastapi import FastAPI, Request, status
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

from backend.app.routes import publications
from backend.app.utils.cors import cors

frontend_build_dir = Path(__file__).parent.joinpath("../../frontend/dist").resolve()
frontend_html = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global frontend_html
    async with aiofiles.open(frontend_build_dir.joinpath("index.html")) as file:
        frontend_html = await file.read()
    yield
    return


app = FastAPI(lifespan=lifespan)
# app = FastAPI()
cors(app)


@app.middleware("http")
async def frontend_routing(request: Request, call_next: Any):
    response = await call_next(request)
    if (
        response.status_code == status.HTTP_404_NOT_FOUND
        and not request.url.path.startswith("/api")
    ):
        return HTMLResponse(frontend_html)
    return response


@app.get("/ping", include_in_schema=False)
async def ping():
    return {"ok": True}


api_prefix = "/api/v1"
app.include_router(publications.router, prefix=api_prefix)
app.mount("/", StaticFiles(directory=frontend_build_dir, html=True), name="static")
