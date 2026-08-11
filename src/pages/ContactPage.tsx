import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  Clock, 
  Building, 
  HelpCircle, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Linkedin, Instagram, Github } from '../components/common/SocialIcons';
import { useData } from '../context/DataContext';
import { useSiteContent } from '../hooks/useSiteContent';

export const ContactPage: React.FC = () => {
  const { submitMessage } = useData();
  const { getContent } = useSiteContent();

  const heading     = getContent('contact', 'heading')     || 'Get In Touch';
  const description = getContent('contact', 'description') || 'Have a question, partnership proposal, or want to collaborate with Nexora E-Cell? We\'d love to hear from you.';
  const email       = getContent('footer', 'email')        || getContent('contact', 'email') || 'ecell@acet.ac.in';
  const phone       = getContent('contact', 'phone')       || '';
  const address     = getContent('contact', 'address')     || 'Nexora E-Cell, Innovation Block, Anjuman College of Engineering & Technology, Mangalwari Bazaar Road, Sadar, Nagpur, Maharashtra 440001';
  const mapUrl      = getContent('contact', 'map_url')     || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.8988654571765!2d79.08339257600738!3d21.156402483363384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0e6659f80a7%3A0xb35a39cb20f9fa4c!2sAnjuman%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';
  const linkedinUrl = getContent('footer', 'linkedin_url')  || 'https://linkedin.com';
  const instagramUrl= getContent('footer', 'instagram_url') || 'https://instagram.com';
  const githubUrl   = getContent('footer', 'github_url')    || 'https://github.com';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
    type: 'general' as 'general' | 'partnership' | 'sponsorship' | 'mentorship',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const success = await submitMessage(formData);
      if (success) {
        setIsSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: '',
          type: 'general',
        });
      } else {
        setErrorMessage('Failed to send message. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-nexora-900/15 via-sky-950/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nexora-500/10 border border-nexora-500/30 text-xs font-semibold text-nexora-300 uppercase tracking-widest mb-4">
            <Mail className="w-4 h-4 text-nexora-400" />
            <span>Reach Out To Us</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-white tracking-tight mb-4">
            {heading.includes('Touch') ? (
              <>
                Get In <span className="text-gradient-cyan">Touch</span>
              </>
            ) : (
              heading
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {description}
          </p>
        </div>

        {/* 2-Column Split: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-surface-elevated/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">Send Us a Message</h3>
                  <p className="text-xs text-slate-400 mt-0.5">We typically respond within 24-48 hours</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-nexora-500/10 border border-nexora-500/30 flex items-center justify-center text-nexora-400">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white font-heading">Message Sent!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Nexora E-Cell. Our team will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold text-nexora-300 bg-nexora-500/10 border border-nexora-500/30 hover:bg-nexora-500/20 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexora-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexora-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-slate-700/80 text-sm text-white focus:outline-none focus:border-nexora-500 transition-colors"
                      >
                        <option value="general">General Question</option>
                        <option value="partnership">Corporate Partnership</option>
                        <option value="sponsorship">Event Sponsorship</option>
                        <option value="mentorship">Mentorship Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief summary of inquiry"
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexora-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      placeholder="Write your message or proposal details here..."
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexora-500 transition-colors resize-none"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-nexora-400 via-sky-300 to-blue-500 shadow-glow-sm hover:shadow-glow-md disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Contact Cards & Location */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Cards */}
            <div className="p-8 rounded-3xl bg-surface-elevated/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
              <h3 className="text-xl font-bold font-heading text-white pb-3 border-b border-slate-800">
                Direct Channels
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-nexora-500/10 border border-nexora-500/20 flex items-center justify-center text-nexora-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Campus Headquarters</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1 whitespace-pre-line">
                      {address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-nexora-500/10 border border-nexora-500/20 flex items-center justify-center text-nexora-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Official Inquiries</h4>
                    <a href={`mailto:${email}`} className="text-xs text-nexora-400 hover:underline">
                      {email}
                    </a>
                  </div>
                </div>

                {phone && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-nexora-500/10 border border-nexora-500/20 flex items-center justify-center text-nexora-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Phone</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{phone}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-slate-400">
                  Follow Our Social Channels
                </h4>
                <div className="flex items-center gap-3">
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-surface border border-slate-700 text-slate-300 hover:text-nexora-400 hover:border-nexora-500/40 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-surface border border-slate-700 text-slate-300 hover:text-nexora-400 hover:border-nexora-500/40 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-surface border border-slate-700 text-slate-300 hover:text-nexora-400 hover:border-nexora-500/40 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            {mapUrl && (
              <div className="rounded-3xl overflow-hidden border border-slate-800 h-64 bg-slate-900 shadow-xl">
                <iframe
                  title="ACET Nagpur Campus Location"
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
