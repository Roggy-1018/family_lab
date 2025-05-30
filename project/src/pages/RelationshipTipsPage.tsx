import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Heart, Puzzle, Target, Users, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: string;
  text: string;
  type: 'reality';
  gap: number;
}

interface SubcategoryItem {
  id: string;
  name: string;
  gap: number;
  questions: Question[];
}

interface Subcategory {
  id: string;
  name: string;
  description: string;
  items: SubcategoryItem[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  gap: number;
  subcategories: Subcategory[];
}

type ActionType = '認識合わせ' | '実感UP' | '要望調整';

interface ImprovementStep {
  text: string;
}

const getGapColor = (gap: number): string => {
  if (gap >= 2) return 'text-red-600 bg-red-50';
  if (gap >= 1.5) return 'text-orange-600 bg-orange-50';
  if (gap >= 1) return 'text-yellow-600 bg-yellow-50';
  if (gap >= 0.5) return 'text-blue-600 bg-blue-50';
  return 'text-green-600 bg-green-50';
};

const getActionName = (itemName: string, actionType: ActionType): string => {
  switch (itemName) {
    case '共感理解':
      switch (actionType) {
        case '認識合わせ': return '感情1分シェア';
        case '実感UP': return '感謝リレー';
        case '要望調整': return '共感尺度公開';
      }
      break;
    case '愛情表現':
      switch (actionType) {
        case '認識合わせ': return '5LLチェック';
        case '実感UP': return 'デイリー愛情タッチ';
        case '要望調整': return '頻度再設計';
      }
      break;
    case 'オープン対話':
      switch (actionType) {
        case '認識合わせ': return 'ウィークリーUP';
        case '実感UP': return '対話ゾーン確保';
        case '要望調整': return 'トピック優先表';
      }
      break;
    case '安心開示':
      switch (actionType) {
        case '認識合わせ': return 'Iメッセ練習';
        case '実感UP': return '肯定ルール';
        case '要望調整': return '相談枠制限';
      }
      break;
    case '相互サポート':
      switch (actionType) {
        case '認識合わせ': return 'Top3共有';
        case '実感UP': return 'タスク可視化';
        case '要望調整': return '納得感重視宣言';
      }
      break;
    case '役割分担公平':
      switch (actionType) {
        case '認識合わせ': return '好き嫌いマップ';
        case '実感UP': return '月次棚卸し';
        case '要望調整': return '長期±0ルール';
      }
      break;
    case '落ち着き対話':
      switch (actionType) {
        case '認識合わせ': return 'タイムアウト合図';
        case '実感UP': return '感情フロー図';
        case '要望調整': return '24h再協議';
      }
      break;
    case '尊重解決':
      switch (actionType) {
        case '認識合わせ': return 'サンドイッチ褒め';
        case '実感UP': return '声量カード';
        case '要望調整': return '熱⇆穏ルール';
      }
      break;
    case '将来設計共有':
      switch (actionType) {
        case '認識合わせ': return '未来年表';
        case '実感UP': return 'マネープラン月次';
        case '要望調整': return '75%合意法';
      }
      break;
    case '価値観共有':
      switch (actionType) {
        case '認識合わせ': return '価値カードTOP5';
        case '実感UP': return '価値行動実践';
        case '要望調整': return 'リソース再定義';
      }
      break;
    case '共有趣味時間':
      switch (actionType) {
        case '認識合わせ': return 'やりたい10リスト';
        case '実感UP': return '月1二人タイム';
        case '要望調整': return '月次質重視';
      }
      break;
    case '特別イベント':
      switch (actionType) {
        case '認識合わせ': return '記念日カンファ';
        case '実感UP': return '写真&次案メモ';
        case '要望調整': return '体験価値重視';
      }
      break;
    case '親族友人交流':
      switch (actionType) {
        case '認識合わせ': return '交友マップ';
        case '実感UP': return '楽しさ評価';
        case '要望調整': return '距離バランス';
      }
      break;
    case '地域参加':
      switch (actionType) {
        case '認識合わせ': return '活動候補3選';
        case '実感UP': return '1回試参加';
        case '要望調整': return '年2回OK';
      }
      break;
    case '身体的親和':
      switch (actionType) {
        case '認識合わせ': return 'スキン頻度共有';
        case '実感UP': return 'ルーティンハグ';
        case '要望調整': return '日常ロマン化';
      }
      break;
    case '性的満足':
      switch (actionType) {
        case '認識合わせ': return '性ニーズ表';
        case '実感UP': return 'デートナイト';
        case '要望調整': return '満足公式更新';
      }
      break;
    case 'しつけ方針一致':
      switch (actionType) {
        case '認識合わせ': return '育児ポリシー';
        case '実感UP': return '月1レビュー';
        case '要望調整': return '折衷事例';
      }
      break;
    case '育児協力':
      switch (actionType) {
        case '認識合わせ': return 'タイムログ交換';
        case '実感UP': return '5分お願い文化';
        case '要望調整': return '変動分担制';
      }
      break;
    case '時間バランス':
      switch (actionType) {
        case '認識合わせ': return '時間円グラフ';
        case '実感UP': return '月1デート固定';
        case '要望調整': return '週単位視点';
      }
      break;
  }
  return '';
};

const getImprovementSteps = (actionType: ActionType, itemName: string): ImprovementStep[] => {
  switch (itemName) {
    case '共感理解':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '就寝前に各自タイマー1分セット' },
            { text: '「今日一番強かった感情＋理由」を話す' },
            { text: '聞き手は評価せず要約し「…って感じたんだね」と返す' }
          ];
        case '実感UP':
          return [
            { text: '毎週決めた曜日に「ありがとう＋具体的理由」を送る' },
            { text: '受け取った側は翌日に"感想"を返信' },
            { text: '1往復でリレー完了、スクショ保存で達成感を共有' }
          ];
        case '要望調整':
          return [
            { text: '共感を★1〜5で感じる条件を各自メモ' },
            { text: 'メモを交換し"努力を評価"を満点基準に設定' },
            { text: '月末に再評価し尺度を微調整' }
          ];
      }
      break;

    case '愛情表現':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '5 Love Languagesシートを印刷' },
            { text: '自分と相手の「受け取り→嬉しいTOP2」を○で記入' },
            { text: '結果を写真で保存し、冷蔵庫や共有フォルダに掲示' }
          ];
        case '実感UP':
          return [
            { text: '朝or夜にTOP言語で行動（言葉・ハグ等）を1つ実践' },
            { text: '実施後「今日は○○したよ」と一言報告し合う' },
            { text: '週末に"1番嬉しかった行動"を振り返る' }
          ];
        case '要望調整':
          return [
            { text: '理想頻度を数値化（例：毎日→7、週末のみ→2）' },
            { text: '平均値を取り中間ラインを目標回数に再設定' },
            { text: '1か月後に満足度を再評価し再調整' }
          ];
      }
      break;

    case 'オープン対話':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '日曜夜15分、タイマーで交代制トーク' },
            { text: '良かった事→困り事→来週望むサポートを順に共有' },
            { text: '共有後ハイタッチで終了' }
          ];
        case '実感UP':
          return [
            { text: 'リビングの椅子やソファに"会話クッション"を置き合図' },
            { text: 'クッションがある時はスマホOFFで10分の集中会話' },
            { text: '終了後クッションを戻して通常モードへ' }
          ];
        case '要望調整':
          return [
            { text: '各自「重要TOP3テーマ」を付箋に書く' },
            { text: 'ボードに貼り"まずTOP3だけ話せばOK"と合意' },
            { text: '他テーマは次回以降に回し負担軽減' }
          ];
      }
      break;

    case '安心開示':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '「私は〇〇と感じた」を主語"私"で表現' },
            { text: '聞き手は評価ゼロで要約返し→感謝で締める' },
            { text: '週1回ロールプレイし習慣化' }
          ];
        case '実感UP':
          return [
            { text: '悩みを打ち明けられたら必ず「聞かせてくれてありがとう」' },
            { text: '解決策より先に感謝を言うルールを貼り紙で可視化' },
            { text: '月1でルール遵守状況を振り返る' }
          ];
        case '要望調整':
          return [
            { text: '相談OKの曜日・時間帯をカレンダー共有' },
            { text: '緊急時のみ時間外OKと例外規定を作る' },
            { text: '1か月後に負担感をレビューし枠を調整' }
          ];
      }
      break;

    case '相互サポート':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '週初めに「今週助けてほしい事Top3」をメモ' },
            { text: '写真で共有し優先度◎○△を話し合う' },
            { text: '週末に実行率を振り返りハイライト共有' }
          ];
        case '実感UP':
          return [
            { text: '家事をカード化しTrelloやホワイトボードに貼る' },
            { text: '完了時に"済"ラベル＋スタンプで相手へ通知' },
            { text: '週末にボードを見ながら達成感を共有' }
          ];
        case '要望調整':
          return [
            { text: '家事時間より"心理的負担スコア"を★1〜5で測定' },
            { text: '負担スコアが近ければOKと合意し文書化' },
            { text: '半年ごとにスコアを見直しルール更新' }
          ];
      }
      break;

    case '役割分担公平':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: 'タスクを「好き/得意/嫌い/苦手」で4象限に配置' },
            { text: '交換可能タスクを矢印で入れ替え' },
            { text: '写真保存し2週間後に再評価' }
          ];
        case '実感UP':
          return [
            { text: '月末に分担表達成率と負担感を★1〜5で評価' },
            { text: '偏りが★3以上差なら翌月タスクを再配分' },
            { text: '成果を次の棚卸しで確認' }
          ];
        case '要望調整':
          return [
            { text: '半年単位で家事時間を合計し±10%以内なら公平と合意' },
            { text: '大きくずれた場合のみ再配分を検討' },
            { text: '合意メモをクラウドに保存' }
          ];
      }
      break;

    case '落ち着き対話':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '「タイムアウト」の合図を決める（例：Tサイン）' },
            { text: '合図後は必ず30分以上クールダウン' },
            { text: '再開時は「さっきの続きだけど」と切り出す' }
          ];
        case '実感UP':
          return [
            { text: '感情の流れを図で整理（怒り→不安→寂しさ等）' },
            { text: '図を見ながら「根っこの気持ち」を探る' },
            { text: '相手の感情の流れも想像して共有' }
          ];
        case '要望調整':
          return [
            { text: '激しい感情は24時間置いてから再協議' },
            { text: '「今は冷静に話せない」と正直に伝える' },
            { text: '翌日以降に「改めて話したい」と切り出す' }
          ];
      }
      break;

    case '尊重解決':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '相手の良いところを挟んで指摘（褒め→指摘→期待）' },
            { text: '「いつも〇〇なあなただから△△して」と伝える' },
            { text: '最後は必ず相手への信頼を言葉にする' }
          ];
        case '実感UP':
          return [
            { text: '声の大きさを5段階で表すカードを作成' },
            { text: '会話中にカードを見せ合って音量調整' },
            { text: '落ち着いた声で話せたらお互いに褒める' }
          ];
        case '要望調整':
          return [
            { text: '熱い話者と穏やかな聞き手を交代で担当' },
            { text: '役割を決めて「今日は聞き役ね」と確認' },
            { text: '次回は逆の役割で対話する' }
          ];
      }
      break;

    case '将来設計共有':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '5年後までの年表を2人で作成' },
            { text: '仕事・家庭・趣味の3軸でイメージを書く' },
            { text: '写真に撮って壁やスマホに保存' }
          ];
        case '実感UP':
          return [
            { text: '毎月1回、家計の収支を確認' },
            { text: '将来の目標に向けた貯蓄額を決定' },
            { text: '達成をお互いに褒め合う習慣化' }
          ];
        case '要望調整':
          return [
            { text: '重要な決定は75%以上の納得感を基準に' },
            { text: '違和感は率直に「私は△%かな」と数値で表現' },
            { text: '納得感が低い項目は見直しを検討' }
          ];
      }
      break;

    case '価値観共有':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '価値観カード（自作可）からTOP5を選ぶ' },
            { text: 'お互いの選択理由を共有' },
            { text: '共通項に印をつけて写真保存' }
          ];
        case '実感UP':
          return [
            { text: '価値観TOP5に沿った行動を毎日1つ実践' },
            { text: '夕食時に「今日は○○を大切にして△△したよ」' },
            { text: '相手の行動も認め合う' }
          ];
        case '要望調整':
          return [
            { text: '時間とお金の使い方を価値観と照らし合わせる' },
            { text: '優先順位を決めてリソースを再配分' },
            { text: '3ヶ月後に満足度を確認' }
          ];
      }
      break;

    case '共有趣味時間':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '「やってみたいこと10個」をリストアップ' },
            { text: 'お互いの案を交換して興味度を3段階評価' },
            { text: '高評価の項目から実施順を決める' }
          ];
        case '実感UP':
          return [
            { text: '月1回は「二人の時間」を確保' },
            { text: '場所と内容を交代で決める権利を持つ' },
            { text: '思い出の写真は必ず残す' }
          ];
        case '要望調整':
          return [
            { text: '「量より質」を重視し、集中度を評価' },
            { text: '短時間でも没入できる環境作りを工夫' },
            { text: '満足度が低い場合は企画を見直し' }
          ];
      }
      break;

    case '特別イベント':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '年間の記念日をカレンダーに記入' },
            { text: '各記念日の過ごし方の希望を共有' },
            { text: '予算と規模も事前に合意' }
          ];
        case '実感UP':
          return [
            { text: 'イベント写真は必ずスマホに保存' },
            { text: '次回やりたいことメモを作成' },
            { text: '定期的に思い出を振り返る時間を作る' }
          ];
        case '要望調整':
          return [
            { text: '金額や規模より体験の質を重視' },
            { text: '負担にならない範囲で内容を調整' },
            { text: '互いの価値観を確認しながら計画' }
          ];
      }
      break;

    case '親族友人交流':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '交友関係を図で整理（頻度・親密度）' },
            { text: '相手との関係性も地図に追加' },
            { text: '定期的に更新して変化を確認' }
          ];
        case '実感UP':
          return [
            { text: '交流後に「楽しさ度」を評価' },
            { text: '良かった点・改善点をメモ' },
            { text: '次回の過ごし方に反映' }
          ];
        case '要望調整':
          return [
            { text: '各関係の「距離感」を数値化' },
            { text: '快適な距離を保つための工夫を共有' },
            { text: '定期的に見直して調整' }
          ];
      }
      break;

    case '地域参加':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '興味ある地域活動を3つ選ぶ' },
            { text: '各活動の参加しやすさを評価' },
            { text: '優先順位をつけて検討' }
          ];
        case '実感UP':
          return [
            { text: '1つの活動に試験参加' },
            { text: '体験後の感想を共有' },
            { text: '継続の是非を決定' }
          ];
        case '要望調整':
          return [
            { text: '年2回程度の参加でOKと合意' },
            { text: '無理のない範囲で関わる' },
            { text: '負担感が出たら見直し' }
          ];
      }
      break;

    case '身体的親和':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: 'スキンシップの理想頻度を共有' },
            { text: '互いの心地よさを確認' },
            { text: '実現可能な目標を設定' }
          ];
        case '実感UP':
          return [
            { text: '朝・夜のハグを習慣化' },
            { text: '「ただいま」「おかえり」のキス' },
            { text: '自然な流れを大切に' }
          ];
        case '要望調整':
          return [
            { text: '日常的な触れ合いを意識化' },
            { text: '些細な機会も大切にする' },
            { text: 'お互いの気持ちを確認しながら調整' }
          ];
      }
      break;

    case '性的満足':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '性的ニーズを率直に表現' },
            { text: '互いの希望を理解' },
            { text: '実現可能な形を模索' }
          ];
        case '実感UP':
          return [
            { text: '月1回はデートナイトを設定' },
            { text: '雰囲気作りを大切に' },
            { text: '心の準備を整える' }
          ];
        case '要望調整':
          return [
            { text: '満足度を定期的に確認' },
            { text: '必要に応じて方法を見直し' },
            { text: '無理のない範囲で調整' }
          ];
      }
      break;

    case 'しつけ方針一致':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '育児の重要項目をリストアップ' },
            { text: '各項目の方針を確認' },
            { text: '共通認識を文書化' }
          ];
        case '実感UP':
          return [
            { text: '月1回の育児方針レビュー' },
            { text: '良かった点・課題点を共有' },
            { text: '改善策を一緒に考える' }
          ];
        case '要望調整':
          return [
            { text: '意見の違いは折衷案を探る' },
            { text: '両者の良い点を活かす' },
            { text: '定期的に効果を確認' }
          ];
      }
      break;

    case '育児協力':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '1週間の育児時間をログ記録' },
            { text: 'お互いの記録を交換' },
            { text: '実態を把握して話し合い' }
          ];
        case '実感UP':
          return [
            { text: '「5分だけ見ていて」を気軽に頼む' },
            { text: '短時間の協力を重ねる' },
            { text: '感謝を伝え合う' }
          ];
        case '要望調整':
          return [
            { text: '状況に応じて分担を変更' },
            { text: '柔軟な対応を心がける' },
            { text: '無理のない範囲で調整' }
          ];
      }
      break;

    case '時間バランス':
      switch (actionType) {
        case '認識合わせ':
          return [
            { text: '時間の使い方を円グラフ化' },
            { text: '理想と現実のギャップを確認' },
            { text: '改善したい部分を明確化' }
          ];
        case '実感UP':
          return [
            { text: '月1回のデート日を固定' },
            { text: '予定を優先的に確保' },
            { text: '実施後の満足度を共有' }
          ];
        case '要望調整':
          return [
            { text: '週単位でバランスを見直し' },
            { text: '柔軟な時間調整を心がける' },
            { text: '定期的に満足度を確認' }
          ];
      }
      break;

    default:
      return [];
  }
  return [];
};

