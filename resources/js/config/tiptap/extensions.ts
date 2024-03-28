import Image from '@tiptap/extension-image'
import Heading from '@tiptap/extension-heading'
import { mergeAttributes } from '@tiptap/core'
import { withCommonCssProperties } from '@/lib/utils'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Bold from '@tiptap/extension-bold'
import Paragraph from '@tiptap/extension-paragraph'

const FixedSizeImage = Image.configure({
  allowBase64: true,
  HTMLAttributes: {
    class: 'w-[400px] h-auto',
  },
  inline: true,
})
const InlineStyledBold = Bold.extend({
  addAttributes() {
    return {
      ...this.parent?.(), // Existing attributes
      style: {
        default: withCommonCssProperties('font-weight: 600;'),
      },
    }
  },
})
const InlineStyledParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(), // Existing attributes
      style: {
        default: withCommonCssProperties(),
      },
    }
  },
})
const InlineStyledHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    // References: https://github.com/ueberdosis/tiptap/blob/main/packages/extension-heading/src/heading.ts
    // Copied from extension source code, we only modified html attributes to add inline-style
    const hasLevel = this.options.levels.includes(node.attrs.level)
    const level = hasLevel ? node.attrs.level : this.options.levels[0]

    const headingStyleList = [
      'font-size: 1.875rem;', // level 1
      'font-size: 1.5rem;', // level 2
      'font-size: 1.25rem;', // level 3
    ]
    const commonStyle = 'font-weight: 800; margin-bottom: 10px;'
    const appliedStyle = `${commonStyle} ${headingStyleList[level]}`

    return [
      `h${level}`,
      mergeAttributes(HTMLAttributes, {
        style: withCommonCssProperties(appliedStyle),
      }),
      0,
    ]
  },
})
export const EditorExtensionList = [
  StarterKit,
  Underline,
  Link,
  FixedSizeImage,
  InlineStyledParagraph,
  InlineStyledBold,
  InlineStyledHeading,
]
