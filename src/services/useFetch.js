function useFetch() {
  const baseURL = 'https://mitramas-test.herokuapp.com/customers';

  const token = process.env.REACT_APP_TOKEN;

  const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Cache-Control': 'no-cache',
      'Authorization': token,
    });

  const getAll = async () => {
    const resp = await fetch(baseURL, {
      method: 'GET',
      headers,
    });
    return await resp.json();
  };

  const create = async (data) => {
    const resp = await fetch(baseURL, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    return await resp.json();
  };

  const remove = async (id) => {
    const resp = await fetch(baseURL + '/' + id, {
      method: 'DELETE',
      headers,
    });

    return await resp.json();
  };

  const removeAll = async () => {
    const resp = await fetch(baseURL, {
      method: 'DELETE',
      headers,
    });
    return await resp.json();
  };

  const update = async (id, data) => {
    const resp = await fetch(baseURL + '/' + id, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    return await resp.json();
  };

  const findByName = async (name) => {
    const resp = await fetch(`${baseURL}/?name=${name}`, {
      method: 'GET',
      headers,
    });
    return await resp.json();
  };

  return {
    getAll,
    create,
    remove,
    removeAll,
    update,
    findByName,
  };
}

export default useFetch;