const ActionButton: React.FC<{
  actionName: string;
  isSelected: boolean;
  isFocused: boolean;
  onSelect: () => void;
  onAddToFocus: () => void;
}> = ({ actionName, isSelected, isFocused, onSelect, onAddToFocus }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onSelect}
        className={`flex w-full items-center justify-between rounded-lg border p-3 transition-all ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'
        }`}
      >
        <span className="text-gray-900">{actionName}</span>
        {isHovered && !isFocused && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToFocus();
            }}
            className="absolute right-2 flex items-center space-x-1 rounded-md bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
          >
            <Plus className="h-4 w-4" />
            <span>注力アクションに追加</span>
          </button>
        )}
        {isFocused && (
          <span className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-600">
            注力アクション
          </span>
        )}
      </button>
    </div>
  );
};

export const RelationshipTipsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
  const [focusedActions, setFocusedActions] = useState<Set<string>>(new Set());
  const subcategoriesRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    {
      id:  'emotional',
      name: '感情・コミュニケーション',
      description: '感情的なつながりとコミュニケーションについて',
      icon: Heart,
      gap: 1.3,
      subcategories: [
        {
          id: 'emotional-connection',
          name: '情緒的つながり',
          description: '感情の理解と共感について',
          items: [
            {
              id: 'empathy',
              name: '共感理解',
              gap: 1.4,
              questions: [
                {
                  id: 'q1',
                  text: 'パートナーは自分の気持ちを理解し、共感してくれていると感じる',
                  type: 'reality',
                  gap: 1.4
                }
              ]
            },
            {
              id: 'affection',
              name: '愛情表現',
              gap: 1.2,
              questions: [
                {
                  id: 'q2',
                  text: 'パートナーは日常的に愛情を表現してくれている',
                  type: 'reality',
                  gap: 1.2
                }
              ]
            }
          ]
        },
        {
          id: 'communication',
          name: 'コミュニケーション',
          description: '日常的な対話について',
          items: [
            {
              id: 'open-dialogue',
              name: 'オープン対話',
              gap: 1.2,
              questions: [
                {
                  id: 'q3',
                  text: 'お互いにオープンに話し合え、意見交換ができていると感じる',
                  type: 'reality',
                  gap: 1.2
                }
              ]
            },
            {
              id: 'safe-disclosure',
              name: '安心開示',
              gap: 1.0,
              questions: [
                {
                  id: 'q4',
                  text: '困りごとや悩みを正直に話せる雰囲気があると感じる',
                  type: 'reality',
                  gap: 1.0
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cooperation',
      name: '協力・衝突解決',
      description: '協力体制と問題解決について',
      icon: Puzzle,
      gap: 1.1,
      subcategories: [
        {
          id: 'cooperation-support',
          name: '共同性・協力体制',
          description: '日常生活での協力について',
          items: [
            {
              id: 'mutual-support',
              name: '相互サポート',
              gap: 1.2,
              questions: [
                {
                  id: 'q5',
                  text: 'パートナー（家族）は家事や仕事などをしっかりサポートしてくれている',
                  type: 'reality',
                  gap: 1.2
                }
              ]
            },
            {
              id: 'fair-division',
              name: '役割分担公平',
              gap: 1.0,
              questions: [
                {
                  id: 'q6',
                  text: '夫婦（家族）間で納得のいく形の役割分担ができている',
                  type: 'reality',
                  gap: 1.0
                }
              ]
            }
          ]
        },
        {
          id: 'conflict-resolution',
          name: '衝突・ストレス対処',
          description: '問題解決とストレス管理について',
          items: [
            {
              id: 'calm-dialogue',
              name: '落ち着き対話',
              gap: 1.1,
              questions: [
                {
                  id: 'q7',
                  text: '衝突が起きたとき、落ち着いて話し合い解決できている',
                  type: 'reality',
                  gap: 1.1
                }
              ]
            },
            {
              id: 'respectful-resolution',
              name: '尊重解決',
              gap: 1.0,
              questions: [
                {
                  id: 'q8',
                  text: '相手を尊重し、過度に感情的にならずに問題を解決できている',
                  type: 'reality',
                  gap: 1.0
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'values',
      name: '価値観・社会的つながり',
      description: '価値観の共有と社会との関わりについて',
      icon: Target,
      gap: 0.9,
      subcategories: [
        {
          id: 'values-future',
          name: '価値観・将来ビジョン',
          description: '将来の展望と価値観について',
          items: [
            {
              id: 'future-planning',
              name: '将来設計共有',
              gap: 1.0,
              questions: [
                {
                  id: 'q8',
                  text: '将来の生活設計について、お互いよく話し合えている',
                  type: 'reality',
                  gap: 1.0
                }
              ]
            },
            {
              id: 'value-sharing',
              name: '価値観共有',
              gap: 0.8,
              questions: [
                {
                  id: 'q9',
                  text: '大切にしたい価値観を夫婦（家族）で共有できている',
                  type: 'reality',
                  gap: 0.8
                }
              ]
            }
          ]
        },
        {
          id: 'leisure-sharing',
          name: 'レジャー・余暇共有',
          description: '余暇時間の共有について',
          items: [
            {
              id: 'shared-hobbies',
              name: '共有趣味時間',
              gap: 1.1,
              questions: [
                {
                  id: 'q10',
                  text: '夫婦（家族）で楽しめる時間や趣味を一緒に過ごせている',
                  type: 'reality',
                  gap: 1.1
                }
              ]
            },
            {
              id: 'special-events',
              name: '特別イベント',
              gap: 1.2,
              questions: [
                {
                  id: 'q11',
                  text: '旅行や外食などの特別なイベントを、十分に楽しめている',
                  type: 'reality',
                  gap: 1.2
                }
              ]
            }
          ]
        },
        {
          id: 'social-support',
          name: '社会的サポート',
          description: '社会とのつながりについて',
          items: [
            {
              id: 'family-friends',
              name: '親族友人交流',
              gap: 0.8,
              questions: [
                {
                  id: 'q12',
                  text: '友人・親族との交流があり、助け合える関係性を築けている',
                  type: 'reality',
                  gap: 0.8
                }
              ]
            },
            {
              id: 'community',
              name: '地域参加',
              gap: 1.1,
              questions: [
                {
                  id: 'q13',
                  text: '地域活動やコミュニティなど、社会とほどよくつながりを持てている',
                  type: 'reality',
                  gap: 1.1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'intimacy',
      name: '親密感・子育て',
      description: '親密さと子育てについて',
      icon: Users,
      gap: 1.2,
      subcategories: [
        {
          id: 'intimacy-physical',
          name: '親密感・スキンシップ',
          description: '夫婦間の親密さについて',
          items: [
            {
              id: 'physical-affection',
              name: '身体的親和',
              gap: 1.3,
              questions: [
                {
                  id: 'q14',
                  text: '望む程度のスキンシップが日常的にあると感じる',
                  type: 'reality',
                  gap: 1.3
                }
              ]
            },
            {
              id: 'sexual-satisfaction',
              name: '性的満足',
              gap: 1.1,
              questions: [
                {
                  id: 'q15',
                  text: '性的な関係について、お互いの希望や気持ちを尊重できている',
                  type: 'reality',
                  gap: 1.1
                }
              ]
            }
          ]
        },
        {
          id: 'parenting-approach',
          name: '子ども・育児観',
          description: '子育ての方針と協力について',
          items: [
            {
              id: 'discipline-alignment',
              name: 'しつけ方針一致',
              gap: 0.9,
              questions: [
                {
                  id: 'q16',
                  text: 'しつけや教育方針について、夫婦で十分に話し合い、共通認識をもてている',
                  type: 'reality',
                  gap: 0.9
                }
              ]
            },
            {
              id: 'childcare-cooperation',
              name: '育児協力',
              gap: 1.2,
              questions: [
                {
                  id: 'q17',
                  text: '子育てにおいて困ったときは、夫婦で協力し合っていると感じる',
                  type: 'reality',
                  gap: 1.2
                }
              ]
            },
            {
              id: 'time-balance',
              name: '時間バランス',
              gap: 1.3,
              questions: [
                {
                  id: 'q18',
                  text: '子どもとの時間、夫婦それぞれの時間、夫婦二人の時間をバランスよく取れている',
                  type: 'reality',
                  gap: 1.3
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setSelectedItem(null);
    setSelectedAction(null);

    if (categoryId !== selectedCategory) {
      setTimeout(() => {
        subcategoriesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId === selectedItem ? null : itemId);
    setSelectedAction(null);
  };

  const handleActionSelect = (action: ActionType) => {
    setSelectedAction(action);
    if (itemRef.current) {
      const itemTop = itemRef.current.getBoundingClientRect().top;
      const offset = window.pageYOffset;
      const targetPosition = offset + itemTop - 100;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  const handleAddToFocus = (actionName: string) => {
    setFocusedActions(prev => {
      const newSet = new Set(prev);
      newSet.add(actionName);
      return newSet;
    });
  };

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);
  const selectedItemData = selectedCategoryData?.subcategories
    .flatMap(sub => sub.items)
    .find(item => item.id === selectedItem);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">改善したい領域を選択</h1>
          <p className="mb-8 text-xl text-gray-600">
            診断結果に基づいて、改善のためのヒントをご提案します
          </p>

          <div className="mb-8 grid gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={false}
                animate={{
                  scale: selectedCategory === category.id ? 1.02 : 1,
                  backgroundColor: selectedCategory === category.id ? '#EFF6FF' : '#FFFFFF'
                }}
                onClick={() => handleCategorySelect(category.id)}
                className={`cursor-pointer rounded-lg border transition-all hover:border-blue-200 ${
                  selectedCategory === category.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex h-full flex-col">
                  <div className="flex-grow p-6">
                    <div className="mb-4 flex items-center">
                      <category.icon className="mr-3 h-6 w-6 text-blue-600" />
                      <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
                    </div>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  <div className="flex items-center justify-end border-t p-4">
                    <span className={`rounded-full px-3 py-1 text-sm ${getGapColor(category.gap)}`}>
                      GAP: {category.gap.toFixed(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedCategory && (
              <motion.div
                ref={subcategoriesRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-gray-900">
                  {selectedCategoryData?.name}の改善項目
                </h2>

                {selectedCategoryData?.subcategories.map((subcategory) => (
                  <Card key={subcategory.id}>
                    <CardHeader className="bg-gray-50">
                      <CardTitle>{subcategory.name}</CardTitle>
                      <p className="mt-1 text-sm text-gray-600">{subcategory.description}</p>
                    </CardHeader>

                    <CardContent className="p-4">
                      <div className="space-y-6">
                        {subcategory.items.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-lg border border-gray-200"
                            ref={selectedItem === item.id ? itemRef : null}
                          >
                            <div 
                              className="flex cursor-pointer items-center justify-between border-b bg-gray-50 p-4"
                              onClick={() => handleItemSelect(item.id)}
                            >
                              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                              <div className="flex items-center space-x-2">
                                {selectedItem === item.id && selectedAction && (
                                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                                    {selectedAction}
                                  </span>
                                )}
                                <span className={`rounded-full px-3 py-1 text-sm ${getGapColor(item.gap)}`}>
                                  GAP: {item.gap.toFixed(1)}
                                </span>
                              </div>
                            </div>

                            <AnimatePresence>
                              {selectedItem === item.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="p-4">
                                    <div className="space-y-4">
                                      {item.questions.map((question) => (
                                        <div
                                          key={question.id}
                                          className="rounded-lg bg-gray-50 p-4"
                                        >
                                          <p className="text-gray-700">{question.text}</p>
                                        </div>
                                      ))}

                                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                                        {(['認識合わせ', '実感UP', '要望調整'] as ActionType[]).map((action) => (
                                          <button
                                            key={action}
                                            onClick={() => handleActionSelect(action)}
                                            className={`rounded-lg border px-6 py-3 text-center transition-all ${
                                              selectedAction === action
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-gray-50'
                                            }`}
                                          >
                                            {action}
                                          </button>
                                        ))}
                                      </div>

                                      <AnimatePresence>
                                        {selectedAction && (
                                          <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mt-6"
                                          >
                                            <div className="rounded-lg bg-gray-50 p-6">
                                              <h3 className="mb-4">
                                                <ActionButton
                                                  actionName={getActionName(item.name, selectedAction)}
                                                  isSelected={true}
                                                  isFocused={focusedActions.has(getActionName(item.name, selectedAction))}
                                                  onSelect={() => {}}
                                                  onAddToFocus={() => handleAddToFocus(getActionName(item.name, selectedAction))}
                                                />
                                              </h3>
                                              <div className="space-y-4">
                                                {getImprovementSteps(selectedAction, item.name).map((step, index) => (
                                                  <div
                                                    key={index}
                                                    className="flex items-start space-x-3"
                                                  >
                                                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm text-blue-600">
                                                      {index + 1}
                                                    </div>
                                                    <p className="text-gray-700">{step.text}</p>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};