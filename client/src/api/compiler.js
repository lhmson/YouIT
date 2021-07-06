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


/**
 * @link documentation: http://api.paiza.io/docs/swagger/#!/runners/
 * @returns {Promise<RunDetail>} runDetail
 */
export const runCode = async (sourceCode, language, input) => {
  const { data } = (await createRunnerSection(sourceCode, language, input)) ?? {};
  const { id } = data;

  let runDetail = null;
  try {
    runDetail = (await getSectionDetail(id)).data;
  } catch (err) {
    console.log(err);
  }

  return runDetail;
}

/**
 * a const only to get the type of run detail
 * @type {RunDetail}
 */
export const RUN_DETAIL_NULL = null;

/**
 * @typedef {Object} RunDetail
 *
 * @property {String} id Section id
 * @property {string} language Programming language
 * @property {string?} build_stdout build output to stdout
 * @property {string?} build_stderr build output to stderr
 * @property {string?} build_exit_code build exit code
 * @property {'success'|'failure'|'error'} build_result
 *
 * @property {string?} stdout code output to stdout
 * @property {String?} stderr code output to stderr
 * @property {string?} exit_code exit code
 * @property {number?} time time to run (seconds)
 * @property {number?} memory code memory usage (bytes)
 * @property {'success'|'failure'|'error'} result
 */