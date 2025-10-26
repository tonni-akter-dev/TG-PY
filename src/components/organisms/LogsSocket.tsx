/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LogsSocket.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { JSX } from 'react/jsx-runtime';

type LogMessage = Record<string, any> | string;

export default function LogsSocket(): JSX.Element {
    const [logs, setLogs] = useState<LogMessage[]>([]);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const url = 'wss://api.vipadtg.com/api/v1/logs/files';
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => console.log('WS connected');
        ws.onmessage = (ev: MessageEvent) => {
            try {
                const data = JSON.parse(ev.data);
                setLogs(prev => [data, ...prev].slice(0, 200));
            } catch {
                setLogs(prev => [ev.data, ...prev].slice(0, 200));
            }
        };
        ws.onerror = (e) => console.error('WS error', e);
        ws.onclose = () => console.log('WS closed');

        return () => ws.close();
    }, []);

    return (
        <div>
            <h3>Realtime logs</h3>
            <div style={{ maxHeight: 400, overflow: 'auto' }}>
                {logs.map((l, i) => <pre key={i}>{typeof l === 'string' ? l : JSON.stringify(l, null, 2)}</pre>)}
            </div>
        </div>
    );
}
