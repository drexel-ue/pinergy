import React from 'react';
import Dropzone from 'react-dropzone'

export default class PinDropzone extends React.Component{
  constructor(props) {
    super(props)
    this.state = { 
      imgSrc: null
    }
  }

  verifyFile(file) {
    const maxImgSize = 10000000;
    const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
    const acceptedFileTypesArr = acceptedFileTypes.split(",").map((item) => { return item.trim() })
    if (file && file.length > 0) {
      const currentFile = file[0]
      const currentFileType = currentFile.type
      const currentFileSize = currentFile.size
      if (currentFileSize > maxImgSize) {
        alert("File too big")
        return false
      }
      if (!acceptedFileTypesArr.includes(currentFileType)) {
        alert("File type not allowed")
        return false
      }
    }
  }
  handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles)
    }
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files)
      if (isVerified) { 
        const currentFile = files[0]
        const myFileItemReader = new FileReader()
        myFileItemReader.addEventListener("load", () => {
          this.setState({
            imgSrc: myFileItemReader.result
          })
        }, false)
        myFileItemReader.readAsDataURL(currentFile)
      }
    }
  }

  render() {
    const { imgSrc } = this.state;
    const maxImgSize = 10000000;
    const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'

    return(
      <div className="fileuplder">
        <div className="upload-border">
          <label for="fileUploadId" class="file-label">
            <div>
              <i className="fas fa-arrow-circle-up" />
            </div>
            <br />
          </label>
          <div>
            {imgSrc !== null ? <img src={imgSrc} className='imgprvw' /> :
              <Dropzone
                onDrop={() => this.handleOnDrop()}
                maxSize={maxImgSize}
                multiple={false}
                accept={acceptedFileTypes}
              >
                {() => "Drop image here or click to upload"}
              </Dropzone>}
          </div>

        </div>
        </div>
    )
  }
}