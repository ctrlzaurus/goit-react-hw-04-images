// import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/';
// const API_KEY = '34227427-bed69196739ab14a9612e550e';

// export const searchPixabayApi = (q, page = 1) => {
//   return axios
//     .get('api/', {
//       params: {
//         q,
//         page,
//         per_page: 12,
//         key: API_KEY,
//       },
//     })
//     .then(res => res.data);
// };

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

const searchPixabayApi = async (query, page) => {
  const response = await fetch(
    `https://pixabay.com/api/?key=34227427-bed69196739ab14a9612e550e&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  )
  .then((response) => response.json())
  .catch((error) => console.log(error.message));
  return response;
};

const ImageAPI = {
  searchPixabayApi,
}

export default ImageAPI;