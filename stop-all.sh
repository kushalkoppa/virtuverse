#!/bin/bash

# VirtuVerse Stop All Services Script

echo "🛑 Stopping all VirtuVerse services..."
echo ""

# Stop services using PIDs
if [ -d ".pids" ]; then
    for pidfile in .pids/*.pid; do
        if [ -f "$pidfile" ]; then
            PID=$(cat "$pidfile")
            SERVICE=$(basename "$pidfile" .pid)
            if kill -0 $PID 2>/dev/null; then
                echo "Stopping $SERVICE (PID: $PID)..."
                kill $PID
            else
                echo "$SERVICE is not running (PID: $PID)"
            fi
            rm "$pidfile"
        fi
    done
    rmdir .pids 2>/dev/null
else
    echo "No PID files found. Services might not be running."
fi

echo ""
echo "✅ All services stopped."
