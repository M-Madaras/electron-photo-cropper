import { Channels } from 'main/preload';

declare global {
  // intereface we are defining
  interface Window {
    electron: {
      saveCroppedImage(args: unknown[]): void;
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
