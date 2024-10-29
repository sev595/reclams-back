export const ClearCreatePostDataHelper = (body: any) => {
  const {
    title,
    description,
    imageUrl,
  } = body;

  return {
    title,
    description,
    imageUrl
  };
};

export const ClearUpdatePostDataHelper = (body: any) => {
  const {
    title,
    description,
    imageUrl,
  } = body;

  return {
    title,
    description,
    imageUrl
  };
};
