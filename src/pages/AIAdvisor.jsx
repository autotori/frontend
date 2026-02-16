import { useState } from 'react';

function AIAdvisor() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        setMessages([...messages, { role: 'user', content: input }]);

        // Simulate AI response (will be replaced with actual AI integration)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'AI car recommendations will be available soon! I will help you find the perfect car based on your budget, family size, fuel preferences, and driving habits.'
            }]);
        }, 500);

        setInput('');
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Car Advisor</h2>
                    <p className="text-gray-600">Get personalized car recommendations based on your needs</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Budget Analysis</h3>
                        <p className="text-sm text-gray-600">
                            Get recommendations based on your budget and total cost of ownership
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Family Needs</h3>
                        <p className="text-sm text-gray-600">
                            Find cars that match your family size and lifestyle requirements
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Fuel Efficiency</h3>
                        <p className="text-sm text-gray-600">
                            Compare fuel types and running costs for your driving habits
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                        <h3 className="text-white font-semibold">
                            Chat with AI Advisor
                        </h3>
                    </div>

                    <div className="h-96 overflow-y-auto p-6 bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="text-center text-gray-500 mt-12">
                                <p className="mb-4">Start a conversation to get personalized car recommendations!</p>
                                <div className="text-sm text-gray-400 space-y-2">
                                    <p>Try asking:</p>
                                    <p>"I need a family car under €25,000"</p>
                                    <p>"What's the best fuel-efficient car for daily commuting?"</p>
                                    <p>"Compare maintenance costs for hybrid vs diesel"</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.role === 'user'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white border border-gray-200 text-gray-900'
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSendMessage} className="border-t p-4 bg-white">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about car recommendations..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                        <span className="font-semibold">Note:</span> AI recommendations are currently in development.
                        The advisor will use advanced AI to analyze your requirements and suggest the best cars based on
                        budget, family size, fuel efficiency, and maintenance costs.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AIAdvisor;
