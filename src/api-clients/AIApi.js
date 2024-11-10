import { instance } from './index';

export const AIAPI = {
    getRandomQuestion: () => {
        return instance.get('ai/question');
    },
    getResponse: (query) => {
        return instance.get('ai/general', { params: query });
    },
};