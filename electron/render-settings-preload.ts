import { contextBridge, ipcRenderer } from "electron";

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

contextBridge.exposeInMainWorld("renderAPI", {
  getPlatform: () => ipcRenderer.invoke("render:getPlatform"),
  getOutputPath: () => ipcRenderer.invoke("render:getOutputPath"),
  ensureBackend: () => ipcRenderer.invoke("render:ensureBackend"),
  prepareRender: (payload: RenderPreparePayload) =>
    ipcRenderer.invoke("render:prepare", payload),
  startRender: (payload: RenderStartPayload) =>
    ipcRenderer.invoke("render:start", payload),
  openProgress: () => ipcRenderer.invoke("render:openProgress"),
});
