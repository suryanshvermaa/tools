
import React, { useState } from 'react';
import { Upload, FileText, Send, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import axios from "axios";

const FileProcessor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [manualData, setManualData] = useState('');
  const [jsonResponse, setJsonResponse] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'file' | 'manual'>('file');

  const acceptedFileTypes = '.csv,.xlsx,.pdf,.tsv,.txt';
  const fileTypeLabels = ['CSV', 'XLSX', 'PDF', 'TSV', 'TXT'];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setManualData(''); // Clear manual data when file is selected
    }
  };

  const handleManualDataChange = (value: string) => {
    setManualData(value);
    if (value.trim()) {
      setSelectedFile(null); // Clear file when manual data is entered
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile && !manualData.trim()) {
      toast({
        title: "No data provided",
        description: "Please upload a file or enter data manually.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call - replace with actual backend endpoint
      // await new Promise(resolve => setTimeout(resolve, 2000));

      const formdata=new FormData();
      formdata.append("file",selectedFile);
      formdata.append("data",manualData);
      const res=await axios.post("http://localhost:3000/jsonData",formdata,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      setJsonResponse(res.data.data.respData);
      
      // // Mock JSON response based on input type
      // const mockResponse = {
      //   status: "success",
      //   dataType: selectedFile ? selectedFile.type : "manual_input",
      //   fileName: selectedFile?.name || "manual_data",
      //   extractedData: {
      //     totalRecords: 25,
      //     columns: ["name", "email", "phone", "company", "position"],
      //     records: [
      //       {
      //         id: 1,
      //         name: "John Doe",
      //         email: "john.doe@example.com",
      //         phone: "+1-555-0123",
      //         company: "Tech Corp",
      //         position: "Software Engineer"
      //       },
      //       {
      //         id: 2,
      //         name: "Jane Smith",
      //         email: "jane.smith@example.com",
      //         phone: "+1-555-0124",
      //         company: "Design Studio",
      //         position: "UI/UX Designer"
      //       },
      //       {
      //         id: 3,
      //         name: "Mike Johnson",
      //         email: "mike.johnson@example.com",
      //         phone: "+1-555-0125",
      //         company: "Marketing Inc",
      //         position: "Marketing Manager"
      //       }
      //     ]
      //   },
      //   metadata: {
      //     processedAt: new Date().toISOString(),
      //     processingTime: "1.2s",
      //     fileSize: selectedFile ? `${(selectedFile.size / 1024).toFixed(2)} KB` : "N/A"
      //   }
      // };

      // setJsonResponse(mockResponse);
      toast({
        title: "Data processed successfully!",
        description: `Extracted records from your data.`
      });
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "There was an error processing your data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const clearData = () => {
    setSelectedFile(null);
    setManualData('');
    setJsonResponse(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Database className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              File Data Processor
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your data files or enter data manually to extract and process information into structured JSON format.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Tab Selection */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex space-x-2">
                  <Button
                    variant={activeTab === 'file' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveTab('file')}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                  <Button
                    variant={activeTab === 'manual' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveTab('manual')}
                    className="flex-1"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Manual Input
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* File Upload Section */}
            {activeTab === 'file' && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    Upload Your File
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {fileTypeLabels.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                      Select File
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept={acceptedFileTypes}
                      onChange={handleFileSelect}
                      className="cursor-pointer"
                      disabled={isProcessing}
                    />
                  </div>
                  {selectedFile && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Selected:</strong> {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Manual Input Section */}
            {activeTab === 'manual' && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    Enter Data Manually
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Label htmlFor="manual-data" className="block text-sm font-medium text-gray-700 mb-2">
                      Paste your data here
                    </Label>
                    <Textarea
                      id="manual-data"
                      value={manualData}
                      onChange={(e) => handleManualDataChange(e.target.value)}
                      placeholder="Paste your CSV data, text content, or any structured data here..."
                      className="min-h-32 resize-none"
                      disabled={isProcessing}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      {manualData.length} characters
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex space-x-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={isProcessing || (!selectedFile && !manualData.trim())}
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="h-4 w-4 mr-2" />
                        Process Data
                      </div>
                    )}
                  </Button>
                  <Button
                    onClick={clearData}
                    variant="outline"
                    disabled={isProcessing}
                    className="px-6"
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div>
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Extracted Data (JSON)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {jsonResponse ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 max-h-96 overflow-auto">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                        {JSON.stringify(jsonResponse, null, 2)}
                      </pre>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Records: {jsonResponse.extractedData?.totalRecords || 0}</span>
                      <span>Processed: {jsonResponse.metadata?.processedAt ? new Date(jsonResponse.metadata.processedAt).toLocaleString() : 'N/A'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Database className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">No data processed yet</p>
                    <p className="text-sm">
                      Upload a file or enter data manually, then click "Process Data" to see the extracted JSON here.
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

export default FileProcessor;
