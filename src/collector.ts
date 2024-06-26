/**
 * Creates metrics collector
 */
export function createCollector(
  collectMetrics: () => Promise<void>,
  interval: number
) {
  const collector = setInterval(collectMetrics, interval);
  collectMetrics();

  return function destroy() {
    clearInterval(collector);
  };
}
