export const handlerPath = (context) => {
    return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;
};
//# sourceMappingURL=handlerResolver.js.map