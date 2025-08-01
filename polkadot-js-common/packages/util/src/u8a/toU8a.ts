// Copyright 2017-2025 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { U8aLike } from '../types.js';

import { hexToU8a } from '../hex/toU8a.js';
import { isBuffer } from '../is/buffer.js';
import { isHex } from '../is/hex.js';
import { isU8a } from '../is/u8a.js';
import { stringToU8a } from '../string/toU8a.js';

/**
 * @name u8aToU8a
 * @summary Creates a Uint8Array value from a Uint8Array, Buffer, string or hex input.
 * @description
 * `null` or `undefined` inputs returns a `[]` result, Uint8Array values returns the value, hex strings returns a Uint8Array representation.
 * If `strict` is true, `null` or `undefined` will throw an error instead of returning an empty array.
 * Supports input types: Uint8Array, Buffer, hex string, string, or number array.
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aToU8a } from '@polkadot/util';
 *
 * u8aToU8a(new Uint8Array([0x12, 0x34]); // => Uint8Array([0x12, 0x34])
 * u8aToU8a(0x1234); // => Uint8Array([0x12, 0x34])
 * ```
 */
export function u8aToU8a (value?: U8aLike | null, strict = false): Uint8Array {
  if (strict && (value === null || value === undefined)) {
    throw new Error('u8aToU8a: Expected non-null, non-undefined value');
  }

  return isU8a(value)
    // NOTE isBuffer needs to go here since it actually extends
    // Uint8Array on Node.js environments, so all Buffer are Uint8Array,
    // but Uint8Array is not Buffer
    ? isBuffer(value)
      ? new Uint8Array(value)
      : value
    : isHex(value)
      ? hexToU8a(value)
      : Array.isArray(value)
        ? new Uint8Array(value)
        : stringToU8a(value);
}
