import { HierarchyNode } from 'd3'
import { MutableRefObject } from 'react'
import { GetHighlighter } from '../SunburstHighlighter'
import { Highlighter, IHighlighterWrapper } from './Types'

export class HighlighterWrapper<TData> implements IHighlighterWrapper<TData> {
  private highlighter: Highlighter<HierarchyNode<TData>> | undefined = undefined

  constructor(private readonly getHighlighter: GetHighlighter<TData>) { }

  setRef(ref: MutableRefObject<SVGGElement | null>) {
    this.highlighter = this.getHighlighter(ref)
  }

  clear() {
    if (this.highlighter) {
      this.highlighter.clear()
    } else {
      console.info('Please call setRef() before clear()')
    }
  }
  highlight(item: HierarchyNode<TData>) {
    if (this.highlighter) {
      this.highlighter.highlight(item)
    } else {
      console.info('Please call setRef() before highlight()')
    }
  }
}
