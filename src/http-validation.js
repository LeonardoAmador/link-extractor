import chalk from "chalk";

function extractLinks(linksArray) {
  return linksArray.map((linkObject) => Object.values(linkObject).join());
}

async function checkStatus(urlList) {
    const statusArray = await Promise.all(
      urlList.map(async (url) => {
        try {
          const response = await fetch(url, { method: "HEAD" });
          return response.status;
        } catch (error) {
           return verifyError(error)
        }
      })
    );
    return statusArray;
}

function verifyError(error) {
    if (error.cause.code === "ENOTFOUND") {
        return "Link not found";
    } else {
        return "Something went wrong!";
    }
}

export default async function validatedList(linksList) {
  const links = extractLinks(linksList);
  const status = await checkStatus(links);

  return linksList.map((object, index) => ({
    ...object,
    status: status[index],
  }));
}