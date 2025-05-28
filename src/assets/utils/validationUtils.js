const isActualImage = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");

    return response.ok && contentType?.startsWith("image/");
  } catch (err) {
    return false;
  }
};

export default isActualImage
