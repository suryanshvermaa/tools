
import React, { useState } from 'react';
import { Send, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';

const EmailGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const examplePrompts = [
    {
      prompt:`Informing about the upcoming event "NITP TechFest 2025". The event will be held on August 10, 2025, at the Main Auditorium, from 10:00 AM to 4:00 PM. Include a short welcoming note and describe the event briefly, mentioning that registration is open.`,
      title: "Event Invitation Email"
    },
    {
      prompt:`This is the event registration email for "NITP TechFest 2025". The event will be held on August 10, 2025, at the Main Auditorium, from 10:00 AM to 4:00 PM. Here is a registration link of this: https://nitptechfest.com/register. Include a short welcoming note and describe the event briefly, mentioning that registration is open.`,
      title: "Event Registration Email"
    },{
      prompt: `There is a meeting schedules for tomorrow at 3:00 PM at the Incubation Center. The agenda is to discuss the upcoming project deadlines and team roles. Please ensure all team members are informed.This is by NIT Patna Club.`,
      title: "Meeting Notification Email"
    },
    {
      prompt: `Dear members, we are excited to announce the upcoming "NITP TechFest 2025" event. It will be held on August 10, 2025, at the Main Auditorium from 10:00 AM to 4:00 PM. We invite all students to participate and showcase their talents. Registration is now open!`,
      title: "Club Event Announcement Email"
    },
    {
      prompt: `This is a reminder for the "NITP TechFest 2025" event happening tomorrow, August 10, 2025, at the Main Auditorium from 10:00 AM to 4:00 PM. We look forward to seeing you there!`,
      title: "Event Reminder Email"
    }
  ];

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  const handleGenerateEmail = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "You need to provide a prompt to generate an email.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_API}/generateMail`,{prompt:prompt});
      setGeneratedEmail(res.data.data.email);
      toast({
        title: "Email generated successfully!",
        description: "Your email has been created and is ready for review."
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              AI Email Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create professional emails instantly with AI. Just describe what you need, and we'll generate the perfect email for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Example Prompts */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg font-semibold text-gray-800">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                  Quick Start Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="flex space-x-3 pb-2">
                    {examplePrompts.map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePromptSelect(example.prompt)}
                        className="whitespace-nowrap text-xs hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                      >
                        {example.title}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prompt Input */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Describe Your Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Example: Write a professional follow-up email after a job interview for a software developer position..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    disabled={isGenerating}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {prompt.length}/500
                  </div>
                </div>
                
                <Button
                  onClick={handleGenerateEmail}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 transition-all duration-200 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Generating Email...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="h-4 w-4 mr-2" />
                      Generate Email
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div>
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Email Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedEmail ? (
                  <div className="bg-gray-50 rounded-lg p-1 border border-gray-200">
                    <div 
                      className="bg-white rounded border border-gray-200 overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: generatedEmail }}
                    />
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Mail className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">No email generated yet</p>
                    <p className="text-sm">
                      Enter a prompt and click "Generate Email" to see your email preview here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailGenerator;
