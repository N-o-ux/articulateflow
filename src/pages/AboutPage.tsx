
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, MapPin, Phone } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-blog-background">
        {/* About Header */}
        <section className="py-16 bg-white border-b border-gray-200">
          <div className="container-blog text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blog-primary mb-6">
              About Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the story behind ArticulatePost and our mission to provide insightful content.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16">
          <div className="container-blog">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold text-blog-primary mb-6">Our Story</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  ArticulatePost was founded in 2023 with a simple mission: to create a platform where readers can find thoughtful, well-researched articles on topics that matter. We believe in the power of words to inform, inspire, and connect people.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  What started as a small blog has grown into a diverse community of writers, thinkers, and readers from around the world. We're committed to covering a wide range of topics including technology, lifestyle, AI, travel, and business.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our team of dedicated writers and editors work tirelessly to bring you content that is not only informative but also engaging and thought-provoking. We're passionate about what we do and we hope that shows in every article we publish.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-64 h-64 bg-blog-secondary rounded-lg opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-blog-primary rounded-lg opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Team working"
                  className="w-full h-auto rounded-lg shadow-lg relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white">
          <div className="container-blog">
            <h2 className="text-3xl font-bold text-blog-primary mb-10 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blog-background rounded-lg p-8 text-center">
                <div className="bg-blog-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blog-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blog-primary mb-3">Integrity</h3>
                <p className="text-gray-700">
                  We are committed to honesty, transparency, and factual reporting in everything we publish.
                </p>
              </div>
              <div className="bg-blog-background rounded-lg p-8 text-center">
                <div className="bg-blog-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blog-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blog-primary mb-3">Innovation</h3>
                <p className="text-gray-700">
                  We continuously explore new ideas, technologies, and perspectives to keep our content fresh and relevant.
                </p>
              </div>
              <div className="bg-blog-background rounded-lg p-8 text-center">
                <div className="bg-blog-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blog-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blog-primary mb-3">Community</h3>
                <p className="text-gray-700">
                  We value our readers and strive to create content that resonates with and brings value to our community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="container-blog">
            <h2 className="text-3xl font-bold text-blog-primary mb-10 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://i.pravatar.cc/300?img=1"
                  alt="Team Member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blog-primary mb-1">Sarah Johnson</h3>
                  <p className="text-gray-500 mb-3">Founder & Editor-in-Chief</p>
                  <p className="text-gray-700 text-sm">
                    Sarah has over 15 years of experience in journalism and publishing.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://i.pravatar.cc/300?img=12"
                  alt="Team Member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blog-primary mb-1">David Lee</h3>
                  <p className="text-gray-500 mb-3">Senior Editor</p>
                  <p className="text-gray-700 text-sm">
                    David specializes in technology and business reporting.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://i.pravatar.cc/300?img=20"
                  alt="Team Member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blog-primary mb-1">Maria Garcia</h3>
                  <p className="text-gray-500 mb-3">Content Strategist</p>
                  <p className="text-gray-700 text-sm">
                    Maria brings creative ideas and strategic thinking to our content.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://i.pravatar.cc/300?img=7"
                  alt="Team Member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blog-primary mb-1">James Wilson</h3>
                  <p className="text-gray-500 mb-3">Head of Design</p>
                  <p className="text-gray-700 text-sm">
                    James ensures our platform is beautiful, intuitive, and accessible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-blog-primary text-white">
          <div className="container-blog">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Get In Touch</h2>
              <p className="max-w-2xl mx-auto text-gray-200">
                Have questions, suggestions, or want to work with us? We'd love to hear from you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-gray-200">info@articulatepost.com</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-gray-200">(123) 456-7890</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                <p className="text-gray-200">123 Blog Street, Article City</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
