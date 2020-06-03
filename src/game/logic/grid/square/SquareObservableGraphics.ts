export default interface SquareObservableGraphics {
  onHighlight: (color: number) => void;
  onUnHighlight: () => void;
  onSetToken: (color: number) => void;
  
  over(): void;
  out(): void;
  up(): void;
}