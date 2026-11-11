# 海のサインプロジェクト (umipos-summit2026)

**「見る看板」から「伝わる看板」へ**  
沖縄県名護市の海を守る高校生チーム「**海のサインプロジェクト**」（うみぽす甲子園2026 ファイナリスト）の公式Webサイトおよび、海岸看板連動型の「**海のピクトグラム辞典・緊急通報サポート**」Webアプリケーションです。

- **公開URL**: https://uminosign.nagoyc.stki.org
- **主催**: 海のサインプロジェクト（協力: [Nago city Youth Creative PROJECTs](https://nagoyc.stki.org/)）

---

## 🌊 プロジェクト概要

海岸に設置されている従来の注意看板には、「文字が小さくて読みづらい」「どこに・どんな危険があるのか直感的に伝わりにくい」という課題があります。  
本プロジェクトでは、名護市内の海岸フィールドワーク調査をもとに、**子どもからお年寄り、海外からの観光客まで、国籍や年齢を問わず一目で危険と対処法が「伝わる」ピクトグラム看板**をデザイン・制作しています。

このリポジトリは、プロジェクトの活動発信拠点であると同時に、**現地看板のQRコードからアクセスして緊急通報（119 / 118 / 監視員）や応急手当・ピクトグラムの意味を多言語で即座に確認できるWebガイド**として機能します。

---

## ✨ 主な機能・特徴

### 1. 🚨 緊急SOS・通報サポート機能 (`/poster/`)
- **常設SOSショートカットバー**: 全ページの画面最上部に `119`（救急・消防）と `118`（海上保安庁）へのワンタップ電話発信ボタンを配置。
- **状況別・通報先ナビゲーション**: 「人が溺れている」「危険生物に刺された」「油濁を見つけた」など5つのチェックリストを選択すると、最適な通報先（`119` / `118` / `監視員`）を自動判定し、必要な発信ボタンをハイライト＆有効化します。
- **電話で伝えること＆応急対応**: パニック時でも冷静に通報できるよう、伝えるべき3項目（場所・状況・人数）と代表的な事故の応急処置を掲載。

### 2. 📘 海のピクトグラム辞典（QRコード・ディープリンク連動）
- **2カテゴリ・全17項目のピクトグラム解説**:
  - **危険生物・自然環境の注意（9種）**: 離岸流、高波・三角波、岩場滑走、サンゴ保護・ケガ、ハブクラゲ、オニダルマオコゼ、オニヒトデ、ガンガゼ・ウニ類、ウミヘビ・ミノカサゴ
  - **安全装備・利用ルール（8種）**: 溺水救助指示、遊泳禁止区域、飛び込み禁止、ライフジャケット推奨、監視員常駐、遊泳条件フラッグ、保護者同伴、飲酒遊泳禁止
- **看板QRコード連動（ハッシュ直リンク）**:  
  `/poster/#rip-current` や `/poster/#jellyfish` のようにURLハッシュ（`src/data/how-to-sea.ts` の `id`）付きでアクセスすると、自動的にピクトグラム辞典タブへ切り替わり、該当項目の「意味」「対処法」モーダルが即座に開きます。

### 3. 🌐 6言語対応＆プロキシ翻訳フォールバック (`Layout.astro`)
- **対応言語**: 日本語 (`ja`)、英語 (`en`)、繁体字中国語 (`zh-TW`)、簡体字中国語 (`zh-CN`)、韓国語 (`ko`)、スペイン語 (`es`)
- **ハイブリッド翻訳機構**:
  1. Google Translate Element（ページ内ウィジェット）による即時翻訳
  2. ブラウザのトラッキング防止機能等でウィジェットが動作しない場合、6秒後にかな文字残存率を自動判定し、Google Translate Proxy（`*.translate.goog`）へ自動遷移するフォールバック機能を実装。

### 4. 📝 公式ブログ RSS 自動取得 (`/`, `/api/rss`)
- うみぽす甲子園公式ブログ「明日の地図」の著者フィード（RSS）を `/api/rss` 経由で取得し、トップページに最新記事3件を自動表示します。

---

## 🛠 技術スタック

| カテゴリ | 使用技術・バージョン | 備考 |
| :--- | :--- | :--- |
| **フレームワーク** | [Astro](https://astro.build/) `^4.0.0` | 静的サイト生成 (SSG) / TypeScript |
| **インテグレーション** | `@astrojs/sitemap` `^3.6.0` | サイトマップ自動生成 |
| **スタイリング** | Vanilla CSS (Scoped & Global) | グラスモーフィズム、クリスタル背景アニメーション、レスポンシブ設計 |
| **フォント** | Google Fonts (`Noto Sans JP`) | ウェイト 400 / 500 / 700 / 900 |
| **多言語化** | Astro i18n 設定 + Google Translate | 6言語対応（ウィジェット＋プロキシフォールバック） |
| **CI / CD・ホスティング** | GitHub Actions + GitHub Pages | `main` ブランチへの push で自動ビルド＆デプロイ (Node.js 22) |

---

## 📁 ディレクトリ構成

```text
umipos.summit2026-main/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages 自動デプロイ用ワークフロー
├── .vscode/                        # VS Code 推奨拡張機能・デバッグ設定
├── public/                         # 静的配信アセット
│   ├── images/
│   │   └── pictograms/             # ピクトグラム画像一式（18ファイル）
│   ├── 404.html                    # カスタム 404 ページ
│   ├── favicon.png                 # ファビコン
│   ├── logo.png                    # プロジェクトロゴ
│   ├── nsf.jpg                     # 協力パートナーロゴ（NSF PROJECTs）
│   └── trans.png                   # 協力パートナーロゴ（TRANs）
├── src/
│   ├── assets/                     # ビルド用アセット類
│   ├── data/
│   │   └── how-to-sea.ts           # 緊急通報チェックリスト・ピクトグラム辞典のマスターデータ
│   ├── layouts/
│   │   └── Layout.astro            # 全ページ共通レイアウト（SOSバー・ヘッダー・6言語切替・フッター）
│   ├── pages/
│   │   ├── api/
│   │   │   └── rss.ts              # 活動ブログ（明日の地図）RSSプロキシエンドポイント
│   │   ├── index.astro             # トップページ（ヒーロー・チーム紹介・最新ブログ一覧）
│   │   ├── about.astro             # ABOUT（プロジェクトの背景・目的・活動体制）
│   │   ├── poster.astro            # POSTER（緊急SOS通報ナビ ＆ ピクトグラム辞典）
│   │   ├── sponsor.astro           # PARTNER（支援方針・協力パートナー紹介モーダル）
│   │   ├── sns.astro               # SNS（公式ブログ・公式note・Instagramリンク集）
│   │   ├── contact.astro           # CONTACT（パートナー募集・FAQ・メール問い合わせ）
│   │   └── event.astro             # EVENT（Nago Youth Future Summit 2026 特設ページ・会場アクセス）
│   └── env.d.ts                    # Astro 型定義
├── astro.config.mjs                # Astro 設定（サイトURL・i18n・サイトマップ設定）
├── package.json                    # 依存パッケージ・スクリプト定義
└── tsconfig.json                   # TypeScript 設定
```

---

## 📄 ページ一覧とルーティング

| パス | ファイル | 内容 |
| :--- | :--- | :--- |
| `/` | `src/pages/index.astro` | **トップページ**: キャッチコピー、活動背景、公式ブログ最新記事 |
| `/about/` | `src/pages/about.astro` | **概要・想い**: 海岸注意看板の課題、3つの取り組み内容、主催・協力体制 |
| `/poster/` | `src/pages/poster.astro` | **看板・SOS**: 「緊急SOS・通報」タブと「ピクトグラム辞典」タブ、詳細モーダル |
| `/sponsor/` | `src/pages/sponsor.astro` | **協力パートナー**: 非金銭支援ポリシー、協力団体（NSF PROJECTs / TRANs）詳細 |
| `/sns/` | `src/pages/sns.astro` | **公式SNS**: 公式ブログ（明日の地図）、公式note、NYC公式Instagramへのリンク |
| `/contact/` | `src/pages/contact.astro` | **お問い合わせ**: 募集中のサポート内容、よくある質問（FAQ）、連絡先メール |
| `/event/` | `src/pages/event.astro` | **イベント特設**: 「Nago Youth Future Summit 2026」開催概要・会場（MsiX）マップ |
| `/api/rss` | `src/pages/api/rss.ts` | **RSS API**: うみぽす甲子園ブログのRSSフィード取得用エンドポイント |

---

## 🚀 セットアップ・開発手順

### 必要環境
- **Node.js**: `v22.x` 以上推奨（GitHub Actions のビルド環境は Node.js 22 を使用）
- **npm**: Node.js 同梱のパッケージマネージャー

### インストールと起動

```bash
# 1. 依存パッケージのインストール
npm install

# 2. 開発サーバーの起動 (http://localhost:4321)
npm run dev

# 3. 本番用ビルド (./dist に出力)
npm run build

# 4. ビルド成果物のローカルプレビュー
npm run preview
```

### コマンド一覧

| コマンド | 動作内容 |
| :--- | :--- |
| `npm run dev` / `npm start` | ローカル開発サーバーを `localhost:4321` で起動します |
| `npm run build` | 本番用の静的サイトを `./dist/` ディレクトリにビルドします |
| `npm run preview` | ビルドした `./dist/` の内容をローカル環境でプレビューします |
| `npm run astro ...` | `astro check` などの Astro CLI コマンドを実行します |

---

## 📝 コンテンツの更新・追加方法

### 1. ピクトグラム項目や緊急通報チェックリストの編集
- 画像ファイルを `public/images/pictograms/` に配置します。
- `src/data/how-to-sea.ts` 内の `genres` 配列（または `reportItems` 配列）にアイテムを追加・編集します。
- 各アイテムの `id` がそのままQRコード用の直リンクアンカー（`/poster/#<id>`）として使用されます。

### 2. 協力パートナー・共催・後援団体の追加
- ロゴ画像を `public/` に配置します。
- `src/pages/sponsor.astro` 冒頭の `partners`（協力パートナー）、`coOrganizers`（共催）、`supporters`（後援）配列にデータを追加すると、自動的にカードやセクションが描画されます。

---

## 🚢 デプロイについて

`.github/workflows/deploy.yml` により、**`main` ブランチへ push されると GitHub Actions が自動実行**され、ビルド成果物（`./dist`）が GitHub Pages（`https://uminosign.nagoyc.stki.org`）へデプロイされます。

---

## 👥 クレジット・お問い合わせ

- **主催**: 海のサインプロジェクト
- **協力**: [Nago city Youth Creative PROJECTs (NYC)](https://nagoyc.stki.org/)
- **Developer**: [Jinn](https://sites.google.com/view/meisi1/meisi)
- **お問い合わせ**: `nyc.summit.umipos@outlook.jp`
