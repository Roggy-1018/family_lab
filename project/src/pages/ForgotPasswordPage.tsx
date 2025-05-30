import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Heart } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('メールアドレスを入力してください');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('有効なメールアドレスを入力してください');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Generate reset token (in a real app, this would be a secure random token)
      const resetToken = Math.random().toString(36).substring(2, 15);
      
      // Send password reset email
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: email,
          to_name: email.split('@')[0],
          reset_link: `${window.location.origin}/reset-password/${resetToken}`,
        }
      );

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Failed to send reset email:', error);
      setError('パスワードリセットメールの送信に失敗しました。しばらく経ってから再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <Card variant="elevated" className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Heart className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">パスワードをリセット</CardTitle>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {submitSuccess ? (
              <div className="rounded-lg bg-green-50 p-4 text-center">
                <p className="text-green-800">
                  パスワードリセットのメールを送信しました。<br />
                  メールの指示に従ってパスワードを再設定してください。
                </p>
              </div>
            ) : (
              <>
                <p className="text-center text-gray-600">
                  登録済みのメールアドレスを入力してください。<br />
                  パスワード再設定用のリンクをお送りします。
                </p>
                
                <Input
                  label="メールアドレス"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                  placeholder="your@email.com"
                  fullWidth
                />
              </>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            {!submitSuccess && (
              <Button
                type="submit"
                isLoading={isSubmitting}
                fullWidth
              >
                リセットメールを送信
              </Button>
            )}
            
            <Link
              to="/login"
              className="text-center text-sm text-gray-600 hover:text-blue-600"
            >
              ログイン画面に戻る
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};