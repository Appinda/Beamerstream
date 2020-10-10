export default interface AppWindow {

  show(): void;
  showWhenReady(): Promise<void>;
  close(): void;
  destroy(): void;
  
}