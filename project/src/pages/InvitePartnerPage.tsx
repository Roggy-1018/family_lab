import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { Copy, Check, Users } from 'lucide-react';

export const InvitePartnerPage: React.FC = () => {
  const { user } = useAuthStore();
  const [copied, setCopied] = useState(false);
  const [familyCode] = useState(() => {
    // Generate a unique family code if not exists
    return user?.familyId || `FAM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  });

  const inviteUrl = `${window.location.origin}/register?familyCode=${familyCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">パートナーを招待</h1>
            <p className="mt-2 text-xl text-gray-600">
              パートナーと一緒に診断を行うことで、より正確な分析が可能になります
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>招待リンク</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                <code className="text-sm text-gray-800">{inviteUrl}</code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="ml-4 flex items-center space-x-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>コピー完了</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>URLをコピー</span>
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                このリンクをパートナーに共有してください。リンクから登録すると、自動的にあなたの家族グループに参加できます。
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>QRコード</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4">
                  <QRCodeSVG
                    value={inviteUrl}
                    size={200}
                    level="H"
                    includeMargin
                    className="h-48 w-48"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  スマートフォンのカメラでQRコードを読み取ることもできます
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>家族コード</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4">
                <code className="text-2xl font-bold text-gray-800">{familyCode}</code>
              </div>
              <p className="text-center text-sm text-gray-600">
                このコードを使って、パートナーは既存のアカウントを家族グループに接続することもできます
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};