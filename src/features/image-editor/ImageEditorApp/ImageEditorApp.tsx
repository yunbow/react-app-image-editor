import { useEffect } from 'react';
import { useImageEditor } from '../useImageEditor';
import { FileInput } from '../../../components/FileInput';
import { Canvas } from '../../../components/Canvas';
import { Button } from '../../../components/Button';
import { ColorAdjustments } from '../components/ColorAdjustments';
import { FilterButtons } from '../components/FilterButtons';
import { TransformControls } from '../components/TransformControls';
import { ResizeControls } from '../components/ResizeControls';
import styles from './ImageEditorApp.module.css';

export const ImageEditorApp = () => {
  const {
    canvasRef,
    imageLoaded,
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
  } = useImageEditor();

  useEffect(() => {
    redrawImage();
  }, [editState.rotation, editState.flipX, editState.flipY, imageLoaded, redrawImage]);

  useEffect(() => {
    applyFilters();
  }, [editState.brightness, editState.contrast, editState.saturation, editState.filter, applyFilters]);

  const getFilterString = () => {
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

    return filterString;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>画像編集アプリ</h1>

      <FileInput onFileSelect={loadImage} />

      <div className={styles.editorContainer}>
        <Canvas ref={canvasRef} filter={getFilterString()} onReady={handleCanvasReady} />

        {imageLoaded && (
          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <h3>基本編集</h3>
              <ColorAdjustments
                brightness={editState.brightness}
                contrast={editState.contrast}
                saturation={editState.saturation}
                onBrightnessChange={updateBrightness}
                onContrastChange={updateContrast}
                onSaturationChange={updateSaturation}
              />
            </div>

            <div className={styles.controlGroup}>
              <h3>フィルター</h3>
              <FilterButtons
                activeFilter={editState.filter}
                onFilterChange={updateFilter}
              />
            </div>

            <div className={styles.controlGroup}>
              <h3>回転・反転</h3>
              <TransformControls
                onRotateLeft={rotateLeft}
                onRotateRight={rotateRight}
                onFlipHorizontal={flipHorizontal}
                onFlipVertical={flipVertical}
              />
            </div>

            <div className={styles.controlGroup}>
              <h3>サイズ変更</h3>
              <ResizeControls
                dimensions={dimensions}
                keepAspectRatio={keepAspectRatio}
                onDimensionsChange={updateDimensions}
                onKeepAspectRatioChange={setKeepAspectRatio}
                onApplyResize={applyResize}
              />
            </div>
          </div>
        )}
      </div>

      {imageLoaded && (
        <div className={styles.actionButtons}>
          <Button onClick={reset}>リセット</Button>
          <Button onClick={download} variant="primary">ダウンロード</Button>
        </div>
      )}
    </div>
  );
};