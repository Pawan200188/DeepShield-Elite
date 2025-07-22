from fastapi import FastAPI
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from routes import analysis

app = FastAPI(title="DeepShield Elite", description="Image Object Detector")

# Mount static files (JS, CSS, images)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include API routes
app.include_router(analysis.router)

@app.get("/")
async def serve_index():
    return FileResponse("static/index.html")
