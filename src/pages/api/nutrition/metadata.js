/** @format */

import Axios from 'axios';
import qs from 'querystring';

export default async (req, res) => {
  try {
    const body = {
      includeNutrition: true,
      ingredientList: req.query.query
    };

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const response = await Axios.post(
      `https://api.spoonacular.com/recipes/parseIngredients?apiKey=${process.env.SPOONACULAR_API_KEY}`,
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
