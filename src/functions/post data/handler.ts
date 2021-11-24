import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { DynamoDB } from '../../libs/dynamodb';

import schema from './schema';

const post_data: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    // const data = event.body;

    // const query = {
    //   TableName: 'Media-Table',
    //   Item: {
    //     ...data
    //   }
    // }



    
      let actor = "naveed"
      let movie = "kaha hai khan"
      let role = "hero"
      let year = "2021"
      let genre =  "action"
      let array =  [
        {
          name: "Irfan",
          age: 16
        },
        {
          name: "naveed",
          age: 80
        }
      ]
    

    const query = {
      TableName: 'Media-Table',
      Item: {
        actor,
        movie,
        year,
        role,
        genre,
        array
      }
    }

    await DynamoDB.addData(query);

    return formatJSONResponse({
      message: "Data Added",
      query
    });
  } catch (err) {
    console.log(err);
  }
}

export const main = middyfy(post_data);
