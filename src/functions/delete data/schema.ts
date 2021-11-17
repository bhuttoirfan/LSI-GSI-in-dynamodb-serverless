export default {
  type: "object",
  properties: {
    actor: { type: 'string' },
    movie: { type: 'string' }
  },
  required: ['actor', 'movie']
} as const;
