import React from 'react';
import { Card, CardContent } from '../components/ui/Card';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">利用規約</h1>
          
          <Card className="prose prose-gray max-w-none">
            <CardContent className="p-8">
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第1条 目的および適用</h2>
                <p className="mt-4 text-gray-600">
                  本規約は、株式会社And Adapt（以下「当社」といいます）が提供するスマートフォンアプリケーション「Family Lab アプリ」（以下「本アプリ」といいます）の利用に関する条件を定めるものです。
                </p>
                <p className="mt-2 text-gray-600">
                  本アプリを利用するすべての方（以下「ユーザー」といいます）は、本規約に同意したものとみなします。ユーザーが本規約に同意いただけない場合、本アプリを利用できません。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第2条 事業者情報</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>事業者名：株式会社And Adapt</p>
                  <p>代表者名：興梠眞人</p>
                  <p>所在地：〒154-0002 東京都世田谷区下馬6-19-3</p>
                  <p>連絡先：</p>
                  <p>電話番号：080-7137-0449</p>
                  <p>メールアドレス：masato-kourogi@and-adapt.com</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第3条 本アプリの概要</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>本アプリは、学術的根拠に基づく家族エンゲージメント診断および関連情報を提供し、夫婦・家族のコミュニケーション改善や関係構築をサポートすることを目的としています。</p>
                  <p>本アプリの利用対象者は、夫婦・家族を主としますが、年齢その他の制限がある場合は当社が別途定める場合があります。</p>
                  <p>本アプリは基本的な診断機能を無料で利用でき、一部の拡張機能や改善コンテンツは有料サブスクリプションとして提供します。</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第4条 アカウント登録・利用開始</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>ユーザーは、本アプリでメールアドレスとパスワードを登録することでアカウントを作成し、利用を開始できます。登録情報は正確かつ真実であることが求められます。</p>
                  <p>本アプリでは、ユーザー名や年齢、家族構成（子どもの有無など）の入力が必要となる場合があります。これらはサービス提供の範囲内で利用します。</p>
                  <p>夫婦や家族内でアカウントを共有する場合、登録情報や診断結果の整合性についてはユーザー側の責任とします。</p>
                  <p>ユーザーはパスワードを自己の責任で管理し、不正使用による損害について当社は一切の責任を負いません。</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第5条 料金・支払い</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>本アプリの基本診断機能は無料で利用できます。</p>
                  <p>一部の拡張診断機能や改善コンテンツは有料サブスクリプションとして提供します。料金や支払方法、契約期間などは本アプリ内または当社ウェブサイトで提示する条件に従います。</p>
                  <p>法令に基づく場合を除き、支払済みの料金については返金を行いません。</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第6条 個人情報の取り扱い</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>当社は、ユーザーの個人情報を家族エンゲージメント診断結果の提供やサービス向上、研究開発などの目的で利用します。</p>
                  <p>当社は、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に開示・提供しません。</p>
                  <p>ユーザーが入力したデータを個人が特定できない形に加工し、統計分析や学術研究に利用する場合があります。</p>
                  <p>当社は、必要に応じてCookieやアクセス解析ツールを使用することがあります。詳細はプライバシーポリシーをご確認ください。</p>
                  <p>個人情報の開示・訂正・削除等のお問い合わせは、masato-kourogi@and-adapt.com までご連絡ください。</p>
                  <p>当社は別途定めるプライバシーポリシーに基づき、ユーザーの個人情報を厳格に管理します。</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第7条 サービスの提供・変更・中断・終了</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>当社は、運営上または技術上の理由により、本アプリの内容を変更、追加、または終了することがあります。原則として事前に本アプリやウェブサイト上で告知しますが、緊急の場合は事後告知となる場合があります。</p>
                  <p>本アプリの変更や中断・終了により、ユーザーが損害を被った場合でも、当社は一切の責任を負いません。</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第8条 禁止事項</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <ul className="list-inside list-disc space-y-1">
                    <li>不正アクセス、逆アセンブル、リバースエンジニアリング</li>
                    <li>個人情報の不正取得や無断公開</li>
                    <li>営業・商業目的での無断利用</li>
                    <li>他のユーザーのプライバシーや名誉を侵害する行為</li>
                    <li>公序良俗に反する行為、その他当社が不適切と判断する行為</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第9条 知的財産権</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>本アプリに含まれる文章、画像、プログラム等の著作権や商標権、その他の知的財産権は、当社または正当な権利を有する第三者に帰属します。</p>
                  <p>ユーザーが投稿・アップロードするコンテンツの権利処理はユーザー自身の責任とし、第三者の権利を侵害しないよう注意してください。</p>
                  <p>ユーザーは当社が明示的に許諾する範囲内、かつ私的利用の範囲においてのみ本アプリ内のコンテンツを利用できます。</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第10条 責任・免責</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>本アプリの診断結果やアドバイスは参考情報であり、医療行為または専門家によるカウンセリング行為を代替するものではありません。</p>
                  <p>ユーザーは、自身の判断と責任において本アプリを利用し、その結果生じる一切の責任を負うものとします。</p>
                  <p>当社は、本アプリの利用により生じた直接・間接的損害について、一切の責任を負いません。</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第11条 規約の変更</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>当社は、必要と判断した場合は、本規約を変更することができます。</p>
                  <p>本規約の変更を行う場合、当社は事前に本アプリ内または当社ウェブサイトで告知し、変更後の規約が施行された後にユーザーが利用を継続した時点で変更に同意したものとみなします。</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第12条 退会・利用停止</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>ユーザーは、設定画面または当社が定める方法により、いつでも退会手続きを行うことができます。退会後は、個人を特定できる情報を削除しますが、匿名化された統計データとしての利用は継続する場合があります。</p>
                  <p>当社は、ユーザーが本規約に違反したと判断した場合、事前の通知なく利用停止またはアカウントを削除することができます。</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第13条 準拠法・裁判管轄</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>本規約の準拠法は日本法とします。</p>
                  <p>本アプリの利用に関して紛争が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">第14条 お問い合わせ先</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>お問い合わせ窓口：masato.kourogi@and-adapt.com</p>
                  <p>受付時間：平日10:00～17:00（年末年始・祝日を除く）</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900">第15条 施行日・改定日</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>本規約は2025年4月26日より施行します。</p>
                  <p>改定がある場合は、当社ウェブサイト等で周知し、改定日を明記します。</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};