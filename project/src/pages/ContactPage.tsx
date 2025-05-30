import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Mail, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = '件名を入力してください';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'メッセージを入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: 'masato.kourogi@and-adapt.com',
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">お問い合わせ</h1>
          <p className="mb-8 text-xl text-gray-600">
            ご質問やご相談がございましたら、お気軽にお問い合わせください。
          </p>

          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <Card className="bg-white">
              <CardContent className="flex items-center p-4">
                <Phone className="mr-3 h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium">お電話</h3>
                  <p className="text-sm text-gray-600">080-7137-0449</p>
                  <p className="text-xs text-gray-500">平日 10:00 - 17:00</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="flex items-center p-4">
                <Mail className="mr-3 h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium">メール</h3>
                  <p className="text-sm text-gray-600">masato.kourogi@and-adapt.com</p>
                  <p className="text-xs text-gray-500">24時間受付</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>お問い合わせフォーム</CardTitle>
            </CardHeader>
            <CardContent>
              {submitSuccess ? (
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <h3 className="mb-2 font-medium text-green-800">
                    お問い合わせを受け付けました
                  </h3>
                  <p className="text-green-700">
                    内容を確認次第、担当者よりご連絡させていただきます。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      label="お名前"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      placeholder="山田 太郎"
                      fullWidth
                    />
                  </div>

                  <div>
                    <Input
                      label="メールアドレス"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="your@email.com"
                      fullWidth
                    />
                  </div>

                  <div>
                    <Input
                      label="件名"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={errors.subject}
                      placeholder="お問い合わせ内容の件名"
                      fullWidth
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      メッセージ
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.message
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="お問い合わせ内容をご記入ください"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    fullWidth
                  >
                    送信する
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};