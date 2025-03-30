
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll respond shortly.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-blog-background">
        {/* Contact Header */}
        <section className="py-16 bg-white border-b border-gray-200">
          <div className="container-blog text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blog-primary mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="container-blog">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="bg-blog-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail size={24} className="text-blog-primary" />
                </div>
                <h3 className="text-xl font-bold text-blog-primary mb-3">Email</h3>
                <p className="text-gray-700 mb-2">info@articulatepost.com</p>
                <p className="text-gray-700">support@articulatepost.com</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="bg-blog-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone size={24} className="text-blog-primary" />
                </div>
                <h3 className="text-xl font-bold text-blog-primary mb-3">Phone</h3>
                <p className="text-gray-700 mb-2">Main: (123) 456-7890</p>
                <p className="text-gray-700">Support: (123) 456-7891</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="bg-blog-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin size={24} className="text-blog-primary" />
                </div>
                <h3 className="text-xl font-bold text-blog-primary mb-3">Location</h3>
                <p className="text-gray-700 mb-2">123 Blog Street</p>
                <p className="text-gray-700">Article City, AC 12345</p>
              </div>
            </div>

            {/* Contact Form and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-blog-primary mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-blog-primary"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-blog-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-blog-primary"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Advertising">Advertising</option>
                      <option value="Support">Support</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-blog-primary"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary w-full flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <Send size={18} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0648776890684!2d-122.41941642391374!3d37.77492537089772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-blog">
            <h2 className="text-3xl font-bold text-blog-primary mb-10 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-blog-primary mb-2">How can I contribute an article?</h3>
                <p className="text-gray-700">
                  We welcome contributions from writers. Please email us at contributors@articulatepost.com with your article idea or draft, along with a brief bio and writing samples.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-blog-primary mb-2">Do you offer advertising opportunities?</h3>
                <p className="text-gray-700">
                  Yes, we have various advertising options available. For more information, please contact our advertising team at ads@articulatepost.com.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-blog-primary mb-2">How can I report an issue with the website?</h3>
                <p className="text-gray-700">
                  If you encounter any technical issues or have concerns about content, please contact our support team at support@articulatepost.com.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-blog-primary mb-2">Can I republish articles from your blog?</h3>
                <p className="text-gray-700">
                  Our content is protected by copyright. If you're interested in republishing any of our articles, please contact us for permission at permissions@articulatepost.com.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
