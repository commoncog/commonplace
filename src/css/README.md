# CSS Guides
We use a variant of BEM. I should probably write out a longer guide. For starters:

- https://css-tricks.com/bem-101/
- http://markdotto.com/2015/07/20/css-nesting/

## Custom Rules
- Naming is `block__element--modifier`
  - *Blocks* are top-level abstraction e.g. button/`.btn`
  - *Elements* are child items in a block (e.g. `.btn__price`)
  - *Modifiers* are modifiers that manipulate the block e.g. `.btn--orange`
- Use classes for everything. No element-based CSS selectors. `.header li` is
  not acceptable. `.header__li` is.
- Follow the Mark Otto nesting guide. Nest for attributes, e.g. :hover, but not
  elements.
- Prepend `js-` to the element classname if it's to be used by Javascript (e.g. a placeholder for Mithril to latch on to) 
- If any of the above rules, don't make sense, change this doc and add a new
  one. 
