import API from "./index";

export const fetchPosts = () => API.get("/post/list/all");
export const fetchAPost = (id) => API.get(`/post/${id}`);

/**
 * @param {"news_feed"|"user_profile"|"pending_in_group"|"group"} space
 */
export const fetchPostsPagination = (
  page,
  limit,
  space,
  ownerId,
  groupId,
  help
) => {
  let url = "/post?";
  if (page) url += `&_page=${page}`;
  if (limit) url += `&_limit=${limit}`;
  if (space) url += `&space=${space}`;
  if (ownerId) url += `&ownerId=${ownerId}`;
  if (groupId) url += `&groupId=${groupId}`;
  if (help) url = "/post?help";
  return API.get(url);
};
export const fetchOtherPosts = (id) => API.get(`post/${id}/others`);
export const fetchCountPosts = (range, timeString) =>
  API.get(`post/count/${range}/${timeString}`);

export const createPost = (newPost) => API.post("/post", newPost);

// owner action
export const updatePost = (id, updatedPost) =>
  API.put(`/post/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/post/${id}`);

// user interaction
export const upvotePost = (id) => API.put(`/post/${id}/upvote`);

export const unvotePost = (id) => API.put(`/post/${id}/unvote`);

export const downvotePost = (id) => API.put(`/post/${id}/downvote`);

export const hidePost = (id) => API.put(`/post/${id}/hide`);

export const unhidePost = (id) => API.put(`/post/${id}/unhide`);

export const followPost = (id) => API.put(`/post/${id}/follow`);

export const unfollowPost = (id) => API.put(`/post/${id}/unfollow`);


export const approveGroupPost = (id) => API.put(`/post/${id}/group/approve`)
export const declineGroupPost = (id) => API.delete(`/post/${id}/group/decline`)


export const getMyInteractions = (id) => API.get(`/post/${id}/myInteractions`);

export const getCommentsNumber = (postId) =>
  API.get(`post/${postId}/commentsNumber`);
