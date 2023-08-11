function extractLinks(linksArray) {
  return linksArray.map((linkObject) => Object.values(linkObject).join());
}

async function checkStatus(urlList) {
  try {
    const statusArray = await Promise.all(
      urlList.map(async (url) => {
        const response = await fetch(url, { method: "HEAD" });
        return response.status;
      })
    );

    return statusArray;
  } catch (error) {
    console.error("Error during status check:", error);
    throw error;
  }
}

export default async function validatedList(linksList) {
  const links = extractLinks(linksList);
  const status = await checkStatus(links);
  console.log(status);
  return status;
}
