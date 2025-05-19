import React, { useState } from 'react';
import backgroundImg from '../Assets/banner.jpg';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle email submission logic here
        console.log('Email submitted:', email);
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    return (
        <div
            className="min-h-screen text-white relative"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Header/Navigation */}
            <header className="container mx-auto px-6 py-6 flex justify-between items-center">
                <div className="text-4xl font-bold text-red-600">FILMEX</div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-black/70 text-white border border-gray-600 rounded px-8 py-1 appearance-none"
                        >
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                        </select>
                    </div>
                    <button
                        onClick={handleSignIn}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                        Sign In
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 flex flex-col items-center justify-center min-h-[calc(100vh-250px)]">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-4">
                        Unlimited movies, TV shows, and more
                    </h1>
                    <h2 className="text-2xl mb-8">
                        Watch anywhere. Cancel anytime.
                    </h2>

                    <p className="font-medium mb-4">
                        Ready to watch? Enter your email to create or restart your membership.
                    </p>

                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="flex-1 px-4 py-3 rounded bg-black/70 border border-gray-600 text-white"
                                required
                                variant="outlined"
                            />
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-8 py-3 rounded text-xl font-semibold hover:bg-red-700 transition-colors"
                            >
                                Get Started
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default LandingPage; 