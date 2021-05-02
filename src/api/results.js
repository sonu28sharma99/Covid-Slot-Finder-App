import axios from "axios"

export const getSlotsByPin = async (pin, date) => {
  const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`;

  const res = await axios.get(url, {
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US',
    },
  }).then(response => response.data.sessions).catch(err => console.error(err));
  // console.log(res);
  return res || [];
}

export const getSlotsByDistrict = async (id, date) => {
  const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`;

  const res = await axios.get(url, {
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US',
    },
  }).then(response => response.data.sessions).catch(err => console.error(err));
  // console.log(res);
  return res || [];
}