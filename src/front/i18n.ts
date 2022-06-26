import { TranslationKey } from "./translation-key";

function normalize(language: string): string {
  switch (language) {
    case "ja":
    case "ja-JP":
      return "ja";
    default:
      return language;
  }
}

export function gettext(
  s: TranslationKey,
  language: string = navigator.language
): string {
  const l = normalize(language);
  switch (l) {
    case "ja": {
      switch (s) {
        case "Back":
          return "戻る";
        case "Bedrock to Java":
          return "統合版 から Java版に";
        case "Cancel":
          return "キャンセル";
        case "Completed":
          return "完了";
        case "Converter still working. Do you really leave the page?":
          return "変換処理中です。中断してページを読み込みますか？";
        case "Converting...":
          return "変換中...";
        case "Do you really want to cancel?":
          return "本当に処理を中断しますか?";
        case "Export":
          return "書き出し";
        case "Finished":
          return "完了";
        case "Java to Bedrock":
          return "Java版 から 統合版に";
        case "Mode: ":
          return "モード: ";
        case "Select a world to convert":
          return "変換するワールドデータを選んで下さい";
        case "Select archive":
          return "ファイルを選択";
        case "Select conversion mode:":
          return "変換モードを選んで下さい";
        case "Select directory":
          return "ディレクトリを選択";
        case "Selected directory: ":
          return "選択されたディレクトリ: ";
        case "Selected file: ":
          return "選択されたファイル: ";
        case "This browser doesn't have Worker class":
          return "このブラウザには Worker クラスが定義されていません";
        case "This browser doesn't have navigator.hardwareConcurrency property":
          return "このブラウザに navigator.hardwareConcurrency プロパティが定義されていません";
        case "This browser doesn't support SharedArrayBuffer":
          return "このブラウザは SharedArrayBuffer に対応していません";
        case "Unsupported browser because:":
          return "このブラウザでは以下の理由で動作しません:";
        case "Xbox360 to Bedrock":
          return "Xbox360版 から 統合版に";
        case "Xbox360 to Java":
          return "Xbox360版 から Java版に";
      }
      break;
    }
  }
  return s;
}
