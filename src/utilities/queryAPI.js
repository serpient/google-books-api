import axios from 'axios';

const queryAPI = (input, successFn, errorFn) => {
  return axios.get('https://www.googleapis.com/books/v1/volumes', {
    params: {
      key: 'AIzaSyCLJvxg85jgfaMwaORDzP9ECY83JCLXQtU',
      q: input,
      orderBy: 'relevance',
      maxResults: 20,
      fields: 'totalItems,items(volumeInfo(title,authors,imageLinks/thumbnail,infoLink,publisher))' 
    }
  })
  .then((res) => {
    let { data: { items, totalItems } } = res;
    let result = totalItems > 0 ? items : [];
    successFn(result);
    return res;
  })
  .catch((err) => {
    console.error(err);
    let { message } = err.response.data.error;
    errorFn(message);
    return err;
  })
}

export default queryAPI;