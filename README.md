# 画像編集アプリ (TypeScript + React + Storybook)

React 18とTypeScriptで構築された画像編集アプリケーションです。機能別のモジュラーアーキテクチャを採用しています。

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
├── features/                      # 機能別モジュール
│   └── image-editor/              # 画像編集機能
│       ├── components/            # 機能専用コンポーネント
│       │   ├── ColorAdjustments/  # 色調補正コントロール
│       │   ├── FilterButtons/     # フィルターボタン群
│       │   ├── TransformControls/ # 変形コントロール
│       │   └── ResizeControls/    # リサイズコントロール
│       ├── ImageEditorApp/        # 機能ルートコンポーネント
│       ├── useImageEditor.ts      # 画像編集ロジックフック
│       └── types.ts               # 機能固有の型定義
├── components/                    # 共通UIコンポーネント
│   ├── Button/                    # 操作ボタン
│   ├── Slider/                    # スライダー入力
│   ├── FileInput/                 # ファイル入力
│   ├── Canvas/                    # キャンバス表示
│   ├── NumberInput/               # 数値入力
│   └── Checkbox/                  # チェックボックス
├── stories/                       # Storybook用ストーリー
├── App.tsx                        # メインアプリ
└── main.tsx                       # エントリーポイント
```

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