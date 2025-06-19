import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, Users, Mail, Database, FileText, Bold, Underline, Save, Italic, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const EmailComposer = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const editorRef = useRef<HTMLDivElement>(null);

  const templates = {
    blank: '',
    eventRegistration: `
      <h2 style="color: #2563eb; margin-bottom: 20px;">Event Registration Confirmation</h2>
      <p>Dear Student,</p>
      <p>Thank you for registering for our upcoming event. Your registration has been successfully confirmed.</p>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1f2937; margin-bottom: 10px;">Event Details:</h3>
        <p><strong>Event:</strong> [Event Name]</p>
        <p><strong>Date:</strong> [Event Date]</p>
        <p><strong>Time:</strong> [Event Time]</p>
        <p><strong>Venue:</strong> [Event Venue]</p>
      </div>
      <p>Please arrive 15 minutes before the event starts. Bring a valid ID for verification.</p>
      <p>Best regards,<br>[Club Name] Team</p>
    `,
    eventInvitation: `
      <h2 style="color: #7c3aed; margin-bottom: 20px;">You're Invited!</h2>
      <p>Dear Students,</p>
      <p>We are excited to invite you to our upcoming event that promises to be both educational and entertaining.</p>
      <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
        <h3 style="color: #92400e; margin-bottom: 15px;">Event Highlights:</h3>
        <ul style="color: #92400e;">
          <li>Expert speakers from the industry</li>
          <li>Networking opportunities</li>
          <li>Certificate of participation</li>
          <li>Refreshments will be provided</li>
        </ul>
      </div>
      <p>Registration is mandatory. Limited seats available.</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="[Registration Link]" style="background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Register Now</a>
      </p>
      <p>Looking forward to seeing you there!</p>
      <p>Warm regards,<br>[Club Name]</p>
    `,
    certification: `
      <div style="text-align: center; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
        <h1 style="margin-bottom: 30px; font-size: 28px;">Certificate of Achievement</h1>
        <p style="font-size: 18px; margin-bottom: 20px;">This is to certify that</p>
        <h2 style="margin: 20px 0; font-size: 24px; text-decoration: underline;">[Student Name]</h2>
        <p style="font-size: 16px; margin-bottom: 30px;">has successfully completed [Course/Event Name] conducted by [Club Name]</p>
        <div style="margin: 30px 0;">
          <p><strong>Date:</strong> [Completion Date]</p>
          <p><strong>Duration:</strong> [Course Duration]</p>
          <p><strong>Grade:</strong> [Grade/Score]</p>
        </div>
      </div>
      <p>Dear [Student Name],</p>
      <p>Congratulations on successfully completing our program! Your dedication and hard work have paid off.</p>
      <p>This certificate validates your skills and knowledge in the subject area. We hope this achievement opens new doors for your career.</p>
      <p>Best wishes for your future endeavors!</p>
      <p>Sincerely,<br>[Club Name] Team</p>
    `,
    sponsorship: `
      <h2 style="color: #059669; margin-bottom: 20px;">Partnership Opportunity</h2>
      <p>Dear [Company Name] Team,</p>
      <p>Greetings from [Club Name] at [College Name]! We hope this email finds you well.</p>
      <p>We are reaching out to explore a potential partnership opportunity for our upcoming event.</p>
      <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
        <h3 style="color: #065f46; margin-bottom: 15px;">Event Overview:</h3>
        <p><strong>Event:</strong> [Event Name]</p>
        <p><strong>Expected Attendees:</strong> [Number] students</p>
        <p><strong>Target Audience:</strong> [Target Audience]</p>
        <p><strong>Date & Venue:</strong> [Event Details]</p>
      </div>
      <h3 style="color: #059669;">Why Partner With Us?</h3>
      <ul>
        <li>Direct access to talented students</li>
        <li>Brand visibility among young professionals</li>
        <li>Opportunity to showcase your company culture</li>
        <li>Potential recruitment pipeline</li>
      </ul>
      <p>We offer various sponsorship packages tailored to meet your marketing objectives and budget.</p>
      <p>We would love to discuss this opportunity further and explore how we can create mutual value.</p>
      <p>Thank you for considering our proposal. We look forward to hearing from you.</p>
      <p>Best regards,<br>[Your Name]<br>[Position]<br>[Club Name]<br>[Contact Information]</p>
    `,
    clubRecruitment: `
      <h2 style="color: #dc2626; margin-bottom: 20px;">Join Our Amazing Team!</h2>
      <p>Hey Fellow Students! 👋</p>
      <p>Are you passionate about [Club Focus Area]? Do you want to make a difference while building valuable skills?</p>
      <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
        <h3 style="color: #991b1b; margin-bottom: 15px;">[Club Name] is Recruiting!</h3>
        <p>We're looking for enthusiastic students to join our team and help us create impactful events and initiatives.</p>
      </div>
      <h3 style="color: #dc2626;">What We Offer:</h3>
      <ul>
        <li>🚀 Leadership development opportunities</li>
        <li>🤝 Networking with industry professionals</li>
        <li>📜 Certificates and recognition</li>
        <li>💡 Platform to implement your creative ideas</li>
        <li>🎯 Skill development workshops</li>
      </ul>
      <h3 style="color: #dc2626;">Open Positions:</h3>
      <ul>
        <li>Technical Team Members</li>
        <li>Event Management Team</li>
        <li>Design and Creative Team</li>
        <li>Marketing and Social Media Team</li>
      </ul>
      <p style="text-align: center; margin: 30px 0;">
        <a href="[Application Link]" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Apply Now</a>
      </p>
      <p><strong>Application Deadline:</strong> [Deadline Date]</p>
      <p>Don't miss this opportunity to be part of something amazing!</p>
      <p>Cheers,<br>[Club Name] Recruitment Team</p>
    `
  };

  const handleBold = () => {
    document.execCommand('bold', false, '');
    editorRef.current?.focus();
  };

  const handleItalic = () => {
    document.execCommand('italic', false, '');
    editorRef.current?.focus();
  };

  const handleUnderline = () => {
    document.execCommand('underline', false, '');
    editorRef.current?.focus();
  };

  const handleFontSize = (size: string) => {
    document.execCommand('fontSize', false, size);
    editorRef.current?.focus();
  };

  const handleAlignment = (align: string) => {
    document.execCommand('justify' + align, false, '');
    editorRef.current?.focus();
  };

  const handleColorChange = (color: string) => {
    document.execCommand('foreColor', false, color);
    editorRef.current?.focus();
  };

  const handleBackgroundColor = (color: string) => {
    document.execCommand('backColor', false, color);
    editorRef.current?.focus();
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    const content = templates[template as keyof typeof templates] || '';
    setHtmlContent(content);
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setHtmlContent(editorRef.current.innerHTML);
    }
  };

  const handleSaveEmail = async () => {
    if (!htmlContent.trim()) {
      toast({
        title: "Error",
        description: "Please compose your email content.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/save-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent,
          template: selectedTemplate,
          createdAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Email saved successfully!",
        });
      } else {
        throw new Error('Failed to save email');
      }
    } catch (error) {
      console.error('Error saving email:', error);
      toast({
        title: "Error",
        description: "Failed to save email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
      {/* Navigation Header */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        <a href="/file-processor">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-lg">
            <Database className="h-4 w-4 mr-2" />
            File Processor
          </Button>
        </a>
        <a href="/">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-lg">
            <Mail className="h-4 w-4 mr-2" />
            Email Generator
          </Button>
        </a>
        <a href="/mail-sender">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-lg">
            <Send className="h-4 w-4 mr-2" />
            Send Mail
          </Button>
        </a>
        <a href="/email-composer">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-lg">
            <FileText className="h-4 w-4 mr-2" />
            Compose Email
          </Button>
        </a>
        <a href="/club-mail">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-lg">
            <Users className="h-4 w-4 mr-2" />
            Club Mail
          </Button>
        </a>
      </div>

      <div className="max-w-4xl mx-auto pt-20">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <FileText className="h-8 w-8 text-blue-600" />
              Email Composer
            </CardTitle>
            <p className="text-lg text-gray-600 mt-2">
              Create professional emails using templates or start from scratch
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Template Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Choose a Template
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: 'blank', label: 'Blank Email', color: 'bg-gray-100 hover:bg-gray-200' },
                    { key: 'eventRegistration', label: 'Event Registration', color: 'bg-blue-100 hover:bg-blue-200' },
                    { key: 'eventInvitation', label: 'Event Invitation', color: 'bg-purple-100 hover:bg-purple-200' },
                    { key: 'certification', label: 'Certification', color: 'bg-green-100 hover:bg-green-200' },
                    { key: 'sponsorship', label: 'Sponsorship Request', color: 'bg-yellow-100 hover:bg-yellow-200' },
                    { key: 'clubRecruitment', label: 'Club Recruitment', color: 'bg-red-100 hover:bg-red-200' }
                  ].map((template) => (
                    <Button
                      key={template.key}
                      variant="outline"
                      className={`p-4 h-auto text-center ${template.color} ${
                        selectedTemplate === template.key ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => handleTemplateSelect(template.key)}
                    >
                      {template.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Email Content *
                </Label>
                
                {/* Enhanced Toolbar */}
                <div className="flex flex-wrap items-center gap-2 p-3 border rounded-t-md bg-gray-50">
                  {/* Text Formatting */}
                  <div className="flex gap-1 border-r pr-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleBold}
                      className="h-8 w-8 p-0"
                      title="Bold"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleItalic}
                      className="h-8 w-8 p-0"
                      title="Italic"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleUnderline}
                      className="h-8 w-8 p-0"
                      title="Underline"
                    >
                      <Underline className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Font Size */}
                  <div className="flex gap-1 border-r pr-2">
                    <select
                      onChange={(e) => handleFontSize(e.target.value)}
                      className="text-xs border rounded px-2 py-1"
                      title="Font Size"
                    >
                      <option value="">Size</option>
                      <option value="1">Small</option>
                      <option value="3">Normal</option>
                      <option value="5">Large</option>
                      <option value="7">X-Large</option>
                    </select>
                  </div>

                  {/* Alignment */}
                  <div className="flex gap-1 border-r pr-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAlignment('Left')}
                      className="h-8 w-8 p-0"
                      title="Align Left"
                    >
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAlignment('Center')}
                      className="h-8 w-8 p-0"
                      title="Align Center"
                    >
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAlignment('Right')}
                      className="h-8 w-8 p-0"
                      title="Align Right"
                    >
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Text Color */}
                  <div className="flex gap-1 border-r pr-2">
                    <span className="text-xs text-gray-600 mr-1">Text:</span>
                    {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange(color)}
                        title={`Set text color to ${color}`}
                      />
                    ))}
                  </div>

                  {/* Background Color */}
                  <div className="flex gap-1">
                    <span className="text-xs text-gray-600 mr-1">Background:</span>
                    {['#FFFFFF', '#FFEB9C', '#9FC5E8', '#D5A6BD', '#B6D7A8', '#FFD1DC', '#E1D5E7', '#F4CCCC'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => handleBackgroundColor(color)}
                        title={`Set background color to ${color}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Editor */}
                <div
                  ref={editorRef}
                  contentEditable
                  className="w-full min-h-[400px] p-4 border border-t-0 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  style={{ whiteSpace: 'pre-wrap' }}
                  onInput={handleEditorInput}
                  suppressContentEditableWarning={true}
                />
                <p className="text-xs text-gray-500">
                  Use the toolbar above to format your text. Select a template to get started or compose from scratch.
                </p>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSaveEmail}
                disabled={isLoading || !htmlContent.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving Email...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-5 w-5" />
                    Save Email
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailComposer;
