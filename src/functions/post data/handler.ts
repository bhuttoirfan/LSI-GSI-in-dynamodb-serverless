import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { DynamoDB } from '../../libs/dynamodb';

import schema from './schema';

const post_data: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const data = event.body;

    const query = {
      TableName: 'Media-Table',
      Item: {
        ...data
      }
    }

    await DynamoDB.addData(query);

    return formatJSONResponse({
      message: "Data Added"
    });
  } catch (err) {
    console.log(err);
  }
}

export const main = middyfy(post_data);
