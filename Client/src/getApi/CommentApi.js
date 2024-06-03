import axios from "axios";
const BASE_URL = "http://localhost:1234/api/comment";
class CommentApi {
  updateLike(id, nickname) {
    return axios.put(BASE_URL + "/update/like", null, {
      params: { nickname, id },
    });
  }
  updateDislike(id, nickname) {
    return axios.put(BASE_URL + "/update/dislike", null, {
      params: { nickname, id },
    });
  }
}
export default new CommentApi();
