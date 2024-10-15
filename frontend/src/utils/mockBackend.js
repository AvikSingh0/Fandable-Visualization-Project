// mockBackend.js

const tasks = {
    id: 1,
    text: 'Hello World',
    source: 'Reddit'
}

const posts = {
    titles: 'Hello World',
    message: 'Posts successfully added',
    count: 5
}
const res = {
    message: 'Posts successfully deleted',
    count: 5
}
export default async function mockBackend(url) {
    switch (url) {
        case '/posts':
            return {
                status: 200,
                json: async () => tasks
            };
        case '/getPostData':
            return {
                status: 201,
                json: async () => posts
            };
        case '/DropDB':
            return {
                status: 201,
                json: async () => res
            };
        default:
            throw new Error(`Unknown URL: ${url}`);


    }
}