@echo off
chcp 65001 >nul
cd /d "%~dp0"

if not exist "backend\__init__.py" (
    echo [错误] 未找到 backend 模块，请确保在项目根目录执行。
    pause
    exit /b 1
)

echo 正在启动 JesenY Blog 服务...
echo.
python run.py %*
if errorlevel 1 (
    echo.
    echo 若未安装依赖，请先执行: pip install -r requirements.txt
    pause
    exit /b 1
)
