import React from 'react';
import { Card, CardContent } from '../components/ui/Card';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">プライバシーポリシー</h1>
          
          <Card className="prose prose-gray max-w-none">
            <CardContent className="p-8">
              <div className="mb-8 text-gray-600">
                <p>
                  株式会社And Adapt（以下「当社」といいます）は、当社が提供するスマートフォンアプリケーション「Family Lab アプリ」（以下「本アプリ」）において取得する利用者（以下「ユーザー」といいます）の個人情報を、以下のとおり取り扱います。
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">1. 個人情報の定義</h2>
                <p className="mt-4 text-gray-600">
                  本プライバシーポリシーにおいて「個人情報」とは、生存する個人に関する情報であって、当該情報に含まれる氏名・生年月日・その他の記述等により個人を特定できるものをいいます。また、他の情報と容易に照合することで個人を特定できる情報も含みます。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">2. 取得する情報と取得方法</h2>
                <div className="mt-4 space-y-4 text-gray-600">
                  <div>
                    <h3 className="font-medium text-gray-800">ユーザーが登録する情報</h3>
                    <p className="mt-2">
                      ユーザー名、メールアドレス、パスワード、家族構成（子どもの有無・人数など）、年齢、その他本アプリの利用に必要な情報
                    </p>
                    <p className="mt-1">
                      上記の情報は、ユーザーがアカウント登録やプロフィール編集等を行う際に取得します。
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800">端末情報およびアクセス解析に関する情報</h3>
                    <p className="mt-2">
                      利用端末の種類、OS、アプリの利用状況、Cookie、ログ情報、IPアドレス、広告ID 等
                    </p>
                    <p className="mt-1">
                      当社は本アプリの品質向上や不正利用の防止、サービス改善を目的として、アクセス解析ツールやCookieを利用する場合があります。
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800">ユーザーが本アプリに入力するデータ</h3>
                    <p className="mt-2">
                      家族エンゲージメント診断の回答内容や、任意のアンケート・コメント、メッセージ等
                    </p>
                    <p className="mt-1">
                      これらの情報は、ユーザーの入力や投稿行為によって取得します。
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">3. 利用目的</h2>
                <div className="mt-4 space-y-4 text-gray-600">
                  <div>
                    <h3 className="font-medium text-gray-800">本アプリの提供・運営</h3>
                    <p className="mt-2">
                      家族エンゲージメント診断結果の表示、アカウント管理、利用者サポートなど
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800">サービス向上と研究開発</h3>
                    <p className="mt-2">
                      ユーザーから提供された回答や利用状況を分析し、本アプリの機能改善や新機能開発に活用
                    </p>
                    <p className="mt-1">
                      個人が特定できない形に加工した統計データを用いた学術研究等
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800">セキュリティ確保と不正防止</h3>
                    <p className="mt-2">
                      不正アクセスやスパム等の不正行為を防止するための監視・解析
                    </p>
                    <p className="mt-1">
                      当社または第三者の権利や財産、サービスを保護・維持するため
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800">情報の通知</h3>
                    <p className="mt-2">
                      本アプリに関するお知らせ、メンテナンス情報、アップデート情報等の配信
                    </p>
                    <p className="mt-1">
                      ユーザーが同意した場合、その他当社サービスに関するお知らせやマーケティング情報の提供
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">4. 第三者提供</h2>
                <div className="mt-4 text-gray-600">
                  <p>当社は、ユーザーの個人情報を以下の場合を除き、第三者に開示または提供しません。</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>ユーザーの同意がある場合</li>
                    <li>法令に基づく場合</li>
                    <li>人の生命、身体または財産の保護のために必要があり、ユーザーの同意を得ることが困難な場合</li>
                    <li>公衆衛生の向上、児童の健全育成の推進などのために特に必要で、ユーザーの同意を得ることが困難な場合</li>
                    <li>国の機関または地方公共団体もしくはその委託を受けた者が法令に定める事務を遂行するうえで協力する必要があり、ユーザーの同意を得ることにより当該事務の遂行に支障を及ぼすおそれがある場合</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">5. 匿名化データの取り扱い</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    当社は、ユーザーから取得した情報を個人が特定できない形式に加工し、統計分析や学術研究、サービスの向上等の目的で活用する場合があります。
                  </p>
                  <p>
                    匿名化データには個人情報保護法が適用されないため、当社は適切な技術的措置を講じたうえで安全に管理し、第三者との共同研究や公表に活用することがあります。
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">6. 保存期間</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    当社は、取得した個人情報について、利用目的を達成するために必要な期間保持します。
                  </p>
                  <p>
                    ユーザーが退会手続きを行った場合、またはサービス提供を終了する場合は、一定の保管期間経過後、速やかに削除または匿名化します。ただし、法令で定められた保管義務がある場合はこの限りではありません。
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">7. 安全管理措置</h2>
                <div className="mt-4 space-y-4 text-gray-600">
                  <div>
                    <h3 className="font-medium text-gray-800">技術的安全管理措置</h3>
                    <ul className="mt-2 list-inside list-disc space-y-1">
                      <li>SSLなどによる通信の暗号化</li>
                      <li>パスワード管理の徹底</li>
                      <li>アクセス制御や監査ログの保存</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800">組織的安全管理措置</h3>
                    <ul className="mt-2 list-inside list-disc space-y-1">
                      <li>個人情報保護責任者の設置</li>
                      <li>社内規程の整備</li>
                      <li>従業員への教育・監督</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800">物理的安全管理措置</h3>
                    <ul className="mt-2 list-inside list-disc space-y-1">
                      <li>個人情報を取り扱う機器や記録媒体へのアクセス制限</li>
                      <li>オフィスやサーバールームへの入退室管理</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">8. Cookieの使用など</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    当社は、本アプリや関連WebサイトにおいてCookieや類似の技術を使用することがあります。これにより、ユーザーの利用状況を分析し、サービス向上や利便性向上に役立てます。
                  </p>
                  <p>
                    ユーザーはブラウザ設定でCookieの受け取りを拒否することができます。ただし、拒否設定を行った場合、本アプリの一部機能が利用できなくなる可能性があります。
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">9. ユーザーの権利</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    ユーザーは、当社が保有するユーザー本人に関する個人情報の開示、訂正、利用停止、削除を求めることができます。
                  </p>
                  <p>
                    前項の請求を行う場合、当社が定める手続きに従い、下記の「お問い合わせ先」までご連絡ください。
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">10. 未成年の利用</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    ユーザーが未成年の場合、親権者または法定代理人の同意を得た上で本アプリを利用するものとします。
                  </p>
                  <p>
                    未成年者が単独で本アプリを利用し、かつ課金等を行う場合は、法定代理人の承諾があったとみなします。
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">11. 国外へのデータ移転</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    当社は、サービスの運営やデータ処理に際して、データを国外のサーバーで管理する場合があります。この場合、当社は個人情報保護法等の関連法令の規定を遵守し、適切に管理します。
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">12. プライバシーポリシーの変更</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    当社は、本プライバシーポリシーの内容を必要に応じて変更できるものとします。
                  </p>
                  <p>
                    変更後のプライバシーポリシーは、本アプリ内または当社ウェブサイトに掲載した時点で効力を生じます。重大な変更を行う場合は、ユーザーへ事前に通知いたします。
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">13. お問い合わせ先</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    本プライバシーポリシーに関するお問い合わせ、個人情報の開示・訂正・削除等のご要望は、下記までご連絡ください。
                  </p>
                  <p>窓口：masato.kourogi@and-adapt.com</p>
                  <p>受付時間：平日10:00～17:00（年末年始・祝日を除く）</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900">14. 制定日および改定日</h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>制定日：2025年4月26日</p>
                  <p>
                    改定日：改定が行われた場合は、本アプリ内または当社ウェブサイトにて周知し、改定日を明記します。
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};