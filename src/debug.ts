import { debug } from "debug";

/**
 * Returns debugger instance
 *
 * Usage:
 * ```sh
 * $ DEBUG=ovh-exporter bun start
 * ```
 */
export function getDebugger() {
  return debug("ovh-exporter");
}
