import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import styles from './Canvas.module.css';

export interface CanvasRef {
  getCanvas: () => HTMLCanvasElement | null;
  getContext: () => CanvasRenderingContext2D | null;
}

interface CanvasProps {
  filter?: string;
  onReady?: () => void;
}

export const Canvas = forwardRef<CanvasRef, CanvasProps>(({ filter = '', onReady }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
    getContext: () => canvasRef.current?.getContext('2d') || null,
  }));

  useEffect(() => {
    if (canvasRef.current && onReady) {
      console.log('Canvas mounted and ready');
      onReady();
    }
  }, [onReady]);

  return (
    <div className={styles.canvasContainer}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{ filter }}
      />
    </div>
  );
});