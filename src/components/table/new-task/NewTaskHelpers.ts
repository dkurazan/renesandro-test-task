// Type for collecting input data
export type SelectedData = {
  name?: string;
  dimension?: '1x1' | '9x16' | '16x9';
  templateId?: 'mwpswxcudtwxb' | '0xdoscyowl50c';
  text?: string[];
  ammount?: string;
  genType?: 'cyclic' | 'random';
  images?: string[];
};

// Initial state of native input data
export const initialState: SelectedData = {
  name: '',
  ammount: '',
};

// Validating function for the creating new task process
export const validateData = (inputData: SelectedData) => {
  if (
    inputData &&
    inputData.name &&
    inputData.dimension &&
    inputData.templateId &&
    inputData.text &&
    inputData.ammount &&
    inputData.genType &&
    inputData.images
  ) {
    return {
      id: `${inputData.name}--${Math.random() * 1000}`,
      name: inputData.name,
      dimension: inputData.dimension,
      templateId: inputData.templateId,
      text: inputData.text,
      ammount: inputData.ammount,
      genType: inputData.genType,
      images: inputData.images,
    };
  } else {
    return false;
  }
};
