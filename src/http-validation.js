function extractLinks(linksArray) {
    return linksArray.map(linkObject => Object.values(linkObject).join());
}

export default function validatedList(linksList) {
    return extractLinks(linksList);
}