import axios from "axios";
const BASE_URL = "https://dummyjson.com";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    // console.log(response.data);  // Log the response data

    
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (username: string, password: string) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, 
    { username, password });

    // Save the token to session storage
    if (data.token) {
      sessionStorage.setItem('token', data.token);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getUser = async (id: number) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/${id}`);

    return data;
  } catch (error) {
    console.error(error);
  }
}
