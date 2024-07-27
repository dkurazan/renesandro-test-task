type encryptedImageType = { name: string; url: string };

export const filesToDataURL = (
  files: File[],
): Promise<encryptedImageType[]> => {
  return Promise.all(
    files.map(
      (file) =>
        new Promise<encryptedImageType>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () =>
            resolve({ name: file.name, url: reader.result as string });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        }),
    ),
  );
};
