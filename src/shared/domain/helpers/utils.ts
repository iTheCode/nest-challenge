async function isJsonUrl(url: string): Promise<boolean> {
  const extension = url.split(".").pop();
  return extension.toLowerCase() === "json";
}

export function findUrl(text: string): string | null {
  const urlRegex = /(https?:\/\/[^\s]+)/gi;

  const match = urlRegex.exec(text);

  return match ? match[0] : null;
}

export async function getContentFromUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${url}`);
    }
    return response.text();
  } catch (error) {
    console.error(`Error validating URL: ${url}`, error);
    return "";
  }
}

export async function getContentFromJsonUrl(url: string): Promise<string> {
  try {
    const isJson = await isJsonUrl(url);
    if (isJson) {
      return await getContentFromUrl(url);
    } else {
      const contentFromWeb = await getContentFromUrl(url);
      if (contentFromWeb)
        return await getContentFromJsonUrl(findUrl(contentFromWeb));
    }
    return url;
  } catch (error) {
    return "";
  }
}
