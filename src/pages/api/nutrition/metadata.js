/** @format */

import Axios from 'axios';
import qs from 'querystring';

export default async (req, res) => {
  try {
    const body = {
      query: req.query.query
    };

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-app-id': process.env.NUTRITIONIX_APP_ID,
        'x-app-key': process.env.NUTRITIONIX_APP_KEY
      }
    };

    const response = await Axios.post(
      'https://trackapi.nutritionix.com/v2/natural/nutrients',
      qs.stringify(body),
      config
    );

    res.statusCode = 200;
    res.json(response.data);
  } catch (error) {
    console.error(error.response);
    res.statusCode = error.response.status;
    res.json({ message: 'failed' });

    if (error.response) {
      console.error(error.response.body);
    }
  }
};
