# SPECIFICATION

## アーキテクチャ (Architecture)

- **HTML**: M3に準拠したセマンティックHTMLへと構造をリファクタリングする。
- **CSS フレームワーク**: Tailwind CSS をCDN経由で読み込み、M3特有のデザイントークン（Color, Elevation, Typography）をユーティリティクラス（`bg-surface-container`, `text-on-surface`, `shadow-md` など）を用いて再現する。
- **UI Components**: `assets/js/ui.js` 内で定義されている Web Components (`<site-header>`, `<site-footer>`) の出力HTMLも、Tailwind CSS + M3の仕様に合わせて書き換える。

## デザイン仕様 (Material Design 3)

1. **Color Roles**:
   - `Primary`, `On-Primary`, `Primary-Container`, `On-Primary-Container` の適用。
   - `Surface`, `Surface-Container-Lowest` から `Surface-Container-Highest` の多段階の表面色設定によるTonal Elevationの実現。
2. **Typography**: Google Fonts の `Inter` をそのまま利用しつつ、Display, Headline, Title, Body, Label のスケールに則ったTailwindクラスの運用。
3. **State Layers**: ホバー（`hover:bg-primary/8` などの擬似クラス）やフォーカス（`focus:ring`）の適切な設定。

## 変換機能

- 既存の変換処理ロジック（JavaScript）は一切変更せず、UI層（View）のみを改修する。
