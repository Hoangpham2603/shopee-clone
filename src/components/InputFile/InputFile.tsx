import { useRef, useState } from 'react'
import config from '../constants/config'
import { toast } from 'react-toastify'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()

  const handleOnFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]
    if ((fileFromLocal && fileFromLocal.size >= config.maxSizeUploadAvatar) || !fileFromLocal?.type.includes('image')) {
      toast.error('invalid img type')
    } else {
      onChange && onChange(fileFromLocal)
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <>
      <input
        type='file'
        accept='.jpg, .jpeg, .png'
        className='hidden'
        ref={fileInputRef}
        onChange={handleOnFileChange}
        onClick={(e) => ((e.target as any).value = null)}
      />
      <button
        className='flex h-10 items-center  justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm '
        onClick={handleUpload}
      >
        Upload
      </button>
    </>
  )
}
