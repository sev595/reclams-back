export const ClearCreatePostDataHelper = (body: any) => {
  const {
    title,
    description,
    featureImg,
    postFormat,
    slidePost,
    date,
    slug,
    featured
  } = body;

  return {
    title,
    description,
    featureImg,
    postFormat,
    slidePost,
    date,
    slug,
    featured
  };
};

export const ClearUpdatePostDataHelper = (body: any) => {
  const {
    title,
    description,
    featureImg,
    postFormat,
    slidePost,
    date,
    slug,
    featured
  } = body;

  return {
    title,
    description,
    featureImg,
    postFormat,
    slidePost,
    date,
    slug,
    featured
  };
};
