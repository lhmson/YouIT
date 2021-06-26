import axios from "axios";

/**
 * @link documentation: http://api.paiza.io/docs/swagger/#!/runners/
 */
export const createRunnerSection = async (sourceCode, language, input) => {
  let url = "http://api.paiza.io:80/runners/create?&longpoll=true&api_key=guest";
  if (language)
    url += `&language=${language}`;
  if (sourceCode)
    url += `&source_code=${encodeURIComponent(sourceCode ?? "")}`;
  if (input)
    url += `&input=${encodeURIComponent(input ?? "")}`;

  return await axios.post(url);
}

/**
 * @link documentation: http://api.paiza.io/docs/swagger/#!/runners/
 */
export const getSectionDetail = async (id) =>
  axios.get(`http://api.paiza.io:80/runners/get_details?id=${id}&api_key=guest`);

