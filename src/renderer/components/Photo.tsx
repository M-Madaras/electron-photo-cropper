import { useState, useCallback } from "react"
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import { readFile, cropImageData } from "../../helpers/images"

export default function Photo() {
  const [imageSrc, setImageSrc] = useState (null); // file data
  const [crop, setCrop] = useState({ x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [filename, setFileName] = useState (null); // file address

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const onCropComplete = useCallback((_croppedArea: Area, currentCroppedAreaPixels: Area) => {
      setCroppedAreaPixels(currentCroppedAreaPixels);
  }, []);
  const handleFileChange = async(e: any) => {
    if (e.target.files && e.target.files.length) {
      //we got a file...
      const file = e.target.files[0];
      setFileName(file.path);
      // get image data from the file
      const imageData:any = await readFile(file);
      //setImageSrc to image data
      setImageSrc(imageData);
    }
  }
  const handleSave = async () => {
    // first save the crop image
    // first creat the cropped image data using a canvas...
    const base64data = await cropImageData(imageSrc, croppedAreaPixels!)
    .catch(console.error);
    // create a new filename
    const newFileName = filename + '-cropped.png';
    // send those results to saveImage via ipcRender event
    window.electron.saveCroppedImage([newFileName, base64data])
    // then reset the interface
    setImageSrc(null);
    setZoom(1);
    setCrop({ x: 0, y: 0});
  }
  if(!imageSrc) {
    return (
      <>
      <h1>Please Choose Photo to Crop</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      </>
    )
  }
  return (
    <>
    <Cropper
    image={imageSrc}
    crop={crop}
    zoom={zoom}
    onCropChange={setCrop}
    onZoomChange={setZoom}
    onCropComplete={onCropComplete}
     />
     <button className='save-btn' onClick={handleSave}>Save</button>
    </>
  )
}
