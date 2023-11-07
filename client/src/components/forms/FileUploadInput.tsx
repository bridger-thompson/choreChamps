import React, { ChangeEvent, MouseEventHandler, useRef } from 'react';

interface FileUploadProps {
  label?: string,
  accept?: string,
  onImagesSelect: (dataURIs: string[]) => void,
  singleOnly?: boolean,
  showDefault?: boolean,
}

export const FileUploadInput: React.FC<FileUploadProps> = ({
  label,
  accept = "image/png, image/jpg, image/jpeg",
  onImagesSelect,
  showDefault = true,
  singleOnly
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const dataURIs: string[] = []

    if (selectedFiles) {
      let processedCount = 0

      const readFile = (file: File) => {
        const reader = new FileReader()

        reader.onload = () => {
          const dataURI = reader.result as string
          dataURIs.push(dataURI)
          processedCount++

          if (processedCount === selectedFiles.length) {
            onImagesSelect(dataURIs)
          }
        }

        reader.readAsDataURL(file)
      }

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        readFile(file)
      }
    } else {
      onImagesSelect([])
    }
  };

  const selectDocumentsHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (e.currentTarget.id === "fileIcon") {
      fileRef.current?.click();
    }
  };

  return (
    <div className="row">
      {label && (
        <div className='col-auto my-auto'>
          {label}
        </div>
      )}
      <div className='col-auto'>
        <input
          id="fileUpload"
          type="file"
          className="form-control"
          accept={accept}
          multiple={!singleOnly}
          onChange={handleFileChange}
          hidden={!showDefault}
          ref={fileRef}
        />
        {!showDefault && (
          <button className='btn btn-bold'
            id='fileIcon'
            onClick={selectDocumentsHandler}
          >
            <i className='bi bi-camera' />
          </button>
        )}
      </div>
    </div>
  )
}