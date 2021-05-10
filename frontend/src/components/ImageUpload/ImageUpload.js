import React, { useState, useEffect, useRef } from 'react'
import { Input, Image } from 'semantic-ui-react'

const ImageUpload = (props) => {
    const [file, setFile] = useState()
    const [preview, setPreview] = useState()
    const [pickedFile, setPickedFile] = useState(false)
    let currentFile = useRef()

    useEffect(() => {
        if(!file) return

        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreview(fileReader.result)
        }

        fileReader.readAsDataURL(file[0])
    }, [file])

    const ImagePicker = (event) => {
        if(event.target.files && event.target.files.length !== 0) {
            setFile(event.target.files)
            setPickedFile(true)
            props.onChange(event.target.files[0])
        }
    }


    return(
        <>
            {preview && pickedFile && <Image size="small" centered src={preview} />}
            <Input type="file" name="file" size="small" onChange={ImagePicker} ref={currentFile} />
        </>
    )

}

export default ImageUpload