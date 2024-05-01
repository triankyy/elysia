import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

/**
 * Exclude keys from an object.
 * @template V - The type of the input object.
 * @template K - The type of the keys to exclude.
 * @param {V} value - The input object from which keys will be excluded.
 * @param {K[]} keys - An array of keys to exclude from the object.
 * @returns {Omit<V, K>} - A new object with the specified keys excluded.
 */
export function excludeFromObject<V extends object, K extends keyof V>(
    value: V,
    keys: K[]
): Omit<V, K> {
    return Object.fromEntries(
        Object.entries(value).filter(([key]) => !keys.includes(key as K))
    ) as Omit<V, K>;
}

/**
 * Exclude keys from objects in a list.
 * @template V - The type of the objects in the list.
 * @template K - The type of the keys to exclude.
 * @param {V[]} values - The list of objects from which keys will be excluded.
 * @param {K[]} keysToDelete - An array of keys to exclude from each object in the list.
 * @returns {Omit<V, K>[]} - A new list of objects with the specified keys excluded.
 */
export function excludeFromList<V extends object, K extends keyof V>(
    values: V[],
    keysToDelete: K[]
): Omit<V, K>[] {
    return values.map((value) =>
        excludeFromObject(value, keysToDelete)
    ) as Omit<V, K>[];
}
