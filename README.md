# &lt;Indicator /&gt;
A generic element with `enable`/`disable` and `active`/`passive` state.

## Preview

```jsx
<Indicator tag='span' theme='primary' size='lg' gradient={true} outlined={true} enabled={false} active={true} >
    hello world
</Indicator>
```
Rendered to:
```html
<span class="c1 thPrimary szLg gradient outlined enabled actived">
    hello world
</span>
```

## Features
* Includes all features in [`<Basic />`](https://www.npmjs.com/package/@nodestrap/basic).
* `enable`/`disable` state. Visualized in grayed color.
* `active`/`passive` state. Visualized in strong color.
* Customizable via [`@cssfn/css-config`](https://www.npmjs.com/package/@cssfn/css-config).

## Installation

Using npm:
```
npm i @nodestrap/indicator
```

## Support Us

If you feel our lib is useful for your projects,  
please make a donation to avoid our project from extinction.

We always maintain our projects as long as we're still alive.

[[Make a donation](https://ko-fi.com/heymarco)]
