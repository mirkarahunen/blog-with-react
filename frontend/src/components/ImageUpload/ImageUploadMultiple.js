import React, { useState, useEffect } from 'react'
import { Button, Input, Image, Form } from 'semantic-ui-react'
//import { useHistory } from 'react-router-dom'

const ImageUploadMulti = props => {
    //const [file, setFile] = useState('')
    const [multiplefiles, setMultipleFiles] = useState()
    const [preview, setPreview] = useState([])
    const [newFile, setNewFile] = useState()
    const [pickedFile, setPickedFile] = useState(false)
    //const history = useHistory()

    useEffect(() => {
        if(!multiplefiles) {
            return
        }
       
    }, [multiplefiles, newFile])

    
    const imagePicker = (event) => {
        let files;

        

        //if(event.target.files && event.target.files.length === 1)
        if(event.target.files && event.target.files.length > 0) {
            //file = event.target.files[0]
            files = event.target.files
            console.log(files);
            setMultipleFiles(files)
            setPickedFile(true)

            for (let index = 0; index < files.length; index++) {
                const element = files[index];
    
    
                const fileReader = new FileReader()
                fileReader.onload = () => {
                    setPreview(fileReader.result)
                }
                fileReader.readAsDataURL(element);
                console.log(element);
            }
        } else {
        }    
    }

    const uploadImage = async () => {
        let element
        const formData = new FormData()

        for (let index = 0; index < multiplefiles.length; index++) {
            element = multiplefiles[index];
            formData.append('image', element)
        }
            formData.append('image_key', props.id)
        try {  
          const response = await fetch('http://localhost:5000/api/uploadImages', {
              method: 'POST',
              body: formData
          })
          const responseData = await response.json()
          console.log(responseData);
          setNewFile(responseData.name);

        } catch(err) {
            console.log(err);
        }
        
    }
    
    return(
        <>
        {preview && pickedFile && <Image centered size="small" src={preview}/>}
        {!multiplefiles ? 
        <Form method="post" encType="multipart/form-data">
            <Input onChange={imagePicker} type="file" name="file" icon='upload' color="purple" multiple/>
        </Form>     
          
        :
        <Button color="purple" type="submit" onClick={uploadImage}>Upload</Button>}
        
        </>
    )
}

export default ImageUploadMulti