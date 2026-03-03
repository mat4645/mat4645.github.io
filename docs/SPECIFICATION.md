# SPECIFICATION (100-Point Ultimate Architecture)

## アーキテクチャ (Architecture)

- **フロントエンド**: HTML5, Vanilla JavaScript, Web Workers, Service Workers (PWA化)
- **CSS フレームワーク**: Tailwind CSS v4 を導入し、Material Design 3 (M3) 特有のデザイントークン（Color, Elevation, Typography）とGlassmorphismを適用。
- **データ・ステート管理**: サーバーへの送信を一切行わず、`FileReader API` を用いた完全ローカルでの同期・非同期処理。
- **UI Components**: `assets/js/ui.js` 内で `<site-header>`, `<site-footer>` を定義。

## パフォーマンス＆最適化 (True Performance)

- **非同期処理 (Web Workers)**: `worker-csv.js`, `worker-json.js` を導入。大容量ファイルのパース・変換処理をメインスレッドから分離し、UIフリーズを0に。
- **PWA (Progressive Web App)**: `manifest.json` と `sw.js` (Service Worker) によるオフラインキャッシュ戦略。ネットワーク切断時でも100%動作する最強のUXを提供。
- **DevEx (Developer Experience)**: `ESLint`, `Prettier`, `Husky`, `lint-staged` を導入。コミット時の自動整形と静的解析によりコード品質を自動防衛。
- **TDD (自動テスト)**: Playwrightを用いたE2Eテスト (`tests/`) によるリグレッション防止。

## セキュリティ (Absolute Security)

- **Content Security Policy (CSP)**: HTTP Header (`<meta http-equiv="Content-Security-Policy">`) により、Google Ads / Analytics 以外の全ての外部通信を物理的に遮断。XSS等の脅威を無効化。
- **Privacy Core**: サーバーへのデータ送信ゼロ。すべてブラウザ内で完結。

## デザイン仕様 (Premium UI/UX)

1. **Color Roles & Glassmorphism**: `Primary`, `Surface` 等のM3カラーに、透過背景・ブラー（`backdrop-blur`）を掛け合わせたモダンUI。
2. **Typography**: Google Fonts `Inter`。Tailwindによるレスポンシブスケール運用。
3. **Card UI & Interactions**: ホバー時等の滑らかなアニメーション(`transition-all`, `hover:-translate-y-1`)の適用。
