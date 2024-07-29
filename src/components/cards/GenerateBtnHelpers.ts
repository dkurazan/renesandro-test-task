import { type ImageLayer } from '../../store/slices/imagesSlice';

type DataForImagesGeneration = {
  images: string[];
  dimension: string;
  style: string;
  manual_prompts?: string;
  gen_per_ref: number;
  flow: string;
};

type DataForCreoGeneration = {
  name: string;
  dimension: '1x1' | '9x16' | '16x9';
  templateId: 'mwpswxcudtwxb' | '0xdoscyowl50c';
  ammount: string;
  genType: 'cyclic' | 'random';
  image_layers: string[];
  text_layers: string[];
};

export const getDataForImagesGeneration = (
  layersData: ImageLayer[],
): (DataForImagesGeneration | null)[] => {
  return layersData.map((item) => {
    if (
      item &&
      item.image &&
      item.dimension &&
      item.style &&
      item.gen_per_ref &&
      item.flow
    ) {
      const layerObject: DataForImagesGeneration = {
        images: [item.image],
        dimension: item.dimension,
        style: item.style,
        manual_prompts: item.manual_prompts || '',
        gen_per_ref: +item.gen_per_ref,
        flow: item.flow,
      };

      return layerObject;
    } else {
      alert(`Please fill in all the required fields for layer: ${item.id}`);
      return null;
    }
  });
};

export const sendGenerationRequest = async (
  data: DataForImagesGeneration | DataForCreoGeneration,
  endpoint: string,
) => {
  const response = await fetch(
    `https://fasteasy-jvqis72guq-lm.a.run.app/${endpoint}`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Basic ${import.meta.env.VITE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
