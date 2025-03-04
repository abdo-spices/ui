import { z } from 'zod'
import fs from 'node:fs/promises'
import path from 'node:path'
import rimraf from 'rimraf'
import { registry_schema } from '@duck/registers'
import { REGISTRY_PATH } from '../main'
import { get_component_files } from './build-registry-index.lib'

// ----------------------------------------------------------------------------
export async function build_registry_index(
  registry: z.infer<typeof registry_schema>,
): Promise<z.infer<typeof registry_schema> | undefined> {
  try {
    // 1- getting the component path.
    const items = await Promise.all(
      registry
        .filter((item) => ['registry:ui'].includes(item.type))
        .map((item) => get_component_files(item, 'registry:ui')),
    )

    const example_items = await Promise.all(
      registry
        .filter((item) => ['registry:example'].includes(item.type))
        .map((item) => get_component_files(item, 'registry:example')),
    )

    const example_items_mapped = example_items.flatMap((item) => {
      const files = item.files.splice(1)

      return [
        {
          ...item,
          files: [item.files[0]],
        },
        ...files.map((file) => ({
          ...item,
          name: file.path.split('/').pop()?.split('.')[0],
          files: [file],
        })),
      ]
    })

    // console.dir(example_items_mapped, { depth: 10 })

    // 2- making it as json and remove the (index.json) file and replace it with the new one.
    const registryJson = JSON.stringify(
      [...items, ...example_items_mapped],
      null,
      2,
    )
    rimraf.sync(path.join(REGISTRY_PATH, 'index.json'))
    await fs.writeFile(
      path.join(REGISTRY_PATH, 'index.json'),
      registryJson,
      'utf8',
    )

    return [...items, ...example_items_mapped] as z.infer<
      typeof registry_schema
    >
  } catch (error) {
    console.dir({
      message: 'Failed to build registry index.',
      error,
      cwd: process.cwd(),
    })
  }
}
