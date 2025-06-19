
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Send, Paperclip, Mail, Database, FileText, Users } from 'lucide-react';

const MailSender = () => {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [attachments, setAttachments] = useState<FileList | null>(null);
  const [sendToClubMembers, setSendToClubMembers] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const teams = [
    { value: 'ALL', label: 'All Members' },
    { value: 'web', label: 'Web Team' },
    { value: 'core', label: 'Core Team' },
    { value: 'android', label: 'Android Team' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachments(e.target.files);
  };

  const handleSendMail = async () => {
    if (!sendToClubMembers && !recipients.trim()) {
      toast({
        title: "Error",
        description: "Please enter recipients or select club members option.",
        variant: "destructive",
      });
      return;
    }

    if (!subject.trim()) {
      toast({
        title: "Error",
        description: "Please enter a subject for the email.",
        variant: "destructive",
      });
      return;
    }

    if (!emailContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter email content.",
        variant: "destructive",
      });
      return;
    }

    if (sendToClubMembers && !selectedTeam) {
      toast({
        title: "Error",
        description: "Please select a team for club members.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      
      if (sendToClubMembers) {
        formData.append('sendToClubMembers', 'true');
        formData.append('team', selectedTeam);
      } else {
        formData.append('recipients', recipients);
      }
      
      formData.append('subject', subject);
      formData.append('content', emailContent);
      
      if (attachments) {
        Array.from(attachments).forEach((file, index) => {
          formData.append(`attachment_${index}`, file);
        });
      }

      const response = await fetch('/api/send-general-mail', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Success!",
          description: `Email sent successfully${sendToClubMembers ? ` to ${selectedTeam === 'ALL' ? 'all members' : selectedTeam + ' team'}` : ''}!`,
        });
        
        // Reset form
        setRecipients('');
        setSubject('');
        setEmailContent('');
        setAttachments(null);
        setSendToClubMembers(false);
        setSelectedTeam('');
        const fileInput = document.getElementById('attachments') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
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
              <Send className="h-8 w-8 text-blue-600" />
              Send Email
            </CardTitle>
            <p className="text-lg text-gray-600 mt-2">
              Send emails to anyone with attachments and club member options
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Club Members Option */}
              <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                <Checkbox
                  id="clubMembers"
                  checked={sendToClubMembers}
                  onCheckedChange={(checked) => setSendToClubMembers(checked as boolean)}
                />
                <Label htmlFor="clubMembers" className="text-sm font-medium text-gray-700">
                  Send to Club Members Only
                </Label>
              </div>

              {/* Team Selection (only if club members is checked) */}
              {sendToClubMembers && (
                <div className="space-y-2">
                  <Label htmlFor="team" className="text-sm font-medium text-gray-700">
                    Select Team *
                  </Label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose team..." />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.value} value={team.value}>
                          {team.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Recipients Input (only if not sending to club members) */}
              {!sendToClubMembers && (
                <div className="space-y-2">
                  <Label htmlFor="recipients" className="text-sm font-medium text-gray-700">
                    Recipients *
                  </Label>
                  <Input
                    id="recipients"
                    type="text"
                    placeholder="Enter email addresses separated by commas..."
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    Separate multiple email addresses with commas
                  </p>
                </div>
              )}

              {/* Subject Input */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Email Subject *
                </Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Enter email subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Email Content */}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                  Email Content *
                </Label>
                <Textarea
                  id="content"
                  placeholder="Enter your email content here..."
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="w-full min-h-[200px]"
                />
              </div>

              {/* File Attachments */}
              <div className="space-y-2">
                <Label htmlFor="attachments" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Paperclip className="h-4 w-4" />
                  Attachments (Optional)
                </Label>
                <Input
                  id="attachments"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  You can attach multiple files of any format
                </p>
              </div>

              {/* Selected Files Display */}
              {attachments && attachments.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected Files:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {Array.from(attachments).map((file, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Paperclip className="h-3 w-3" />
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Send Button */}
              <Button
                onClick={handleSendMail}
                disabled={isLoading || !subject.trim() || !emailContent.trim() || (sendToClubMembers && !selectedTeam) || (!sendToClubMembers && !recipients.trim())}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending Email...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send Email
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

export default MailSender;
