#!/usr/bin/env python3
"""简化的启动脚本"""
import uvicorn
from main import app

if __name__ == "__main__":
    print("Starting PATX Claim Chart Services...")
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8001,
        reload=False,
        log_level="info"
    )
