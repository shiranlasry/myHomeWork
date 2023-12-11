import axios from "axios";
const BASE_URL = "https://dummyjson.com";

export const getPostsByUserId = async (userId: number) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/posts/user/${userId}`);
    return data.posts;
  } catch (error) {
    console.error(error);
  }
}