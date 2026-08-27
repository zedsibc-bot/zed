import { readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const assetDirectory = join(process.cwd(), ".open-next", "assets");
const assetLimit = 25 * 1024 * 1024;

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? filesIn(path) : [path];
    })
  );

  return files.flat();
}

try {
  const files = await filesIn(assetDirectory);
  const oversized = [];

  for (const file of files) {
    const { size } = await stat(file);
    if (size > assetLimit) oversized.push({ file, size });
  }

  if (oversized.length) {
    const list = oversized
      .sort((a, b) => b.size - a.size)
      .map(
        ({ file, size }) =>
          `- ${relative(process.cwd(), file)} (${(size / 1024 / 1024).toFixed(2)} MiB)`
      )
      .join("\n");
    throw new Error(`Cloudflare's 25 MiB per-asset limit was exceeded:\n${list}`);
  }

  console.log("Cloudflare asset check passed: all assets are at or below 25 MiB.");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
