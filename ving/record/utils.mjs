import { useDB } from '#ving/drizzle/db.mjs';

const kindCache = {};
/**
 * Instanciates a VingKind by name. 
 * 
 * Usage: `const users = useKind('User');`
 * 
 * @param {string} kind The name of the kind to instanciate. eg: `User`
 * @returns a `VingKind` subclass
 */
export const useKind = async (kind) => {
    if (kind in kindCache)
        return kindCache[kind];
    const kindTable = await import(`#ving/drizzle/schema/${kind}.mjs`);
    const kindModule = await import(`#ving/record/records/${kind}.mjs`);
    const instance = new kindModule[`${kind}Kind`](useDB(), kindTable[`${kind}Table`], kindModule[`${kind}Record`]);
    kindCache[kind] = instance;
    return instance;
}