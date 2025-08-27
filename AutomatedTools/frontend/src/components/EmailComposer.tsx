import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, Users, Mail, Database, FileText, Bold, Underline, Save, Italic, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import axios from 'axios';

const EmailComposer = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const editorRef = useRef<HTMLDivElement>(null);

  // Enable inline CSS styles
  useEffect(() => {
    document.execCommand('styleWithCSS', true);
  }, []);

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
      await axios.put(`${import.meta.env.VITE_BACKEND_API}/updateMail`, { mail: htmlContent });
      toast({
        title: "Success!",
        description: "Email saved successfully!",
      });
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
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Email Content *</Label>

                <div className="flex flex-wrap items-center gap-2 p-3 border rounded-t-md bg-gray-50">
                  <div className="flex gap-1 border-r pr-2">
                    <Button onClick={handleBold} type="button" variant="outline" size="sm" className="h-8 w-8 p-0" title="Bold">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleItalic} type="button" variant="outline" size="sm" className="h-8 w-8 p-0" title="Italic">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleUnderline} type="button" variant="outline" size="sm" className="h-8 w-8 p-0" title="Underline">
                      <Underline className="h-4 w-4" />
                    </Button>
                  </div>

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

                  <div className="flex gap-1 border-r pr-2">
                    <Button onClick={() => handleAlignment('Left')} type="button" variant="outline" size="sm" className="h-8 w-8 p-0" title="Align Left">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => handleAlignment('Center')} type="button" variant="outline" size="sm" className="h-8 w-8 p-0" title="Align Center">
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => handleAlignment('Right')} type="button" variant="outline" size="sm" className="h-8 w-8 p-0" title="Align Right">
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>

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
