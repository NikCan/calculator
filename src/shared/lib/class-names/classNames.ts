type Mods = Record<string, boolean | string>;

/**
 * @param {string} cls - The base class name.
 * @param {Object.<string, boolean>} [mods={}] - An object where keys are class names and values are booleans indicating whether the class should be included.
 * @param {Array.<string|undefined>} [additional=[]] - An array of additional class names to be included.
 * @returns {string} A single string with all class names concatenated by a space.
 *
 * @example className={classNames(s.InputWrapper, { [s.readOnly]: readOnly }, [className])}
 */
export function classNames(
  cls: string,
  mods: Mods = {},
  additional: (string | undefined)[] = []
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([, value]) => Boolean(value))
      .map(([className]) => className)
  ].join(' ');
}
