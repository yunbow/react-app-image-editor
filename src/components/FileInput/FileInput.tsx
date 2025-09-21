import styles from './FileInput.module.css';

interface FileInputProps {
  onFileSelect: (file: File) => void;
}

export const FileInput = ({ onFileSelect }: FileInputProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.match('image.*')) {
      onFileSelect(file);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />
      <label htmlFor="imageUpload" className={styles.uploadBtn}>
        画像をアップロード
      </label>
    </div>
  );
};