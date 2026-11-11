export const IMAGE_BASE = "/images/pictograms/";

export type CallType = "119" | "118" | "lifeguard";

export interface ReportItem {
  text: string;
  call: CallType[];
}

export interface PictogramItem {
  id: string;
  name: string;
  image?: string;
  alt?: string;
  hidden?: boolean;
  rows: [string, string][];
  note?: string;
}

export interface Genre {
  id: string;
  title: string;
  desc: string;
  items: PictogramItem[];
}

/**
 * SOS・緊急通報チェックリスト
 */
export const reportItems: ReportItem[] = [
  {
    text: "人が溺れている・沖に流されている",
    call: ["119", "118", "lifeguard"],
  },
  {
    text: "怪我をしている・意識がない人がいる",
    call: ["119", "lifeguard"],
  },
  {
    text: "海の危険生物（クラゲ・オコゼ等）に刺された",
    call: ["119", "lifeguard"],
  },
  {
    text: "海の事件・事故・不審船・油濁を見つけた",
    call: ["118"],
  },
  {
    text: "気分が悪くなった・迷子・落とし物",
    call: ["lifeguard"],
  },
];

/**
 * ピクトグラム一覧・ジャンル別データ
 */
export const genres: Genre[] = [
  {
    id: "cat-danger",
    title: "危険生物・自然環境の注意",
    desc: "海辺に潜む自然の危険や、遭遇する可能性のある生物に関するサインです。",
    items: [
      {
        id: "rip-current",
        name: "離岸流（カレント）注意",
        image: "rip-current.svg",
        alt: "離岸流のピクトグラム",
        rows: [
          ["意味", "岸から沖に向かって急速に流れる強い海水流が発生する場所です。"],
          ["対処法", "慌てず岸と平行（横）に泳ぎ、流れるエリアから脱出してください。"],
        ],
        note: "※パニックにならず、周りに手を出して助けを呼びましょう。",
      },
      {
        id: "jellyfish",
        name: "ハブクラゲ・危険生物注意",
        image: "jellyfish.svg",
        alt: "クラゲ注意のピクトグラム",
        rows: [
          ["意味", "毒針を持つ危険なクラゲや海の生物が出没するエリアです。"],
          ["対処法", "海水でこすらず、酢（ハブクラゲの場合）をかけて触手を静かに取り除き、冷やします。"],
        ],
      },
      {
        id: "stonefish",
        name: "オニダルマオコゼ・刺傷注意",
        image: "stonefish.svg",
        alt: "オコゼ注意のピクトグラム",
        rows: [
          ["意味", "岩や砂に擬態した背の毒棘（トゲ）を持つ危険魚が潜んでいます。"],
          ["対処法", "マリンシューズを着用し、踏んだ場合は40〜45℃のお湯に浸けて速やかに医療機関へ。"],
        ],
      },
      {
        id: "alone",
        name: "おぼれている人・救助指示",
        image: "drowning.svg",
        alt: "溺水注意のピクトグラム",
        rows: [
          ["意味", "溺れている人を見かけた際の緊急行動インジケーターです。"],
          ["対処法", "直接飛び込まず、ペットボトルや浮き輪など浮くものを投げ、118・119・監視員へ即時通報。"],
        ],
      },
    ],
  },
  {
    id: "cat-rules",
    title: "利用ルール・禁止事項",
    desc: "ビーチを安全・快適に利用するためのルールや禁止事項です。",
    items: [
      {
        id: "no-swimming",
        name: "遊泳禁止",
        image: "no-swimming.svg",
        alt: "遊泳禁止のピクトグラム",
        rows: [
          ["意味", "波が高い、または潮の流れが速く危険なため、入水が禁止されています。"],
          ["対処法", "水に入らず、海岸での散歩や観察にとどめてください。"],
        ],
      },
      {
        id: "no-bbq",
        name: "火気厳禁・BBQ禁止",
        image: "no-fire.svg",
        alt: "火気禁止のピクトグラム",
        rows: [
          ["意味", "指定エリア外での直火・タバコ・バーベキューは禁止されています。"],
          ["対処法", "許可された専用施設・BBQエリアをご利用ください。"],
        ],
      },
    ],
  },
];