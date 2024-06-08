import axios from "axios";
const BASE_URL = "http://localhost:1234/api/problem";

class ProblemApi {
  create({ statement, title, timelimit, memorylimit, accessToken }) {
    return axios.post(
      BASE_URL + "/create",
      { title, statement, timelimit, memorylimit },
      { headers: { Authorization: "Bearer " + accessToken } }
    );
  }
  addTestCase({ problem, input, output, accessToken }) {
    return axios.post(
      BASE_URL + "/testcase?id=" + problem,
      { input, output },
      { headers: { Authorization: "Bearer " + accessToken } }
    );
  }
  getProblem(id) {
    return axios.get(BASE_URL + "/get/testcase?id=" + id);
  }
  getProblems({ page }) {
    return axios.get(BASE_URL + "/fetch?page=" + page);
  }
  update({ statement, id, title, timelimit, memorylimit, accessToken }) {
    return axios.put(
      BASE_URL + "/update?id=" + id,
      { title, statement, timelimit, memorylimit },
      { headers: { Authorization: "Bearer " + accessToken } }
    );
  }
}

export default new ProblemApi();