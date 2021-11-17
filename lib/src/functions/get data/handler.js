import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from '../../libs/dynamodb';
const get_data = async (event) => {
    try {
        const p_data = event.body;
        const query = {
            TableName: "Media-Table",
            IndexName: "GenreYearIndex",
            KeyConditionExpression: "genre = :ac and #year = :yr",
            ExpressionAttributeNames: {
                "#year": "year"
            },
            ExpressionAttributeValues: {
                ":ac": p_data.actor,
                ":yr": p_data.movie
            }
        };
        const data = await DynamoDB.getData(query);
        return formatJSONResponse({
            data
        });
    }
    catch (err) {
        console.log(err);
    }
};
export const main = middyfy(get_data);
//# sourceMappingURL=handler.js.map