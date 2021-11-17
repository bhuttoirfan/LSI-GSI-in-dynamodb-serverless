import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { DynamoDB } from '../../libs/dynamodb';

import schema from './schema';

const delete_data: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const data = event.body;

    const query = {
      TableName: 'Media-Table',
      Key: {
        actor: data.actor,
        movie: data.movie
      }
    }

    await DynamoDB.deleteData(query);

    return formatJSONResponse({
      message: "Item deleted"
    });
  } catch (err) {
    console.log(err);
  }
}

export const main = middyfy(delete_data);
