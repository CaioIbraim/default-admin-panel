'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {Video} from '@/components/Video'

export default function UploadVideoPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)


   

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload')
      return
    }

    setUploading(true)
    setProgress(0)
    setError(null)
    setUploadedUrl(null)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `public/${fileName}`

      // Create an AbortController for the fetch request
      const abortController = new AbortController()

      // Use XMLHttpRequest to track progress
      const xhr = new XMLHttpRequest()
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100)
          setProgress(percentComplete)
        }
      }
     

      const { data, error } = await supabase.storage
        .from('bucket') // Nome do bucket que você criou no Supabase
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });
      
      
      if (error) {
        throw error
      }

      const { data: { publicUrl } } = supabase.storage
        .from('bucket')
        .getPublicUrl(filePath)

      setUploadedUrl(publicUrl)
    } catch (error) {
      setError('Error uploading file')
      console.error('Error uploading file:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-600 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
      <div className="mb-4">
        <Label htmlFor="video-file">Select Video File</Label>
        <Input
          id="video-file"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>
      {file && (
        <p className="mb-4 text-sm text-gray-600">
          Selected file: {file.name}
        </p>
      )}
      <Button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full mb-4"
      >
        {uploading ? 'Uploading...' : 'Upload Video'}
      </Button>
      {uploading && (
        <Progress value={progress} className="mb-4" />
      )}
      {error && (
        <p className="mb-4 text-red-500">{error}</p>
      )}
      {uploadedUrl && (
        <div className="mb-4">
          <p className="text-green-500 mb-2">Video uploaded successfully!</p>
          
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View uploaded video
          </a>
<Video videoId={uploadedUrl}/>
        </div>

      )}
    </div>
  )
}

