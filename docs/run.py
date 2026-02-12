# -*- coding: utf-8 -*-
"""JesenY Blog 启动入口：支持直接运行与 flask run。"""
import os
import sys

# 确保项目根在 path 中
_ROOT = os.path.dirname(os.path.abspath(__file__))
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

from backend import create_app

app = create_app()


def _run_server(host=None, port=None, debug=None):
    """根据环境变量或参数启动开发服务器。"""
    host = host or os.environ.get("HOST", "0.0.0.0")
    port = int(port or os.environ.get("PORT", 8787))
    if debug is None:
        debug = os.environ.get("FLASK_DEBUG", "1").strip().lower() in ("1", "true", "yes")

    display_host = "127.0.0.1" if host == "0.0.0.0" else host
    print("=" * 50)
    print("  JesenY Blog")
    print("  本地访问: http://{}:{}".format(display_host, port))
    if host == "0.0.0.0":
        print("  局域网:   http://<本机IP>:{}".format(port))
    print("  健康检查: http://{}:{}/health".format(display_host, port))
    print("=" * 50)

    app.run(host=host, port=port, debug=debug, use_reloader=debug)


if __name__ == "__main__":
    import argparse

    p = argparse.ArgumentParser(description="启动 JesenY Blog 服务")
    p.add_argument("--host", default=None, help="监听地址 (默认: 0.0.0.0)")
    p.add_argument("--port", "-p", type=int, default=None, help="端口 (默认: 8787)")
    p.add_argument("--no-debug", action="store_true", help="关闭调试模式")
    args = p.parse_args()

    _run_server(host=args.host, port=args.port, debug=not args.no_debug)
