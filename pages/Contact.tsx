import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Section } from '../components/Layout';
import { CONTACT_INFO } from '../constants';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Format message for WhatsApp
    const message = `*Olá, vim pelo site!*%0A%0A` +
      `*Nome:* ${data.name}%0A` +
      `*Email:* ${data.email}%0A` +
      `*Telefone:* ${data.phone}%0A` +
      `*Assunto:* ${data.subject}%0A` +
      `*Mensagem:* ${data.message}`;

    // Get phone number from constants (remove non-digits)
    const phone = CONTACT_INFO.whatsapp.commercial.replace(/\D/g, '');

    // Redirect to WhatsApp API
    const url = `https://wa.me/55${phone}?text=${message}`;
    window.open(url, '_blank');

    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-darkGreen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-4">Fale Conosco</h1>
          <p className="text-green-100">Estamos prontos para atender você. Entre em contato por telefone, email ou visite nossa loja.</p>
        </div>
      </div>

      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Contact Info Card */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Informações de Contato</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-green/10 p-3 rounded-lg text-brand-green">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Endereço</h4>
                      <p className="text-gray-600 text-sm mt-1">{CONTACT_INFO.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-brand-green/10 p-3 rounded-lg text-brand-green">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Telefones</h4>
                      <p className="text-gray-600 text-sm mt-1">Fixo: {CONTACT_INFO.phone}</p>
                      <p className="text-gray-600 text-sm">Comercial: {CONTACT_INFO.whatsapp.commercial}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-brand-green/10 p-3 rounded-lg text-brand-green">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Emails</h4>
                      <p className="text-gray-600 text-xs mt-1 break-all">{CONTACT_INFO.emails.commercial}</p>
                      <p className="text-gray-600 text-xs break-all">{CONTACT_INFO.emails.financial}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-brand-green/10 p-3 rounded-lg text-brand-green">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Horário de Funcionamento</h4>
                      <p className="text-gray-600 text-sm mt-1">Seg - Sex: 08:00 - 18:00</p>
                      <p className="text-gray-600 text-sm">Sábado: 08:00 - 12:00</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <a
                    href={`https://wa.me/55${CONTACT_INFO.whatsapp.commercial.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-full gap-2 bg-brand-green text-white py-3 rounded-xl font-bold hover:bg-brand-darkGreen transition-colors"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Chamar no WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Envie uma mensagem</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                      <input
                        {...register("name", { required: "Nome é obrigatório" })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all"
                        placeholder="Seu nome"
                      />
                      {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefone/WhatsApp</label>
                      <input
                        {...register("phone", { required: "Telefone é obrigatório" })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all"
                        placeholder="(64) 99999-9999"
                      />
                      {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      {...register("email", { required: "Email é obrigatório", pattern: { value: /^\S+@\S+$/i, message: "Email inválido" } })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all"
                      placeholder="seu@email.com"
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                    <select
                      {...register("subject", { required: "Selecione um assunto" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all bg-white"
                    >
                      <option value="">Selecione...</option>
                      <option value="Orçamento de Peças">Orçamento de Peças</option>
                      <option value="Máquinas Novas">Máquinas Novas</option>
                      <option value="Assistência Técnica">Assistência Técnica</option>
                      <option value="Outros">Outros</option>
                    </select>
                    {errors.subject && <span className="text-red-500 text-xs mt-1">{errors.subject.message}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                    <textarea
                      {...register("message", { required: "Mensagem é obrigatória" })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all"
                      placeholder="Como podemos ajudar?"
                    />
                    {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-yellow text-brand-dark font-bold py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;