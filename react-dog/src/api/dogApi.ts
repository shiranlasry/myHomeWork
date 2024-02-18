// dogApi.ts  

import axios from "axios";


const API_URL = "https://dog.ceo/api";

export const getAllBreeds = async () => {
  try {
    
    const {data} = await axios.get(`${API_URL}/breeds/list/all`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getBreedImages = async (breed: string, count: number) => {
  try {
    const { data } = await axios.get(`${API_URL}/breed/${breed}/images/random/${count}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};