"use client";

import { useEffect } from "react";

export default function ChatbotInjector() {
  useEffect(() => {
    // Avoid duplicate injection
    if (document.getElementById('yourgpt-chatbot')) return;

    // Widget config
    (window as any).YGC_WIDGET_ID = "b4c7dfdf-8b43-49a8-b686-5f63c170ae0a";

    const script = document.createElement('script');
    script.src = 'https://widget.yourgpt.ai/script.js';
    script.id = 'yourgpt-chatbot';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // keep script loaded for the session; do not remove on unmount to persist widget
    };
  }, []);

  return null;
}
