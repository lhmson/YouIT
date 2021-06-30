import axios from 'axios'

/**
 * @param {FetchMarkdownOption} option 
 * @returns {Promise<string>} Markdown content
 */
export const fetchMarkdown = async (option) => {
  try {
    switch (option?.type) {
      case "url": return fetchMarkdownFromUrl(option);
      case "github": return fetchMarkdownFromGithub(option);
      default: return null;
    }
  } catch {
    return null;
  }
}


/**
 * @param {FetchMarkdownOption} option 
 * @returns {string} Markdown content
 */
const fetchMarkdownFromUrl = async (option) => {
  const { url } = option;

  if (!url)
    return null;

  const result = (await axios.get(url.url, url.body)).data;
  return result;
}

/**
 * @param {FetchMarkdownOption} option 
 * @returns {string} Markdown content
 */
const fetchMarkdownFromGithub = async (option) => {
  const { github } = option;

  if (!github)
    return null;

  const url = `https://raw.githubusercontent.com/${github.owner}/${github.repo}/${github.branch}/README.md`
  const result = (await axios.get(url)).data;
  return result;
}



/**
 * @typedef {Object} FetchMarkdownOption
 * @property {"github"|"url"} type
 *
 * @property {{url: string, body: any}} url A specific URL to get markdown
 * @property {{repo: string, owner: string, branch: string}} github [github] The github repository
 */