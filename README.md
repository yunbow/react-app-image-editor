# 画像編集アプリ (TypeScript + React + Storybook)

React 18とTypeScript、Atomic Designパターンで構築された画像編集アプリケーションです。

## デモプレイ
https://yunbow.github.io/react-app-image-editor/demo/

## 主要機能

### 画像処理
- 画像のアップロード（drag & drop対応）
- 明るさ・コントラスト・彩度の調整
- フィルター効果（モノクロ、セピア、反転、ぼかし）
- 回転・反転操作
- サイズ変更（縦横比維持オプション付き）

### 操作方法
- **画像アップロード**: ファイル選択ボタンから画像を選択
- **基本編集**: スライダーで明るさ、コントラスト、彩度を調整
- **フィルター**: ボタンクリックで各種フィルターを適用
- **回転・反転**: ボタンクリックで90度回転、水平・垂直反転
- **サイズ変更**: 数値入力でサイズ指定、縦横比維持可能
- **リセット**: 元画像に戻す
- **ダウンロード**: 編集済み画像をPNG形式で保存

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - プログラミング言語
- **Storybook 7** - コンポーネント開発・ドキュメント
- **CSS Modules** - スタイリング
- **Vite** - ビルドツール
- **HTML5 Canvas API** - 画像処理

## プロジェクト構造

```
src/
├── components/
│   ├── atoms/          # 基本コンポーネント
│   │   ├── Button/     # ボタンコンポーネント
│   │   ├── Slider/     # スライダーコンポーネント
│   │   ├── FileInput/  # ファイル入力コンポーネント
│   │   ├── Canvas/     # キャンバスコンポーネント
│   │   ├── NumberInput/ # 数値入力コンポーネント
│   │   └── Checkbox/   # チェックボックスコンポーネント
│   ├── molecules/      # 機能単位コンポーネント
│   │   ├── ColorAdjustments/    # 色調補正コントロール
│   │   ├── FilterButtons/       # フィルターボタン群
│   │   ├── TransformControls/   # 変形コントロール
│   │   └── ResizeControls/      # リサイズコントロール
│   └── organisms/      # 画面領域コンポーネント
│       └── ImageEditor/ # 画像エディター全体
├── hooks/              # カスタムフック
│   └── useImageEditor.ts # 画像編集ロジック
├── stories/            # Storybook用ストーリー
├── types/              # TypeScript型定義
├── App.tsx             # メインアプリ
└── main.tsx            # エントリーポイント
```

## Atomic Design構成

### Atoms（基本コンポーネント）
- `Button` - 操作ボタン
- `Slider` - スライダー入力
- `FileInput` - ファイル入力
- `Canvas` - 画像表示キャンバス
- `NumberInput` - 数値入力
- `Checkbox` - チェックボックス

### Molecules（機能単位）
- `ColorAdjustments` - 色調補正コントロール群
- `FilterButtons` - フィルターボタン群
- `TransformControls` - 変形操作コントロール群
- `ResizeControls` - リサイズコントロール群

### Organisms（画面領域）
- `ImageEditor` - 画像編集アプリケーション全体

## スクリプト

```bash
# セットアップ
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# Storybook起動
npm run storybook

# Storybook ビルド
npm run build-storybook
```

## ライセンス

MIT License