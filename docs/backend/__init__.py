# -*- coding: utf-8 -*-
"""JesenY Blog 后端服务：提供静态站点与可选 API。"""

import os
from flask import Flask, send_from_directory

# 项目根目录（backend 的上级）
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def create_app(config_overrides=None):
    app = Flask(__name__, static_folder=BASE_DIR, static_url_path="")
    app.config.update(
        ENV=os.environ.get("FLASK_ENV", "development"),
        DEBUG=os.environ.get("FLASK_DEBUG", "1").strip().lower() in ("1", "true", "yes"),
    )
    if config_overrides:
        app.config.update(config_overrides)

    # 首页
    @app.route("/")
    def index():
        return send_from_directory(BASE_DIR, "index.html")

    # 项目详情页
    @app.route("/project-details.html")
    def project_details():
        return send_from_directory(BASE_DIR, "project-details.html")

    # 健康检查（便于部署/监控）
    @app.route("/health")
    def health():
        return {"status": "ok"}, 200

    # 避免 /favicon.ico 请求返回 404
    @app.route("/favicon.ico")
    def favicon():
        return "", 204

    return app
