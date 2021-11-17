import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'getData',
                request: {
                    schema: {
                        'application/json': schema
                    }
                }
            }
        }
    ]
};
//# sourceMappingURL=index.js.map