"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAllowedEmbedDomain } from "@/lib/utils";
import { EMBED_ALLOWED_DOMAINS } from "@/lib/config";

export function EmbedPanel({ embedUrl, externalUrl }: { embedUrl: string | null; externalUrl: string | null }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!embedUrl) return;
    const t = setTimeout(() => setFailed(true), 6000);
    return () => clearTimeout(t);
  }, [embedUrl]);

  if (!embedUrl) {
    return <Fallback externalUrl={externalUrl} reason="Embed URL is not configured" />;
  }

  if (!isAllowedEmbedDomain(embedUrl, EMBED_ALLOWED_DOMAINS)) {
    return <Fallback externalUrl={externalUrl} reason="Domain is not in embed allowlist" />;
  }

  return (
    <div className="space-y-3">
      {!failed ? (
        <iframe
          src={embedUrl}
          title="Embedded AI service"
          className="h-[65vh] w-full rounded-xl3 border border-border bg-black"
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
          onLoad={() => setFailed(false)}
        />
      ) : null}
      {failed ? <Fallback externalUrl={externalUrl} reason="Embed timed out or was blocked." /> : null}
    </div>
  );
}

function Fallback({ externalUrl, reason }: { externalUrl: string | null; reason: string }) {
  return (
    <div className="rounded-xl3 border border-border bg-panel p-6">
      <div className="mb-3 flex items-center gap-2 text-vivid"><AlertTriangle className="h-4 w-4" /> Embed unavailable</div>
      <p className="mb-4 text-sm text-subtle">{reason}</p>
      {externalUrl ? (
        <a href={externalUrl} target="_blank" rel="noreferrer"><Button variant="outline">Open external <ExternalLink className="ml-2 h-4 w-4" /></Button></a>
      ) : null}
    </div>
  );
}
