import { docs } from '../../../../.velite'
import { SLUG_METADATA } from '~/config/metadata'
import { Metadata, ResolvingMetadata } from 'next'
import { ChevronRightIcon, ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { badgeVariants } from '@duck/registry-ui-duckui/badge'
import { cn } from '@duck/libs/cn'
import { notFound } from 'next/navigation'
import React from 'react'
import { getTableOfContents } from '~/lib/toc'
import { DocsPager } from '~/components/pager'
// import { ScrollArea } from '../../../../../../packages/_oldstuff_refactor/ui/scroll-area'
import { DashboardTableOfContents } from '~/components/toc'
import { Mdx } from '~/components/mdx/mdx'
// import '../../../mdx.css'

interface DocPageProps {
  params: {
    slug: string[]
  }
}

async function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug
  const doc = docs.find((doc) => slug.includes(doc.permalink))

  if (!doc) {
    return null
  }

  return doc
}

type Props = {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params
  const doc = await getDocFromParams({ params })

  if (!doc) {
    return {}
  }
  return SLUG_METADATA(doc)
}

const PostLayout = async ({
  params,
}: { params: Promise<{ slug: string }> }) => {
  const _param = await params
  const doc = docs.find((post) => _param.slug.includes(post?.title))
  // const Content = getMDXComponent(post.body.code)

  // const content = await getTableOfContents(doc?.content || '')
  // console.log(content, doc?.body)

  if (!doc) {
    notFound()
  }

  const toc = await getTableOfContents(doc.content || '')

  console.log(toc, 'haapppyt talk')

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0 max-w-2xl">
        <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
          <div className="truncate">Docs</div>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <div className="text-foreground">{doc.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn('scroll-m-20 text-3xl font-bold tracking-tight')}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-base text-muted-foreground">
              {
                // <Balancer>{doc.description}</Balancer>
              }
              {doc.description}
            </p>
          )}
        </div>
        {doc.links ? (
          <div className="flex items-center space-x-2 pt-4">
            {doc.links?.doc && (
              <Link
                href={doc.links.doc}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
              >
                Docs
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
            {doc.links?.api && (
              <Link
                href={doc.links.api}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
              >
                API Reference
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
          </div>
        ) : null}
        <div className="pb-12 pt-8">
          <Mdx code={doc.body} />
        </div>
        {<DocsPager doc={doc} />}
      </div>
      {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            {/* NOTE: hide-scroll */}
            <div className="hide-scroll pb-10 sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
              <DashboardTableOfContents toc={doc.toc} />
            </div>
          </div>
        </div>
      )}
      <DialogDemo />
    </main>
  )
}

export default PostLayout

import { Button } from '@duck/registry-ui-duckui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@duck/registry-ui-duckui/dialog'
import { Label } from '../../../../../../packages/_oldstuff_refactor/ui/ShadcnUI/label'
import { Input } from '@duck/registry-ui-duckui/input'

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
