import { type LayersObject } from '../store/slices/imagesSlice';

// encrypting image into base64
export const filesToDataURL = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result as string);

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// fetching image layers data from the store
export const getLayersDataFromStore = (
  currentObject: LayersObject | undefined,
  title: string,
) => {
  let currentLayer;

  if (currentObject) {
    currentLayer = currentObject.images.find((item) => item.id === title);

    if (currentLayer) {
      return currentLayer;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
