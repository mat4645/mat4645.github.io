# antigravity開発依頼MD（ConvertFileBox / Neubrutalismデザインシステム）

> 目的：このMDは、antigravity（エージェント型開発環境）にそのまま渡して実装を進めるための「作業指示書」です。  
> 前提：GitHub Pagesで動く静的サイト（HTML/CSS/JS中心）。SEOと再訪性、使いやすさ最優先。

---

## 0. ゴール（Definition of Done）
- [ ] 既存ツールページ群に **Neubrutalism** の共通デザインシステムを適用し、全体の見た目と操作感が統一されている  
- [ ] 主要UI（Card / Button / Input / Select / CodeBlock / Alert / FAQ / 安心ブロック）が共通CSSで定義され、各ページで再利用されている  
- [ ] モバイル幅（~768px）でレイアウトが崩れない  
- [ ] 既存機能（変換処理等）に影響を与えず、表示崩れ・アクセシビリティ（focus可視化）も改善されている  
- [ ] 変更後、主要ページを一通り目視チェックし、明らかな崩れがないこと  
- [ ] 変更内容を簡潔にまとめた **Commit message** を用意する（下にテンプレあり）

---

## 1. スコープ（やること）
### 1.1 追加/更新する共通CSS
- `assets/css/theme-neubrutal.css`（新規）  
  - CSS変数（Design Tokens）  
  - 共通コンポーネントクラス（`.card`, `.btn`, `.input`, `.code`, `.alert`, `.badge`, `.stack`, `.row` など）
  - hover / active / focus / disabled 状態

### 1.2 各ツールページへの適用（クラス付与）
- 「主要枠」を `.card` に置換/付与
- ボタンに `.btn`（必要なら `.primary` `.secondary` `.danger`）を付与
- 入力（input/textarea/select）に `.input` を付与（既存classがあるなら併用可）
- 変換結果・ログなどの出力表示を `.code` に統一
- 安心ブロック、FAQは共通スタイルで表現

### 1.3 レイアウト規約
- `.container`：最大幅1100px程度、余白を統一
- `.stack`：縦方向の余白（gap）
- `.row`：横並びの余白（折り返し可）
- ブレイクポイント：768pxで1カラムへ寄せる（崩れないこと優先）

---

## 2. 非スコープ（やらないこと）
- 大規模な機能追加（変換機能の刷新など）
- React化 / ビルド導入（現状が静的運用の前提）
- デザインの過剰装飾（可読性・速度を犠牲にしない）

---

## 3. 制約（重要）
- 速度最優先：CSSは軽量に。重い画像・フォントの大量読み込みを避ける
- アクセシビリティ：focusが見えること（キーボード操作で迷子にならない）
- 既存JSロジックの破壊禁止（DOM構造の変更は最小限）
- SEO：title/description/canonicalなど既存のSEO要素を壊さない

---

## 4. Neubrutalismデザインシステム（v1）

### 4.1 Design Tokens（CSS変数）
- Base
  - `--bg:#fff; --fg:#111; --muted:#f3f3f3;`
- Border
  - `--line:#111; --bw:3px;`
- Accent（暫定）
  - `--accent:#ff4d00; --accent2:#00a3ff;`
- Status
  - `--ok:#19c37d; --warn:#ffcc00; --danger:#ff3b30;`
- Shadow（ベタ影）
  - `--shadow:6px 6px 0 0 #111;`
- Radius
  - `--r:0px;`（基本0）
- Spacing
  - `--s1:8px; --s2:12px; --s3:16px; --s4:24px; --s5:32px;`
- Font
  - `--font:system-ui,-apple-system,"Segoe UI","Noto Sans JP",sans-serif;`

### 4.2 コンポーネントクラス（最低限）
- `.container`
- `.card`
- `.stack`, `.row`
- `.btn` + variants: `.primary`, `.secondary`, `.danger`
- `.input`（input/textarea/select共通）
- `.code`（出力欄）
- `.alert` + variants: `.ok`, `.warn`, `.danger`
- `.badge`

### 4.3 UI挙動
- hover：少し浮く（例：translate(-2px,-2px)）
- active：影を消す、押した感
- focus：太いアウトライン（例：4px、`--accent2`）

---

## 5. 実装方針（差分が小さく、確実に）
1) `theme-neubrutal.css` を追加  
2) 主要ページ1つに適用して見た目確認  
3) 共通パターン（card/button/input/code）を他ページに横展開  
4) 最後にFAQ/安心ブロックを当てる

---

## 6. 対象ページ（ここはユーザーが後で埋める）
> 下のリストを、対象のHTMLパスに置き換えること。

- [ ] （例）`/index.html`
- [ ] （例）`/tools/csv-to-json-paste/index.html`
- [ ] （例）`/tools/json-to-csv/index.html`
- [ ] （例）`/tools/csv-to-csv/index.html`
- [ ] （例）その他：____________________

---

## 7. テスト（最低限のチェック）
- [ ] PC幅で見た目が崩れない
- [ ] 768px以下で1カラム化して崩れない
- [ ] ボタンhover/active/focusが期待通り
- [ ] input/textarea/selectのfocusが見える
- [ ] 出力欄（`.code`）が長文でもスクロールできる
- [ ] 主要ツールの変換処理が動く（機能破壊がない）

---

## 8. 依頼者から提供するもの（antigravityに渡す前提）
- [ ] 最新ZIP（リポジトリ一式）
- [ ] 「対象ページ一覧」（上の6章を埋める）
- [ ] ブランド色（継続するか、変更するか）
- [ ] 既に利用しているCSSフレームワーク有無（Tailwind/Bootstrap等）

---

## 9. 期待する出力（antigravityの作業成果）
- 変更ファイル一覧（パス単位）
- 変更内容サマリ（何を統一したか）
- 目視チェック結果（どのページを見たか）
- Commit message案（下テンプレに沿う）

---

## 10. Commit message テンプレ（例）
- `style: apply neubrutal theme tokens + core components`
- `style: unify cards/buttons/inputs across tools with neubrutal theme`
- `ui: introduce neubrutal design system and polish responsive layout`

---

## 11. 質問（ここが埋まると精度が上がる）
1. 現在のCSSは「素のCSS」？それともTailwind/Bootstrap等が入っている？  
2. まず適用する優先ページはどれ？（3〜5ページに絞ると安全）  
3. アクセント色は（オレンジ＋水色）継続でOK？  
4. ダークモードは要る？（要るならtokensに追加する）

---

以上
