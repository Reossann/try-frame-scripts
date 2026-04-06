/// <reference types="vite/client" />

type RenderStartPayload = {
  width: number;
  height: number;
  fps: number;
  totalFrames: number;
  workers: number;
  encode: "H264" | "H265";
  preset: string;
  ffmpegThreads: number;
  ffmpegLowMemory: boolean;
};

type RenderPreparePayload = {
  fps: number;
  segments: unknown[];
  loudness?: "youtube";
  cacheGiB: number;
  totalFrames: number;
};

interface Window {
  renderAPI?: {
    getPlatform: () => Promise<{
      platform: string;
      binPath: string;
      binName: string;
      isDev?: boolean;
    }>;
    getOutputPath: () => Promise<{ path: string; displayPath?: string }>;
    ensureBackend: () => Promise<{ ok: true }>;
    prepareRender: (payload: RenderPreparePayload) => Promise<{ ok: true }>;
    startRender: (
      payload: RenderStartPayload,
    ) => Promise<{ cmd: string; pid: number | undefined }>;
    openProgress: () => Promise<void>;
  };
}
