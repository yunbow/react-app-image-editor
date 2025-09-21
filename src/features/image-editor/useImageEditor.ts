import { useState, useRef, useCallback } from 'react';
import { EditState, FilterType, ImageDimensions } from './types';
import { CanvasRef } from '../../components/Canvas';

export const useImageEditor = () => {
  const canvasRef = useRef<CanvasRef>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);
  const currentImageRef = useRef<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [dimensions, setDimensions] = useState<ImageDimensions>({ width: 0, height: 0 });
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);

  const [editState, setEditState] = useState<EditState>({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    filter: 'none',
    rotation: 0,
    flipX: false,
    flipY: false
  });

  // Canvas準備完了通知
  const handleCanvasReady = useCallback(() => {
    console.log('Canvas ready callback received');
    setCanvasReady(true);
  }, []);



  const loadImage = useCallback((file: File) => {
    console.log('loadImage called');
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        console.log('Image loaded, processing...');

        // 直接Canvas操作を実行
        const canvas = canvasRef.current?.getCanvas();
        const ctx = canvasRef.current?.getContext();

        if (canvas && ctx) {
          console.log('Canvas ready, drawing image...');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // 画像参照を設定してonloadイベントで状態更新
          originalImageRef.current = new Image();
          originalImageRef.current.onload = () => {
            currentImageRef.current = new Image();
            currentImageRef.current.onload = () => {
              setDimensions({ width: img.width, height: img.height });
              setImageLoaded(true);
              console.log('Image loaded successfully');
            };
            currentImageRef.current.src = canvas.toDataURL();
          };
          originalImageRef.current.src = canvas.toDataURL();
        } else {
          console.error('Canvas または Context が取得できません');
          console.log('canvasRef.current:', canvasRef.current);
          console.log('canvas:', canvas);
          console.log('ctx:', ctx);
        }
      };
      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  }, []);

  const redrawImage = useCallback(() => {
    console.log('redrawImage called:', { imageLoaded, hasCurrentImage: !!currentImageRef.current });

    if (!imageLoaded || !currentImageRef.current) {
      console.log('redrawImage early return');
      return;
    }

    const canvas = canvasRef.current?.getCanvas();
    const ctx = canvasRef.current?.getContext();

    if (canvas && ctx) {
      console.log('redrawImage executing with canvas:', canvas.width, canvas.height);

      // 単純な描画（変形なし）で確認
      if (editState.rotation === 0 && !editState.flipX && !editState.flipY) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(currentImageRef.current, 0, 0);
      } else {
        // 変形ありの場合
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(editState.rotation * Math.PI / 180);
        ctx.scale(
          editState.flipX ? -1 : 1,
          editState.flipY ? -1 : 1
        );

        ctx.drawImage(
          currentImageRef.current,
          -currentImageRef.current.width / 2,
          -currentImageRef.current.height / 2,
          currentImageRef.current.width,
          currentImageRef.current.height
        );

        ctx.restore();
      }

      applyFilters();
    } else {
      console.error('Canvas または Context が取得できません（redrawImage）');
    }
  }, [editState, imageLoaded]);

  const applyFilters = useCallback(() => {
    if (!imageLoaded) return;

    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;

    let filterString = '';

    if (editState.brightness !== 0) {
      filterString += `brightness(${100 + editState.brightness}%) `;
    }
    if (editState.contrast !== 0) {
      filterString += `contrast(${100 + editState.contrast}%) `;
    }
    if (editState.saturation !== 0) {
      filterString += `saturate(${100 + editState.saturation}%) `;
    }

    switch (editState.filter) {
      case 'grayscale':
        filterString += 'grayscale(100%) ';
        break;
      case 'sepia':
        filterString += 'sepia(100%) ';
        break;
      case 'invert':
        filterString += 'invert(100%) ';
        break;
      case 'blur':
        filterString += 'blur(5px) ';
        break;
    }

    canvas.style.filter = filterString;
  }, [editState, imageLoaded]);

  const processAndSaveImage = useCallback(() => {
    if (!imageLoaded) return;

    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    if (tempCtx) {
      tempCtx.filter = canvas.style.filter;
      tempCtx.drawImage(canvas, 0, 0);

      if (currentImageRef.current) {
        currentImageRef.current.onload = () => {
          setEditState({
            brightness: 0,
            contrast: 0,
            saturation: 0,
            filter: 'none',
            rotation: 0,
            flipX: false,
            flipY: false
          });

          const canvas = canvasRef.current?.getCanvas();
          const ctx = canvasRef.current?.getContext();

          if (canvas && ctx && currentImageRef.current) {
            canvas.style.filter = '';
            canvas.width = currentImageRef.current.width;
            canvas.height = currentImageRef.current.height;
            ctx.drawImage(currentImageRef.current, 0, 0);
          }
        };
        currentImageRef.current.src = tempCanvas.toDataURL();
      }
    }
  }, [imageLoaded]);

  const updateBrightness = useCallback((value: number) => {
    setEditState(prev => ({ ...prev, brightness: value }));
  }, []);

  const updateContrast = useCallback((value: number) => {
    setEditState(prev => ({ ...prev, contrast: value }));
  }, []);

  const updateSaturation = useCallback((value: number) => {
    setEditState(prev => ({ ...prev, saturation: value }));
  }, []);

  const updateFilter = useCallback((filter: FilterType) => {
    setEditState(prev => ({ ...prev, filter }));
  }, []);

  const rotateLeft = useCallback(() => {
    setEditState(prev => ({
      ...prev,
      rotation: prev.rotation - 90 < 0 ? prev.rotation + 270 : prev.rotation - 90
    }));
  }, []);

  const rotateRight = useCallback(() => {
    setEditState(prev => ({
      ...prev,
      rotation: prev.rotation + 90 >= 360 ? prev.rotation - 270 : prev.rotation + 90
    }));
  }, []);

  const flipHorizontal = useCallback(() => {
    setEditState(prev => ({ ...prev, flipX: !prev.flipX }));
  }, []);

  const flipVertical = useCallback(() => {
    setEditState(prev => ({ ...prev, flipY: !prev.flipY }));
  }, []);

  const updateDimensions = useCallback((newDimensions: ImageDimensions) => {
    if (keepAspectRatio && originalImageRef.current) {
      if (newDimensions.width !== dimensions.width) {
        const ratio = originalImageRef.current.height / originalImageRef.current.width;
        setDimensions({
          width: newDimensions.width,
          height: Math.round(newDimensions.width * ratio)
        });
      } else if (newDimensions.height !== dimensions.height) {
        const ratio = originalImageRef.current.width / originalImageRef.current.height;
        setDimensions({
          width: Math.round(newDimensions.height * ratio),
          height: newDimensions.height
        });
      }
    } else {
      setDimensions(newDimensions);
    }
  }, [dimensions, keepAspectRatio]);

  const applyResize = useCallback(() => {
    if (!imageLoaded || !currentImageRef.current) return;

    processAndSaveImage();

    setTimeout(() => {
      const canvas = canvasRef.current?.getCanvas();
      const ctx = canvasRef.current?.getContext();

      if (canvas && ctx && currentImageRef.current) {
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        ctx.drawImage(currentImageRef.current, 0, 0, dimensions.width, dimensions.height);

        currentImageRef.current = new Image();
        currentImageRef.current.src = canvas.toDataURL();
      }
    }, 100);
  }, [dimensions, imageLoaded, processAndSaveImage]);

  const reset = useCallback(() => {
    if (!imageLoaded || !originalImageRef.current) return;

    const canvas = canvasRef.current?.getCanvas();
    const ctx = canvasRef.current?.getContext();

    if (canvas && ctx) {
      currentImageRef.current = new Image();
      currentImageRef.current.onload = () => {
        if (canvas && ctx && originalImageRef.current && currentImageRef.current) {
          canvas.width = originalImageRef.current.width;
          canvas.height = originalImageRef.current.height;
          ctx.drawImage(originalImageRef.current, 0, 0);

          setEditState({
            brightness: 0,
            contrast: 0,
            saturation: 0,
            filter: 'none',
            rotation: 0,
            flipX: false,
            flipY: false
          });

          canvas.style.filter = '';
          setDimensions({
            width: originalImageRef.current.width,
            height: originalImageRef.current.height
          });
        }
      };
      currentImageRef.current.src = originalImageRef.current.src;
    }
  }, [imageLoaded]);

  const download = useCallback(() => {
    if (!imageLoaded) return;

    processAndSaveImage();

    setTimeout(() => {
      const canvas = canvasRef.current?.getCanvas();
      if (canvas) {
        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    }, 300);
  }, [imageLoaded, processAndSaveImage]);

  return {
    canvasRef,
    imageLoaded,
    canvasReady,
    editState,
    dimensions,
    keepAspectRatio,
    loadImage,
    redrawImage,
    applyFilters,
    updateBrightness,
    updateContrast,
    updateSaturation,
    updateFilter,
    rotateLeft,
    rotateRight,
    flipHorizontal,
    flipVertical,
    updateDimensions,
    setKeepAspectRatio,
    applyResize,
    reset,
    download,
    handleCanvasReady
  };
};